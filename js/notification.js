// Profile Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');
    
    // Toggle dropdown when profile button is clicked
    profileButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
            closeDropdown();
        }
    });
    
    // Close dropdown when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDropdown();
        }
    });
    
    // Handle dropdown item clicks
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            
            switch(text) {
                case 'Profile':
                    handleProfileClick();
                    break;
                case 'Settings':
                    handleSettingsClick();
                    break;
                case 'Logout':
                    handleLogoutClick();
                    break;
            }
            
            closeDropdown();
        });
    });
    
    function toggleDropdown() {
        if (profileDropdown.classList.contains('hidden')) {
            openDropdown();
        } else {
            closeDropdown();
        }
    }
    
    function openDropdown() {
        profileDropdown.classList.remove('hidden');
        profileDropdown.classList.add('dropdown-show');
        
        // Add active state to profile button
        profileButton.classList.add('bg-gray-100');
    }
    
    function closeDropdown() {
        profileDropdown.classList.add('hidden');
        profileDropdown.classList.remove('dropdown-show');
        
        // Remove active state from profile button
        profileButton.classList.remove('bg-gray-100');
    }
    
    function handleProfileClick() {
        console.log('Profile clicked');
        // Add your profile page navigation logic here
        // Example: window.location.href = 'profile.html';
    }
    
    function handleSettingsClick() {
        console.log('Settings clicked');
        // Add your settings page navigation logic here
        // Example: window.location.href = 'settings.html';
    }
    
    function handleLogoutClick() {
        console.log('Logout clicked');
        // Add your logout logic here
        // Example: 
        // if (confirm('Are you sure you want to logout?')) {
        //     localStorage.clear();
        //     sessionStorage.clear();
        //     window.location.href = 'login.html';
        // }
    }
});