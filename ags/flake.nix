{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
    astal,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    pname = "my-shell";
    entry = "moon/app.ts";

    astalPackages = with ags.packages.${system}; [
      io
      astal4
      apps
      battery
      bluetooth
      mpris
      network
      notifd
      tray
      wireplumber
    ];

    extraPackages =
      astalPackages
      ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
        pkgs.webkitgtk_6_0
      ];
  in {
    packages.${system} = {
      default = pkgs.stdenv.mkDerivation {
        name = pname;
        src = ./.;

        nativeBuildInputs = with pkgs; [
          wrapGAppsHook4
          gobject-introspection
          ags.packages.${system}.default
        ];

        buildInputs = extraPackages ++ [pkgs.gjs];

        installPhase = ''
          runHook preInstall

          mkdir -p $out/bin
          mkdir -p $out/share
          # Copy only relevant files to avoid including node_modules if possible
          # but ags bundle might need them. Let's copy everything except .git and node_modules
          # if we want to be clean, but for now let's just ensure it works.
          cp -r moon $out/share/
          
          # ags bundle entry output -d "SRC='...'"
          # We need to be in the directory where app.ts can resolve its imports
          cd $out/share
          ags bundle ${entry} $out/bin/${pname}

          runHook postInstall
        '';
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = [
          (ags.packages.${system}.default.override {
            inherit extraPackages;
          })
        ];
      };
    };
  };
}
