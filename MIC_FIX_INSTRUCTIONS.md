# Instrucciones para arreglar el Micrófono Interno (ASUS/AMD)

## Situación actual
- El micrófono por cable (Jack 3.5mm) funciona bien.
- El micrófono interno no detecta sonido (posible conflicto de DMIC/Digital Mic).

## Paso 1: Aplicar el parche del Kernel
Ejecuta este comando para forzar al driver a reconocer el micrófono interno:

```bash
sudo bash -c 'echo "options snd-intel-dspcfg dsp_driver=1" > /etc/modprobe.d/amd-mic-fix.conf'
```

## Paso 2: Reiniciar
Reinicia el ordenador para que el Kernel cargue la nueva configuración.

## Paso 3: Verificación (Post-reinicio)
1. Abre `pavucontrol`.
2. Ve a **Configuración** -> Tarjeta interna -> **Analog Stereo Duplex**.
3. En **Dispositivos de entrada**, comprueba si el "Internal Microphone" ahora tiene actividad.
4. Si sigue sin moverse, prueba este comando para cambiar la fuente:
   ```bash
   amixer -c 1 sset 'Capture Source' 'Internal Mic 1'
   ```

---
*Si esto falla, el siguiente paso será probar `dsp_driver=3` en el mismo archivo.*
