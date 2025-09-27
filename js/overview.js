// Calendar functionality
let currentDate = new Date();

function updateCalendar() {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthYear = document.getElementById("monthYear");
  monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

// Initialize calendar
updateCalendar();

// Check if user is logged in
if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "/";
}
