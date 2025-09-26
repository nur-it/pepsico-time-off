const buttons = document.querySelectorAll("#leaveTypeContainer .leave-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => {
      b.classList.remove("bg-green-500", "text-white");
      b.classList.add("bg-white", "text-gray-800");

      const icon = b.querySelector(".icon");
      if (icon) {
        icon.setAttribute("stroke", "black");
      }
    });

    btn.classList.add("bg-green-500", "text-white");
    btn.classList.remove("bg-white", "text-gray-800");

    const icon = btn.querySelector(".icon");
    if (icon) {
      icon.setAttribute("stroke", "white");
    }
  });
});
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const monthLabel = document.getElementById("monthLabel");
const calendarGrid = document.getElementById("calendarGrid");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

let currentMonth = 4;
let currentYear = 2023;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let startDate = null;
let endDate = null;

function generateCalendar(month, year) {
  calendarGrid.querySelectorAll(".date-cell").forEach((e) => e.remove());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let offset = (firstDay + 6) % 7;

  for (let i = 0; i < offset; i++) {
    const cell = document.createElement("div");
    cell.className = "date-cell py-2 text-gray-800";
    calendarGrid.appendChild(cell);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const cell = document.createElement("div");
    cell.className = "date-cell py-2 cursor-pointer rounded-md hover:text-gray-700 hover:bg-gray-200";
    cell.textContent = d;
    cell.dataset.date = dateObj.toISOString();
    calendarGrid.appendChild(cell);

    cell.addEventListener("click", () => handleDateClick(dateObj));
  }

  monthLabel.textContent = `${monthNames[month]} ${year}`;
  highlightRange();
}

function handleDateClick(date) {
  if (!startDate || (startDate && endDate)) {
    startDate = date;
    endDate = null;
  } else if (date < startDate) {
    endDate = startDate;
    startDate = date;
  } else {
    endDate = date;
  }
  highlightRange();
  updateDateInputs();
}

function highlightRange() {
  calendarGrid.querySelectorAll(".date-cell").forEach((cell) => {
    cell.classList.remove("bg-blue-500", "bg-blue-200", "text-white");
    const cellDate = cell.dataset.date ? new Date(cell.dataset.date) : null;

    if (cellDate) {
      if (isSameDay(cellDate, startDate) || isSameDay(cellDate, endDate)) {
        cell.classList.add("bg-green-500", "text-white");
      } else if (startDate && endDate && cellDate > startDate && cellDate < endDate) {
        cell.classList.add("bg-green-100");
      }
    }
  });
}

function updateDateInputs() {
  const formatDate = (date) => `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  if (startDate) {
    startDateInput.value = formatDate(startDate);
    endDateInput.value = endDate ? formatDate(endDate) : formatDate(startDate);
  } else {
    startDateInput.value = "";
    endDateInput.value = "";
  }
}

function isSameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
  updateDateInputs();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
  updateDateInputs();
});

generateCalendar(currentMonth, currentYear);
updateDateInputs();

document.getElementById("sendRequestBtn").addEventListener("click", () => {
  const leaveType = document.querySelector(".leave-buttons button.bg-blue-500").textContent;
  const start = startDateInput.value;
  const end = endDateInput.value;
  alert(`Request submitted:\nType: ${leaveType.trim()}\nFrom: ${start}\nTo: ${end}`);
});
