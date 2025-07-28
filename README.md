# Selector de Bloques Acambaro.com.mx

Este proyecto es una aplicación web para seleccionar y reservar bloques de píxeles (10x10) en un mapa interactivo, con integración de formulario de contacto y reserva.

## Características principales
- Selección visual de bloques de 10x10 píxeles (cada bloque = 100 px²).
- Límite de selección configurable por el usuario.
- Cálculo automático del costo total ($100 USD por bloque).
- Visualización de bloques disponibles, seleccionados y reservados.
- Formulario de contacto y reserva con campos guiados (nombre, correo, teléfono, mensaje).
- Envío de datos a una base de datos (SheetDB) y generación automática de correo con detalles de la selección.
- Interfaz accesible y de alto contraste.

## Archivos principales
- `selector.html`: Página principal con el mapa de selección, formulario y resumen.
- `selector.js`: Lógica de selección, reserva y manejo de formularios.
- `main.html`: (opcional) Página de inicio o landing.

## Uso
1. Abre `selector.html` en tu navegador.
2. Indica cuántos bloques deseas adquirir y establece el límite.
3. Selecciona los bloques en el mapa.
4. Llena el formulario de contacto y reserva.
5. Al enviar, tus datos se guardan y se abre tu cliente de correo con los detalles de la reserva.

## Personalización
- Cambia la URL de SheetDB en el código para conectar con tu propia base de datos.
- Ajusta los textos, colores o precios según tus necesidades.

## Requisitos
- Navegador web moderno.
- Conexión a internet para el guardado en SheetDB.

## Autor
acambaro.com.mx

---

¿Dudas o sugerencias? Escribe a contacto@acambaro.com.mx
