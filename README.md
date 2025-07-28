# Selector de Bloques Acambaro.com.mx

Aplicación web para seleccionar y reservar bloques de píxeles (10x10) en un mapa interactivo, con formulario de contacto y resumen de compra.

## Cambios recientes
- Se agregó un resumen visual que muestra la cantidad de bloques seleccionados y el costo total en USD.
- El formulario de contacto ahora incluye leyendas y ejemplos para cada campo, y guarda los datos en SheetDB antes de enviar el correo.
- El fondo del selector es azul marino y los campos de texto tienen fondo blanco y texto negro para mejor contraste.
- El archivo principal para GitHub Pages es `index.html` (antes `main.html`).
- Instrucciones para corregir errores de despliegue en GitHub Pages (usar la raíz del repositorio como fuente).

## Características principales
- Selección visual de bloques de 10x10 píxeles (cada bloque = 100 px²).
- Límite de selección configurable por el usuario.
- Cálculo automático del costo total ($100 USD por bloque).
- Visualización de bloques disponibles, seleccionados y reservados.
- Resumen visual de bloques seleccionados y costo total.
- Formulario de contacto y reserva con campos guiados (nombre, correo, teléfono, mensaje).
- Envío de datos a una base de datos (SheetDB) y generación automática de correo con detalles de la selección.
- Interfaz accesible y de alto contraste.

## Archivos principales
- `index.html`: Página principal para GitHub Pages (landing).
- `selector.html`: Página del mapa de selección, formulario y resumen.
- `selector.js`: Lógica de selección, reserva y manejo de formularios.

## Uso
1. Abre `index.html` en tu navegador o desde GitHub Pages.
2. Da clic en el botón para ir al selector de bloques.
3. Indica cuántos bloques deseas adquirir y establece el límite.
4. Selecciona los bloques en el mapa.
5. Llena el formulario de contacto y reserva.
6. Al enviar, tus datos se guardan y se abre tu cliente de correo con los detalles de la reserva.

## Personalización
- Cambia la URL de SheetDB en el código para conectar con tu propia base de datos.
- Ajusta los textos, colores o precios según tus necesidades.

## Despliegue en GitHub Pages
- Asegúrate de que la fuente de GitHub Pages esté configurada en la raíz (`/`) de la rama `main`.
- El archivo principal debe llamarse `index.html`.

## Requisitos
- Navegador web moderno.
- Conexión a internet para el guardado en SheetDB.

## Autor
acambaro.com.mx

---

¿Dudas o sugerencias? Escribe a contacto@acambaro.com.mx
