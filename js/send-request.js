const buttons = document.querySelectorAll("#leaveTypeContainer .leave-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => {
      b.classList.remove("bg-[#24bf86]", "text-white");
      b.classList.add("bg-white", "text-gray-800");

      const icon = b.querySelector(".icon");
      if (icon) {
        icon.setAttribute("stroke", "black");
      }
    });

    btn.classList.add("bg-[#24bf86]", "text-white");
    btn.classList.remove("bg-white", "text-gray-800");

    const icon = btn.querySelector(".icon");
    if (icon) {
      icon.setAttribute("stroke", "white");
    }
  });
});

// Set the first button as active by default
document.addEventListener("DOMContentLoaded", function () {
  if (buttons.length > 0) {
    const firstButton = buttons[0];
    firstButton.classList.add("bg-[#24bf86]", "text-white");
    firstButton.classList.remove("bg-white", "text-gray-800");

    const icon = firstButton.querySelector(".icon");
    if (icon) {
      icon.setAttribute("stroke", "white");
    }
  }
});
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const monthLabel = document.getElementById("monthLabel");
const calendarGrid = document.getElementById("calendarGrid");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

let currentMonth = 9;
let currentYear = 2025;
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
    cell.className = "date-cell py-2 cursor-pointer rounded-md hover:text-gray-700 hover:bg-gray-200 border border-gray-300 text-center font-medium";
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
    cell.classList.remove("bg-blue-500", "bg-blue-200", "bg-[#24bf86]", "bg-green-100", "text-white");
    const cellDate = cell.dataset.date ? new Date(cell.dataset.date) : null;

    if (cellDate) {
      if (isSameDay(cellDate, startDate) || isSameDay(cellDate, endDate)) {
        cell.classList.add("bg-[#24bf86]", "text-white", "border-[#24bf86]");
      } else if (startDate && endDate && cellDate > startDate && cellDate < endDate) {
        cell.classList.add("bg-green-100", "border-green-300");
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

// Set default date range (17th to 19th of current month)
startDate = new Date(currentYear, currentMonth, 15);
endDate = new Date(currentYear, currentMonth, 21);
highlightRange();
updateDateInputs();

document.getElementById("sendRequestBtn").addEventListener("click", () => {
  const leaveType = document.querySelector(".leave-buttons button.bg-blue-500").textContent;
  const start = startDateInput.value;
  const end = endDateInput.value;
  alert(`Request submitted:\nType: ${leaveType.trim()}\nFrom: ${start}\nTo: ${end}`);
});

// Custom Dropdown Functionality
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".custom-dropdown");
  const dropdownSelected = dropdown.querySelector(".dropdown-selected");
  const dropdownOptions = dropdown.querySelector(".dropdown-options");
  const dropdownArrow = dropdown.querySelector(".dropdown-arrow");
  const selectedText = dropdown.querySelector(".selected-text");
  const options = dropdown.querySelectorAll(".dropdown-option");

  // Toggle dropdown
  dropdownSelected.addEventListener("click", function () {
    const isOpen = !dropdownOptions.classList.contains("hidden");

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  // Open dropdown
  function openDropdown() {
    dropdownOptions.classList.remove("hidden");
    dropdownArrow.style.transform = "rotate(180deg)";
  }

  // Close dropdown
  function closeDropdown() {
    dropdownOptions.classList.add("hidden");
    dropdownArrow.style.transform = "rotate(0deg)";
  }

  // Handle option selection
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      const text = this.textContent;

      // Update selected text
      selectedText.textContent = text;

      // Remove active class from all options
      options.forEach((opt) => opt.classList.remove("bg-blue-50", "text-blue-600"));

      // Add active class to selected option
      this.classList.add("bg-blue-50", "text-blue-600");

      // Close dropdown
      closeDropdown();

      // Trigger custom event for form handling
      dropdown.dispatchEvent(
        new CustomEvent("dropdownChange", {
          detail: { value: value, text: text },
        })
      );
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  // Close dropdown on escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDropdown();
    }
  });

  // Keyboard navigation
  dropdownSelected.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      dropdownSelected.click();
    }
  });

  // Set initial active option
  const defaultOption = dropdown.querySelector('.dropdown-option[data-value="Other"]');
  if (defaultOption) {
    defaultOption.classList.add("bg-blue-50", "text-blue-600");
  }
});
