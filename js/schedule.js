const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentMonth = 2;
let currentYear = 2023;
const today = new Date();

const months = [
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

const iconMapping = {
  sunny: `<svg id="u" xmlns="http://www.w3.org/2000/svg" width="30.836" height="30.836" viewBox="0 0 30.836 30.836">
  <g id="Group_1" data-name="Group 1" transform="translate(0 0)">
    <path id="Path_1" data-name="Path 1" d="M20.073,9.447a7.511,7.511,0,1,0,0,10.627,7.531,7.531,0,0,0,0-10.627ZM18.4,18.4a5.139,5.139,0,1,1,0-7.274,5.144,5.144,0,0,1,0,7.274Z" transform="translate(0.658 0.658)" fill="#01a0d2"/>
    <path id="Path_2" data-name="Path 2" d="M17.385,9.49a1.173,1.173,0,0,0,.838-.348l2.23-2.23a1.185,1.185,0,1,0-1.676-1.676l-2.23,2.23a1.193,1.193,0,0,0,0,1.676,1.173,1.173,0,0,0,.838.348Z" transform="translate(5.861 -0.714)" fill="#01a0d2"/>
    <path id="Path_3" data-name="Path 3" d="M18.223,16.546a1.185,1.185,0,0,0-1.676,1.676l2.23,2.23a1.183,1.183,0,0,0,1.676,0,1.193,1.193,0,0,0,0-1.676l-2.23-2.23Z" transform="translate(5.861 5.861)" fill="#01a0d2"/>
    <path id="Path_4" data-name="Path 4" d="M7.466,16.546l-2.23,2.23a1.193,1.193,0,0,0,0,1.676,1.184,1.184,0,0,0,1.676,0l2.23-2.23a1.185,1.185,0,1,0-1.676-1.676Z" transform="translate(-0.714 5.861)" fill="#01a0d2"/>
    <path id="Path_5" data-name="Path 5" d="M7.466,9.142a1.184,1.184,0,0,0,1.676,0,1.193,1.193,0,0,0,0-1.676l-2.23-2.23A1.185,1.185,0,0,0,5.236,6.913Z" transform="translate(-0.714 -0.714)" fill="#01a0d2"/>
    <path id="Path_6" data-name="Path 6" d="M12.436,7.785A1.2,1.2,0,0,0,13.622,6.6V3.436a1.186,1.186,0,0,0-2.372,0V6.6A1.2,1.2,0,0,0,12.436,7.785Z" transform="translate(2.982 -2.25)" fill="#01a0d2"/>
    <path id="Path_7" data-name="Path 7" d="M22.6,11.25H19.436a1.186,1.186,0,1,0,0,2.372H22.6a1.186,1.186,0,1,0,0-2.372Z" transform="translate(7.052 2.982)" fill="#01a0d2"/>
    <path id="Path_8" data-name="Path 8" d="M12.436,18.25a1.2,1.2,0,0,0-1.186,1.186V22.6a1.186,1.186,0,1,0,2.372,0V19.436A1.2,1.2,0,0,0,12.436,18.25Z" transform="translate(2.982 7.052)" fill="#01a0d2"/>
    <path id="Path_9" data-name="Path 9" d="M7.785,12.436A1.2,1.2,0,0,0,6.6,11.25H3.436a1.186,1.186,0,0,0,0,2.372H6.6A1.2,1.2,0,0,0,7.785,12.436Z" transform="translate(-2.25 2.982)" fill="#01a0d2"/>
  </g>
</svg>
`,
  "partly-sunny": `<svg id="s" xmlns="http://www.w3.org/2000/svg" width="33.225" height="17.89" viewBox="0 0 33.225 17.89">
  <g id="Group_2" data-name="Group 2" transform="translate(0 0)">
    <path id="Path_10" data-name="Path 10" d="M15.343,11.25A8.1,8.1,0,0,0,7.25,19.343a1.287,1.287,0,0,0,1.278,1.278H22.159a1.287,1.287,0,0,0,1.278-1.278A8.1,8.1,0,0,0,15.343,11.25ZM9.959,18.065a5.533,5.533,0,0,1,10.768,0H9.942Z" transform="translate(1.269 -2.731)" fill="#f29a2f"/>
    <path id="Path_11" data-name="Path 11" d="M20.782,9.263a1.286,1.286,0,0,0-1.806,0l-2.4,2.4a1.286,1.286,0,0,0,0,1.806,1.275,1.275,0,0,0,1.806,0l2.4-2.4a1.286,1.286,0,0,0,0-1.806Z" transform="translate(7.57 -4.39)" fill="#f29a2f"/>
    <path id="Path_12" data-name="Path 12" d="M9.472,11.665l-2.4-2.4a1.277,1.277,0,1,0-1.806,1.806l2.4,2.4a1.275,1.275,0,0,0,1.806,0A1.286,1.286,0,0,0,9.472,11.665Z" transform="translate(-0.39 -4.39)" fill="#f29a2f"/>
    <path id="Path_13" data-name="Path 13" d="M12.528,12.213a1.287,1.287,0,0,0,1.278-1.278V7.528a1.278,1.278,0,1,0-2.556,0v3.408A1.287,1.287,0,0,0,12.528,12.213Z" transform="translate(4.084 -6.25)" fill="#f29a2f"/>
    <path id="Path_14" data-name="Path 14" d="M22.936,15.25H19.528a1.278,1.278,0,0,0,0,2.556h3.408a1.278,1.278,0,1,0,0-2.556Z" transform="translate(9.011 0.084)" fill="#f29a2f"/>
    <path id="Path_15" data-name="Path 15" d="M6.936,15.25H3.528a1.278,1.278,0,1,0,0,2.556H6.936a1.278,1.278,0,1,0,0-2.556Z" transform="translate(-2.25 0.084)" fill="#f29a2f"/>
  </g>
</svg>
`,
  thermometer: `<svg xmlns="http://www.w3.org/2000/svg" width="38.033" height="38.033" viewBox="0 0 38.033 38.033">
  <g id="q" transform="translate(0 19.026) rotate(-45)">
    <g id="Group_3" data-name="Group 3" transform="translate(0 0)">
      <path id="Path_17" data-name="Path 17" d="M26.893,5.2a5.193,5.193,0,0,0-8.868-3.672L8.576,10.974A8.007,8.007,0,0,0,1.4,14.424a7.915,7.915,0,0,0-.125,8.8,8.022,8.022,0,0,0,5.889,3.616q.416.042.831.042a7.973,7.973,0,0,0,5.625-2.328,7.893,7.893,0,0,0,2.314-6.235l9.449-9.449A5.157,5.157,0,0,0,26.907,5.2ZM23.9,7.4l-9.8,9.8a1,1,0,0,0-.291.887,5.874,5.874,0,0,1-1.663,5,5.816,5.816,0,0,1-4.766,1.69A5.936,5.936,0,0,1,3.02,22.086a5.847,5.847,0,0,1,.1-6.471,5.93,5.93,0,0,1,4.877-2.577,5.587,5.587,0,0,1,.831.055,1.1,1.1,0,0,0,.887-.291l9.8-9.8a3.114,3.114,0,0,1,2.2-.914,3.057,3.057,0,0,1,2.2.914,3.114,3.114,0,0,1,.914,2.2,3.057,3.057,0,0,1-.914,2.2Z" transform="translate(0)" fill="#f04c46"/>
      <path id="Path_18" data-name="Path 18" d="M16.807.3,5.667,11.441A3.808,3.808,0,0,0,0,14.753a3.808,3.808,0,0,0,3.81,3.8,3.808,3.808,0,0,0,3.81-3.8,3.672,3.672,0,0,0-.5-1.843L18.275,1.77A1.039,1.039,0,1,0,16.807.3ZM5.043,15.972a1.731,1.731,0,0,1-2.452,0,1.71,1.71,0,0,1-.513-1.219,1.686,1.686,0,0,1,.513-1.219,1.734,1.734,0,0,1,1.219-.513,1.677,1.677,0,0,1,1.219.513,1.71,1.71,0,0,1,.513,1.219,1.686,1.686,0,0,1-.513,1.219Z" transform="translate(4.156 4.16)" fill="#f04c46"/>
    </g>
  </g>
</svg>
`,
  cloudy: `<svg id="n" xmlns="http://www.w3.org/2000/svg" width="28.178" height="23.843" viewBox="0 0 28.178 23.843">
  <path id="Path_38" data-name="Path 38" d="M28.145,17.271a8.317,8.317,0,0,0,2.124-4.046,1.021,1.021,0,0,0-.217-.881,1.146,1.146,0,0,0-.809-.419,6.624,6.624,0,0,1-4.826-2.471,6.455,6.455,0,0,1-1.228-4.942,1.085,1.085,0,0,0-.246-.881,1.071,1.071,0,0,0-.824-.39,8.319,8.319,0,0,0-8.309,8.309,6.55,6.55,0,0,0,.043.751,8.346,8.346,0,0,0-4.884,4.118,5.532,5.532,0,0,0-1.3-.173,5.419,5.419,0,0,0,0,10.838H25.009a5.411,5.411,0,0,0,3.136-9.826ZM15.978,11.563a6.141,6.141,0,0,1,4.971-6.026,8.57,8.57,0,0,0,1.763,5.246A8.677,8.677,0,0,0,27.8,13.919a6.05,6.05,0,0,1-1.864,2.442,4.969,4.969,0,0,0-2.225.087,8.288,8.288,0,0,0-7.37-4.509,2.165,2.165,0,0,0-.318.029c0-.13-.043-.26-.043-.39ZM25.009,24.93H7.669a3.251,3.251,0,1,1,0-6.5,3.219,3.219,0,0,1,1.416.318h.058c.014,0,.029.014.043.029a.492.492,0,0,0,.2.029c.043,0,.1.029.145.029h.014a.848.848,0,0,0,.332-.058c.043-.014.087-.043.13-.058A.819.819,0,0,0,10.2,18.6a.935.935,0,0,0,.13-.116l.13-.173c.014-.029.058-.058.072-.087a.087.087,0,0,1,.014-.058.146.146,0,0,0,.014-.043,6.15,6.15,0,0,1,5.78-4.046A6.03,6.03,0,0,1,22,17.835c.014.043.058.072.072.116a1.06,1.06,0,0,0,.072.289,1.087,1.087,0,0,0,1.445.506,3.131,3.131,0,0,1,1.416-.318,3.251,3.251,0,1,1,0,6.5Z" transform="translate(-2.25 -3.24)" fill="#7554d4"/>
</svg>
`,
  parasol: `<svg xmlns="http://www.w3.org/2000/svg" width="26.409" height="26.409" viewBox="0 0 26.409 26.409">
  <path id="Path_163" data-name="Path 163" d="M27.684,19.436a2.6,2.6,0,0,0-3.25-4.063L21.725,17.54a4.411,4.411,0,0,1-2.749.962H16.47V12.407h7.178a2.3,2.3,0,0,0,2.3-2.3A7.861,7.861,0,0,0,18.1,2.25H12.827a7.861,7.861,0,0,0-7.855,7.855,2.3,2.3,0,0,0,2.3,2.3h7.178V18.5H4.85a2.6,2.6,0,0,0-2.6,2.6V22a2.6,2.6,0,0,0,2.6,2.6H6.787L5.135,27.075a1.011,1.011,0,0,0,.284,1.409,1.081,1.081,0,0,0,.569.176,1.017,1.017,0,0,0,.84-.447L9.238,24.6h9.751L21.4,28.212a.984.984,0,0,0,.84.447,1,1,0,0,0,.569-.176,1.023,1.023,0,0,0,.284-1.409L21.183,24.2a6.525,6.525,0,0,0,1.828-1.016L27.7,19.436ZM13.6,6.516A7.962,7.962,0,0,1,15.455,4.5,7.742,7.742,0,0,1,17.31,6.516a8.011,8.011,0,0,1,1.205,3.86H12.407a8.011,8.011,0,0,1,1.205-3.86Zm10.32,3.589a.272.272,0,0,1-.271.271H20.533a10.025,10.025,0,0,0-1.517-4.943A10.082,10.082,0,0,0,18.15,4.3a5.838,5.838,0,0,1,5.769,5.824Zm-16.929,0A5.838,5.838,0,0,1,12.76,4.281a11.47,11.47,0,0,0-.867,1.138,10.025,10.025,0,0,0-1.517,4.943H7.261a.272.272,0,0,1-.271-.271Zm11.986,12.46H4.85A.572.572,0,0,1,4.281,22V21.1a.572.572,0,0,1,.569-.569H18.976A6.491,6.491,0,0,0,23,19.125l2.709-2.167a.576.576,0,0,1,.609-.068.551.551,0,0,1,.325.515.572.572,0,0,1-.217.447h0L21.739,21.6a4.411,4.411,0,0,1-2.749.962Z" transform="translate(-2.25 -2.25)" fill="#2bc083"/>
</svg>
`,
};

const calendarIcons = {
  "2023-2-1": "sunny",
  "2023-2-2": "sunny",
  "2023-2-3": "sunny",
  "2023-2-4": "sunny",
  "2023-2-7": "partly-sunny",
  "2023-2-8": "partly-sunny",
  "2023-2-9": "partly-sunny",
  "2023-2-10": "thermometer",
  "2023-2-11": "thermometer",
  "2023-2-12": "thermometer",
  "2023-2-14": "cloudy",
  "2023-2-15": "cloudy",
  "2023-2-16": "cloudy",
  "2023-2-17": "cloudy",
  "2023-2-18": "cloudy",
  "2023-2-20": "parasol",
  "2023-2-21": "parasol",
  "2023-2-22": "parasol",
  "2023-2-23": "parasol",
  "2023-2-24": "parasol",
  "2023-2-25": "parasol",
  "2023-2-26": "parasol",
  "2023-2-27": "sunny",
  "2023-2-28": "sunny",
  "2023-2-29": "sunny",
  "2023-2-30": "sunny",
  "2023-2-31": "sunny",
};

function renderCalendar(month, year) {
  calendarDays.innerHTML = "";
  monthYear.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7; // Monday = 0, Sunday = 6

  // Calculate the minimum number of rows needed
  const totalDaysInCurrentMonth = lastDay.getDate();
  const totalCellsUsed = startDay + totalDaysInCurrentMonth;
  const minRowsNeeded = Math.ceil(totalCellsUsed / 7);
  const totalCellsNeeded = minRowsNeeded * 7;

  // Get previous month's last days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

  // Add previous month's last days
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const dayDiv = document.createElement("div");
    dayDiv.className =
      " flex flex-col items-center border hover:bg-gray-100 cursor-pointer p-4 rounded-md bg-white lg:bg-transparent text-sm md:text-lg lg:text-xl text-gray-400 font-proxima text-[#4e4e4e]/40 select-none";
    dayDiv.innerHTML = `<div>${day}</div>`;

    const iconKey = calendarIcons[`${prevYear}-${prevMonth}-${day}`];
    if (iconKey) {
      const iconSpan = document.createElement("span");
      iconSpan.className = "day-icon opacity-50";
      iconSpan.innerHTML = iconMapping[iconKey];
      dayDiv.appendChild(iconSpan);
    }

    calendarDays.appendChild(dayDiv);
  }

  // Add current month's days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className =
      " flex flex-col gap-2 md:gap-5 items-center  border hover:bg-gray-100 cursor-pointer p-4 rounded-md bg-white lg:bg-transparent text-sm md:text-lg lg:text-xl text-dark font-proxima select-none";
    dayDiv.innerHTML = `<div>${day}</div>`;

    const iconKey = calendarIcons[`${year}-${month}-${day}`];
    if (iconKey) {
      const iconSpan = document.createElement("span");
      iconSpan.className = "day-icon";
      iconSpan.innerHTML = iconMapping[iconKey];
      dayDiv.appendChild(iconSpan);
    }

    calendarDays.appendChild(dayDiv);
  }

  // Calculate remaining cells needed to complete the minimum required rows
  const remainingCells = totalCellsNeeded - totalCellsUsed;

  // Get next month details
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  // Add next month's first days only for the remaining cells needed
  for (let day = 1; day <= remainingCells; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className =
      " flex flex-col items-center border hover:bg-gray-100 cursor-pointer p-4 rounded-md bg-white lg:bg-transparent text-sm md:text-lg lg:text-xl text-gray-400 font-proxima text-[#4e4e4e]/40 select-none";
    dayDiv.innerHTML = `<div>${day}</div>`;

    const iconKey = calendarIcons[`${nextYear}-${nextMonth}-${day}`];
    if (iconKey) {
      const iconSpan = document.createElement("span");
      iconSpan.className = "day-icon opacity-50";
      iconSpan.innerHTML = iconMapping[iconKey];
      dayDiv.appendChild(iconSpan);
    }

    calendarDays.appendChild(dayDiv);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);
