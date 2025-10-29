let currentDate = new Date();
let selectedDate = null;
window.addEventListener("DOMContentLoaded", ajustarAncho);
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];



function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Actualizar título
  document.getElementById("monthYear").textContent = `${months[month]} ${year}`;

  // Limpiar grid
  const daysGrid = document.getElementById("daysGrid");
  daysGrid.innerHTML = "";

  // Primer día del mes y último día
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();

  // Agregar espacios vacíos para los días antes del primer día del mes
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyElement = document.createElement("div");
    emptyElement.className = "day empty";
    daysGrid.appendChild(emptyElement);
  }

  // Generar solo los días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.textContent = day;

    // Marcar día actual
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      dayElement.classList.add("today");
    }

    // Marcar día seleccionado
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      dayElement.classList.add("selected");
    }

    // Agregar evento click
    dayElement.addEventListener("click", () => selectDate(date));

    daysGrid.appendChild(dayElement);
  }
}

function selectDate(date) {
  selectedDate = date;
  renderCalendar();

  const formNuevoEvento = document.getElementById("form-new-evento");
  const bgTranslucent = document.getElementById("bg-translucent");

  if (formNuevoEvento && bgTranslucent) {
    formNuevoEvento.style.visibility = "visible";
    bgTranslucent.style.visibility = "visible";

    // Esperar al siguiente ciclo para evitar que el clic actual lo cierre
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
  }

  function handleOutsideClick(e) {
    const clickedInsideForm = formNuevoEvento.contains(e.target);
    const clickedInsideOverlay = bgTranslucent.contains(e.target);

    if (!clickedInsideForm && !clickedInsideOverlay) {
      formNuevoEvento.style.visibility = "hidden";
      bgTranslucent.style.visibility = "hidden";
      document.removeEventListener("click", handleOutsideClick);
    }
  }
}



function previousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

// Inicializar calendario
renderCalendar();

function ajustarAncho() {
  const inputs = document.querySelectorAll(".autoInput");
  const medidores = document.querySelectorAll(".medidor");

  inputs.forEach((input, i) => {
    const medidor = medidores[i];
    medidor.textContent = input.value || "      ";
    input.style.width = medidor.offsetWidth + "px";

        const extra = 12; // puedes ajustar este valor según tu CSS
    input.style.width = medidor.offsetWidth + extra + "px";
  });
}


function toggleDropdown() {
  const dropdown = document.getElementById("aside-app");

  if (!dropdown) return;

  dropdown.classList.toggle("show");

  // Alternar visibilidad usando estilo
  dropdown.style.visibility = dropdown.classList.contains("show") ? "visible" : "hidden";
}

