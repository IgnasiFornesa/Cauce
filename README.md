# Cauce — landing page

Landing pública de educación financiera. HTML, CSS y JavaScript vanilla, sin build step ni dependencias externas. Se abre haciendo doble clic en `index.html`.

## Estructura

```
.
├── index.html        # Página completa (hero, calculadora, secciones de confianza, FAQ, footer)
├── css/styles.css     # Estilos, mobile-first
├── js/main.js          # Calculadora de inflación, comparativa de interés compuesto, FAQ nativo (<details>)
├── data/ipc-es.js      # Serie de IPC anual de España (fuente: INE), comentada
└── README.md
```

## La calculadora

Es la pieza central de la página: calcula el poder adquisitivo perdido de un importe parado desde un año dado, usando la serie de IPC de `data/ipc-es.js`. Sin registro, sin botón — el resultado se actualiza al escribir.

Los datos de IPC están verificados frente a fuentes públicas que citan al INE; el archivo indica cómo revisarlos y actualizarlos cada año. No hay cifras inventadas.

## Sin dependencias externas

No hay analytics, fuentes remotas ni llamadas de red: todo el cálculo ocurre en el navegador del usuario. Cumple el suelo de accesibilidad básico (foco visible, `prefers-reduced-motion`, HTML semántico, labels asociados a los inputs).

## Pendiente fuera de alcance

El test de perfil, el área privada y el precio (`[PRECIO]`) no están construidos: los enlaces relevantes apuntan a `#` a la espera de esas piezas.
