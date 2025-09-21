class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        // Sample shift data
        this.shifts = {
            '2023-3-1': 'day', '2023-3-2': 'day', '2023-3-3': 'day', '2023-3-4': 'day', '2023-3-5': 'day',
            '2023-3-6': 'morning', '2023-3-7': 'morning', '2023-3-8': 'morning', '2023-3-9': 'sick', 
            '2023-3-10': 'sick', '2023-3-11': 'sick', '2023-3-12': 'none',
            '2023-3-13': 'none', '2023-3-14': 'night', '2023-3-15': 'night', '2023-3-16': 'night', 
            '2023-3-17': 'night', '2023-3-18': 'night', '2023-3-19': 'none',
            '2023-3-20': 'leave', '2023-3-21': 'leave', '2023-3-22': 'leave', '2023-3-23': 'leave', 
            '2023-3-24': 'leave', '2023-3-25': 'leave', '2023-3-26': 'leave',
            '2023-3-27': 'day', '2023-3-28': 'day', '2023-3-29': 'day', '2023-3-30': 'day', '2023-3-31': 'day'
        };
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.renderWeeklySchedule();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('prevMonth').addEventListener('click', () => this.prevMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
    }

    prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
        this.renderWeeklySchedule();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
        this.renderWeeklySchedule();
    }

    getShiftIcon(shiftType) {
        const icons = {
            'day': `<img src="./assets/Icons/day shift.svg" alt="Day shift" class="w-5 h-5">`,
            'morning': `<img src="./assets/Icons/morning shift.svg" alt="Morning shift" class="w-5 h-5">`,
            'night': `<img src="./assets/Icons/night shift.svg" alt="Night shift" class="w-5 h-5">`,
            'sick': `<img src="./assets/Icons/Sick.svg" alt="Sick leave" class="w-5 h-5">`,
            'leave': `<img src="./assets/Icons/Leave.svg" alt="Leave" class="w-5 h-5">`,
            'none': ''
        };
        return icons[shiftType] || '';
    }

    renderCalendar() {
        const monthYear = document.getElementById('monthYear');
        const calendarGrid = document.getElementById('calendarGrid');
        
        monthYear.textContent = `${this.months[this.currentMonth]} ${this.currentYear}`;
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert to Monday = 0
        
        calendarGrid.innerHTML = '';
        
        // Previous month's trailing days
        const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonth.getDate() - i;
            const cell = this.createCalendarCell(day, true);
            calendarGrid.appendChild(cell);
        }
        
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = this.createCalendarCell(day, false);
            calendarGrid.appendChild(cell);
        }
        
        // Next month's leading days
        const totalCells = calendarGrid.children.length;
        const remainingCells = 42 - totalCells; // 6 rows × 7 days
        for (let day = 1; day <= remainingCells; day++) {
            const cell = this.createCalendarCell(day, true);
            calendarGrid.appendChild(cell);
        }
    }

    createCalendarCell(day, isOtherMonth) {
        const cell = document.createElement('div');
        cell.className = `h-16 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg relative ${isOtherMonth ? 'text-gray-300' : 'text-gray-700'}`;
        
        const daySpan = document.createElement('span');
        daySpan.textContent = day;
        daySpan.className = 'font-medium text-base mb-1';
        cell.appendChild(daySpan);
        
        if (!isOtherMonth) {
            const shiftKey = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
            const shiftType = this.shifts[shiftKey];
            
            if (shiftType && shiftType !== 'none') {
                const iconContainer = document.createElement('div');
                iconContainer.className = 'flex items-center justify-center';
                iconContainer.innerHTML = this.getShiftIcon(shiftType);
                cell.appendChild(iconContainer);
            }
        }
        
        return cell;
    }

    renderWeeklySchedule() {
        const weeklySchedule = document.getElementById('weeklySchedule');
        const today = new Date();
        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
        
        weeklySchedule.innerHTML = '';
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(currentWeekStart.getDate() + i);
            
            const dayName = this.days[i];
            const monthName = this.months[date.getMonth()];
            const dayNumber = date.getDate();
            
            const shiftKey = `${date.getFullYear()}-${date.getMonth() + 1}-${dayNumber}`;
            const shiftType = this.shifts[shiftKey] || 'none';
            
            const scheduleItem = this.createScheduleItem(dayName, monthName, dayNumber, shiftType);
            weeklySchedule.appendChild(scheduleItem);
        }
    }

    createScheduleItem(dayName, monthName, dayNumber, shiftType) {
        const item = document.createElement('div');
        
        if (shiftType === 'none') {
            item.className = 'flex items-center justify-between p-5 bg-gray-50 rounded-2xl';
            item.innerHTML = `
                <span class="text-gray-500 font-medium text-base">${dayName} ${monthName} ${dayNumber}</span>
                <span class="text-gray-400 text-base">No shift</span>
            `;
        } else {
            const bgColor = shiftType === 'night' ? 'bg-purple-500' : 
                           shiftType === 'morning' ? 'bg-orange-500' :
                           shiftType === 'day' ? 'bg-blue-500' :
                           shiftType === 'sick' ? 'bg-red-500' : 'bg-green-500';
            
            const shiftText = shiftType === 'night' ? 'Night shift' : 
                            shiftType === 'morning' ? 'Morning shift' : 
                            shiftType === 'day' ? 'Day shift' : 
                            shiftType === 'sick' ? 'Sick leave' : 'Leave';
            
            const iconPath = shiftType === 'night' ? './assets/Icons/night shift.svg' : 
                           shiftType === 'morning' ? './assets/Icons/morning shift.svg' :
                           shiftType === 'day' ? './assets/Icons/day shift.svg' :
                           shiftType === 'sick' ? './assets/Icons/Sick.svg' : './assets/Icons/Leave.svg';
            
            item.className = `flex items-center justify-between p-5 ${bgColor} text-white rounded-2xl`;
            item.innerHTML = `
                <span class="font-medium text-base">${dayName} ${monthName} ${dayNumber}</span>
                <div class="flex items-center space-x-3">
                    <img src="${iconPath}" alt="${shiftText}" class="w-5 h-5 filter brightness-0 invert">
                    <span class="text-base">${shiftText}</span>
                </div>
            `;
        }
        
        return item;
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});