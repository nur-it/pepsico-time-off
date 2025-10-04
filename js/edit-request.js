const buttons = document.querySelectorAll("#leaveTypeContainer .leave-btn");
const dropdown = document.querySelector(".custom-dropdown");
const dropdownSelected = dropdown.querySelector(".dropdown-selected");

// Function to reset all buttons and dropdown to inactive state
function resetAllSelections() {
  // Reset buttons
  buttons.forEach((b) => {
    b.classList.remove("bg-[#24bf86]", "text-white");
    b.classList.add("bg-white", "text-gray-800");

    const icon = b.querySelector(".icon");
    if (icon) {
      // Handle both stroke and fill attributes using style for higher specificity
      const paths = icon.querySelectorAll("path");
      paths.forEach((path) => {
        path.style.fill = "#2b2d41"; // Dark color for inactive
        path.setAttribute("fill", "#2b2d41");
      });
      icon.setAttribute("stroke", "#2b2d41");
      icon.style.stroke = "#2b2d41";
    }
  });

  // Reset dropdown
  dropdownSelected.classList.remove("bg-[#24bf86]", "text-white");
  dropdownSelected.classList.add("bg-white", "text-dark");

  // Reset chevron icon color
  const chevronIcon = dropdown.querySelector(".dropdown-arrow");
  if (chevronIcon) {
    chevronIcon.style.filter =
      "brightness(0) saturate(100%) invert(17%) sepia(8%) saturate(1171%) hue-rotate(201deg) brightness(95%) contrast(95%)"; // Dark color
  }
}

// Function to activate a button
function activateButton(btn) {
  resetAllSelections();
  btn.classList.add("bg-[#24bf86]", "text-white");
  btn.classList.remove("bg-white", "text-gray-800");

  const icon = btn.querySelector(".icon");
  if (icon) {
    // Handle both stroke and fill attributes using style for higher specificity
    const paths = icon.querySelectorAll("path");
    paths.forEach((path) => {
      path.style.fill = "#ffffff"; // White color for active
      path.setAttribute("fill", "#ffffff");
    });
    icon.setAttribute("stroke", "#ffffff");
    icon.style.stroke = "#ffffff";
  }
}

// Function to activate dropdown
function activateDropdown() {
  resetAllSelections();
  dropdownSelected.classList.add("bg-[#24bf86]", "text-white");
  dropdownSelected.classList.remove("bg-white", "text-dark");

  // Make chevron icon white
  const chevronIcon = dropdown.querySelector(".dropdown-arrow");
  if (chevronIcon) {
    chevronIcon.style.filter = "brightness(0) saturate(100%) invert(100%)"; // White color
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activateButton(btn);
  });
});

// Set the first button as active by default
document.addEventListener("DOMContentLoaded", function () {
  if (buttons.length > 0) {
    activateButton(buttons[0]);
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
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let startDate = null;
let endDate = null;

// Store the original/previously selected dates for styling purposes
let originalStartDate = null;
let originalEndDate = null;

function generateCalendar(month, year) {
  calendarGrid.querySelectorAll(".date-cell").forEach((e) => e.remove());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let offset = (firstDay + 6) % 7;

  // Calculate the minimum number of rows needed
  const totalDaysInCurrentMonth = daysInMonth;
  const totalCellsUsed = offset + totalDaysInCurrentMonth;
  const minRowsNeeded = Math.ceil(totalCellsUsed / 7);
  const totalCellsNeeded = minRowsNeeded * 7;

  // Get previous month's last days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

  // Add previous month's last days
  for (let i = offset - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const cell = document.createElement("div");
    cell.className =
      "date-cell py-2 text-gray-400 text-center font-medium border border-gray-200 rounded-md select-none";
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const cell = document.createElement("div");
    cell.className =
      "date-cell py-2 cursor-pointer rounded-md hover:text-gray-700 hover:bg-gray-200 border border-gray-200 text-center font-medium select-none";
    cell.textContent = d;
    cell.dataset.date = dateObj.toISOString();
    calendarGrid.appendChild(cell);

    cell.addEventListener("click", () => handleDateClick(dateObj));
  }

  // Calculate remaining cells needed to complete the minimum required rows
  const remainingCells = totalCellsNeeded - totalCellsUsed;

  // Get next month details
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  // Add next month's first days only for the remaining cells needed
  for (let day = 1; day <= remainingCells; day++) {
    const cell = document.createElement("div");
    cell.className =
      "date-cell py-2 text-gray-400 text-center font-medium border border-gray-200 rounded-md select-none";
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  }

  monthLabel.textContent = `${monthNames[month]} ${year}`;
  highlightRange();
}

function handleDateClick(date) {
  // Reset original dates when starting a new selection
  if (!startDate || (startDate && endDate)) {
    // Clear original dates when starting fresh selection
    originalStartDate = null;
    originalEndDate = null;
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
  updateHeaderDateRange();
}

function highlightRange() {
  calendarGrid.querySelectorAll(".date-cell").forEach((cell) => {
    cell.classList.remove(
      "bg-blue-500",
      "bg-blue-200",
      "bg-[#24bf86]",
      "bg-green-100",
      "bg-warning-dark",
      "text-white",
      "border-[#24bf86]",
      "border-green-300",
      "border-warning-dark"
    );
    const cellDate = cell.dataset.date ? new Date(cell.dataset.date) : null;

    if (cellDate) {
      // Check if this date is part of the original selection (only if original dates exist)
      const isOriginalDate =
        originalStartDate &&
        originalEndDate &&
        (isSameDay(cellDate, originalStartDate) ||
          isSameDay(cellDate, originalEndDate) ||
          (cellDate > originalStartDate && cellDate < originalEndDate));

      // Check if this date is part of the new selection
      const isNewStartOrEnd =
        isSameDay(cellDate, startDate) || isSameDay(cellDate, endDate);
      const isNewRange =
        startDate && endDate && cellDate > startDate && cellDate < endDate;

      if (isOriginalDate && !isNewStartOrEnd && !isNewRange) {
        // Original dates that are not part of new selection - warning-dark background
        cell.classList.add(
          "bg-warning-dark",
          "text-white",
          "border-warning-dark"
        );
      } else if (isNewStartOrEnd) {
        // New start/end dates - green background
        cell.classList.add("bg-[#24bf86]", "text-white", "border-[#24bf86]");
      } else if (isNewRange) {
        // New range dates - light green background
        cell.classList.add("bg-green-100", "border-green-300");
      }
    }
  });
}

function updateDateInputs() {
  const formatDate = (date) =>
    `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  if (startDate) {
    startDateInput.value = formatDate(startDate);
    endDateInput.value = endDate ? formatDate(endDate) : formatDate(startDate);
  } else {
    startDateInput.value = "";
    endDateInput.value = "";
  }
}

function updateHeaderDateRange() {
  const headerElement = document.querySelector("h1");
  if (headerElement && startDate) {
    const formatDate = (date) => `${date.getDate()}`;
    const monthName = monthNames[startDate.getMonth()];

    if (endDate) {
      const dateRange =
        startDate.getMonth() === endDate.getMonth()
          ? `${formatDate(startDate)} - ${formatDate(endDate)}`
          : `${formatDate(startDate)} ${
              monthNames[startDate.getMonth()]
            } - ${formatDate(endDate)} ${monthNames[endDate.getMonth()]}`;
      headerElement.textContent = `Edit Leave ${monthName} ${dateRange}`;
    } else {
      headerElement.textContent = `Edit Leave  ${monthName} ${formatDate(
        startDate
      )}}`;
    }
  }
}

function isSameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

// Set default date range (15th to 21st of current month) as original dates
originalStartDate = new Date(currentYear, currentMonth, 15);
originalEndDate = new Date(currentYear, currentMonth, 21);

// Initially, don't set startDate and endDate so the original dates show with warning background
startDate = null;
endDate = null;

// Set the input fields to show the original dates
const formatDate = (date) =>
  `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

startDateInput.value = formatDate(originalStartDate);
endDateInput.value = formatDate(originalEndDate);

// Update header with original dates
const formatDateForHeader = (date) => `${date.getDate()}`;
const monthName = monthNames[originalStartDate.getMonth()];
const dateRange =
  originalStartDate.getMonth() === originalEndDate.getMonth()
    ? `${formatDateForHeader(originalStartDate)} - ${formatDateForHeader(
        originalEndDate
      )}`
    : `${formatDateForHeader(originalStartDate)} ${
        monthNames[originalStartDate.getMonth()]
      } - ${formatDateForHeader(originalEndDate)} ${
        monthNames[originalEndDate.getMonth()]
      }`;

document.querySelector(
  "h1"
).textContent = `Edit Leave: ${monthName} ${dateRange}`;

highlightRange();

document.getElementById("sendRequestBtn").addEventListener("click", () => {
  const leaveType = document.querySelector(
    ".leave-buttons button.bg-blue-500"
  ).textContent;
  const start = startDateInput.value;
  const end = endDateInput.value;
  alert(
    `Request submitted:\nType: ${leaveType.trim()}\nFrom: ${start}\nTo: ${end}`
  );
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
      options.forEach((opt) =>
        opt.classList.remove("bg-blue-50", "text-blue-600")
      );

      // Add active class to selected option
      this.classList.add("bg-blue-50", "text-blue-600");

      // Activate dropdown styling (like Leave/Sick buttons)
      activateDropdown();

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
  const defaultOption = dropdown.querySelector(
    '.dropdown-option[data-value="Other"]'
  );
  if (defaultOption) {
    defaultOption.classList.add("bg-blue-50", "text-blue-600");
  }
});
