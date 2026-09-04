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

## Portadas a pantalla completa

Las cinco primeras secciones (hero, calculadora, coste de esperar, qué hacemos, qué no somos) están montadas como una secuencia de pantallas completas con scroll-snap (`.covers` / `.cover` en `css/styles.css`), cada una con su color y su ilustración de línea original (motivo de cauce/canal — nunca fotografía de stock). El contenido de cada portada se revela con una transición suave la primera vez que entra en pantalla (`IntersectionObserver` en `js/main.js`).

Es mejora progresiva a propósito: sin JavaScript, o con `prefers-reduced-motion` activado, todo el contenido es visible desde el principio y el scroll-snap se desactiva — nadie se queda con una portada oculta.

## Paleta y esquinas

Paleta de azules y blancos (Tinta = azul noche, Papel = blanco frío, Río = azul de acento, Piedra = gris-azulado, Cal = blanco puro; Barro se mantiene como el único acento cálido, reservado para "qué no somos" y los avisos de riesgo). Esquinas redondeadas en vez de ángulo recto en tarjetas, paneles, inputs y botones (estos últimos en píldora).

## Recursos: carrusel de tarjetas

La sección Recursos es un carrusel horizontal (`#resources-carousel`): se ven ~4 tarjetas a la vez y se navega deslizando (gesto nativo, sin JS) o con los botones de flecha. Cada tarjeta lleva un icono de línea original — nunca iconografía de dinero/gráficas de velas.

## Pendiente fuera de alcance

El test de perfil, el área privada y el precio (`[PRECIO]`) no están construidos: los enlaces relevantes apuntan a `#` a la espera de esas piezas.
