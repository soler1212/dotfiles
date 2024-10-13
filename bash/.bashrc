# ~/.bashrc: executed by bash(1) for non-login shells.

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# History settings
HISTCONTROL=ignoreboth   # Ignore duplicate lines or lines starting with space
HISTSIZE=1000            # Maximum number of commands in history
HISTFILESIZE=2000        # Maximum size of the history file
shopt -s histappend      # Append to the history file, don't overwrite it

# Check window size after each command
shopt -s checkwinsize

# Make 'less' more friendly for non-text input files
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# Set fancy prompt (with color support if available)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
        color_prompt=yes
    else
        color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi

# If in xterm, set the window title to user@host:dir
case "$TERM" in
    xterm*|rxvt*)
        PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
        ;;
esac

# Enable color support for 'ls', 'grep', etc.
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
fi

# Alias for long-running commands notifications
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Enable bash-completion if available
if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi

# NVM (Node Version Manager)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Cargo (Rust package manager)
. "$HOME/.cargo/env"

# oh-my-posh configuration
eval "$(oh-my-posh --init --shell bash --config ~/.poshthemes/aleix-custom.omp.json)"


# Virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON='/usr/bin/python3'
export PROJECT_HOME=$HOME/Desenvolupament
source /usr/local/bin/virtualenvwrapper.sh

# Add local bin to PATH
export PATH="$PATH:$HOME/.local/bin"

# Alias for project directory
alias plan="cd /home/soler1212/Desenvolupament/PlanMomentum-Mastery/plan-momentum-web-app/"

# fzf (fuzzy finder)
[ -f ~/.fzf.bash ] && source ~/.fzf.bash

# History search with arrow keys
bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'
