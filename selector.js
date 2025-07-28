// selector.js
// Lógica principal del selector de bloques y formulario de contacto

// selector.js
// Lógica principal del selector de bloques y formulario de contacto

document.addEventListener('DOMContentLoaded', function() {
  // Formulario de contacto
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const mensaje = document.getElementById('mensaje').value;
      const mailto = `mailto:contacto@acambaro.com.mx?subject=Consulta%20de%20bloques%20Acambaro.com.mx&body=Nombre:%20${encodeURIComponent(nombre)}%0ACorreo:%20${encodeURIComponent(correo)}%0AMensaje:%20${encodeURIComponent(mensaje)}`;
      window.location.href = mailto;
      document.getElementById('contactoStatus').textContent = 'Abriendo tu cliente de correo...';
    });
  }

  // Selector de bloques
  const grid = document.getElementById('grid');
  const totalRows = 80;
  const totalCols = 102;
  const reserved = new Set();
  const selected = new Set();
  let maxBlocks = 50;

  // Permitir ajuste dinámico del máximo de bloques
  window.setMaxBlocks = function(n) {
    maxBlocks = n;
  }

  function getColumnLabel(index) {
    let label = '';
    while (index >= 0) {
      label = String.fromCharCode((index % 26) + 65) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  }

  function getIndexFromColumn(label) {
    let index = 0;
    for (let i = 0; i < label.length; i++) {
      index *= 26;
      index += label.charCodeAt(i) - 64;
    }
    return index - 1;
  }

  function loadReservedBlocks() {
    fetch("https://sheetdb.io/api/v1/wgbl7kd34rkmp")
      .then(response => response.json())
      .then(data => {
        let totalReserved = 0;
        data.forEach(entry => {
          if (entry.coordenadas) {
            const coords = entry.coordenadas.split(', ');
            coords.forEach(coord => {
              const match = coord.match(/([A-Z]+)([0-9]+)/);
              if (match) {
                const col = getIndexFromColumn(match[1]);
                const row = parseInt(match[2]) - 1;
                const cellId = `${row}-${col}`;
                reserved.add(cellId);
                totalReserved++;
              }
            });
          }
        });
        document.querySelectorAll('.cell').forEach(cell => {
          const cellId = cell.dataset.id;
          if (reserved.has(cellId)) {
            cell.classList.add('reserved');
            cell.classList.remove('selected');
          }
        });
        updateAvailableCount();
      });
  }

  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      const cell = document.createElement('div');
      const cellId = `${row}-${col}`;
      cell.className = 'cell';
      cell.dataset.id = cellId;
      cell.addEventListener('click', function () {
        if (cell.classList.contains('reserved')) return;
        if (!cell.classList.contains('selected') && selected.size >= maxBlocks) {
          alert(`Solo puedes seleccionar hasta ${maxBlocks} bloques.`);
          return;
        }
        cell.classList.toggle('selected');
        if (selected.has(cellId)) {
          selected.delete(cellId);
        } else {
          selected.add(cellId);
        }
        updateAvailableCount();
      });
      grid.appendChild(cell);
    }
  }

  function updateAvailableCount() {
    const total = totalCols * totalRows;
    const disponibles = total - reserved.size - selected.size;
    document.getElementById('availableCount').textContent = disponibles;
  }

  window.generateSummary = function() {
    const blockCount = selected.size;
    if (blockCount === 0) {
      alert("Selecciona al menos un bloque antes de generar el resumen.");
      return;
    }
    const code = generateCode();
    const pixels = blockCount * 100;
    const coordinates = Array.from(selected).map(id => {
      const [row, col] = id.split('-').map(Number);
      return `${getColumnLabel(col)}${row + 1}`;
    });
    document.getElementById('blockCount').textContent = blockCount;
    document.getElementById('pixelCount').textContent = pixels;
    document.getElementById('reservationCode').textContent = code;
    document.getElementById('selectedBlocks').value = coordinates.join(', ');
  }

  window.confirmPreReserva = function() {
    const blockCount = selected.size;
    if (blockCount === 0) {
      alert("Selecciona al menos un bloque antes de confirmar la pre-reserva.");
      return;
    }
    const code = document.getElementById('reservationCode').textContent;
    const pixels = document.getElementById('pixelCount').textContent;
    const coordinates = document.getElementById('selectedBlocks').value.split(', ');
    saveToSheetDB(code, blockCount, pixels, coordinates);
    alert("¡Pre-reserva enviada correctamente!");
  }

  function generateCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = '';
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return code;
  }

  window.resetSelection = function() {
    selected.clear();
    document.querySelectorAll('.cell.selected').forEach(cell => cell.classList.remove('selected'));
    document.getElementById('blockCount').textContent = '0';
    document.getElementById('pixelCount').textContent = '0';
    document.getElementById('reservationCode').textContent = '---';
    document.getElementById('selectedBlocks').value = '';
    updateAvailableCount();
  }

  window.sendWhatsApp = function() {
    const blockCount = selected.size;
    if (blockCount === 0) {
      alert("Selecciona al menos un bloque antes de enviar por WhatsApp.");
      return;
    }
    const code = document.getElementById('reservationCode').textContent;
    const blocks = document.getElementById('selectedBlocks').value;
    const pixels = document.getElementById('pixelCount').textContent;
    const message = `Hola, quiero reservar los siguientes bloques en Acambaro.com.mx:\n\nBloques seleccionados: ${blockCount}\nTotal de píxeles: ${pixels}\nCódigo de reservación: ${code}\nCoordenadas: ${blocks}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  function saveToSheetDB(code, blockCount, pixels, coordinates) {
    const payload = {
      data: {
        codigo: code,
        coordenadas: coordinates.join(', '),
        pixeles: pixels,
        fecha: new Date().toISOString()
      }
    };

    fetch("https://sheetdb.io/api/v1/wgbl7kd34rkmp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(response => {
      if (!response.ok) {
        alert("Hubo un problema al guardar la reserva en la nube.");
      } else {
        // Actualiza las celdas como reservadas
        coordinates.forEach(coord => {
          const match = coord.match(/([A-Z]+)([0-9]+)/);
          if (match) {
            const col = getIndexFromColumn(match[1]);
            const row = parseInt(match[2]) - 1;
            const cellId = `${row}-${col}`;
            reserved.add(cellId);
            const cell = document.querySelector(`[data-id='${cellId}']`);
            if (cell) {
              cell.classList.add('reserved');
              cell.classList.remove('selected');
            }
          }
        });
        window.resetSelection();
      }
    });
  }

  loadReservedBlocks();
});
