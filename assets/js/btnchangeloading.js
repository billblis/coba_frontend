// script.js

document.addEventListener('DOMContentLoaded', function () {
    const changePasswordText = document.getElementById('change-password-text');
    const changePasswordLoader = document.getElementById('change-password-loader');
    const changePasswordButton = document.getElementById('change-password-button');
  
    changePasswordButton.addEventListener('click', function () {
      showChangePasswordLoadingState();
  
      // Simulate the change password process (replace with actual AJAX call or relevant logic)
      simulateChangePassword(function (success) {
        if (success) {
          hideChangePasswordLoadingState();
          changePasswordText.innerText = 'Password Changed';
          // Add logic for navigation or actions after successful password change
        } else {
          // Simulate change password failure
          setTimeout(function () {
            hideChangePasswordLoadingState();
            changePasswordText.innerText = 'Change Password';
            // Add logic for displaying an error message or handling failure
            alert('Password change failed. Please try again.');
          }, 2000); // Replace 2000 with the desired duration for error state
        }
      });
    });
  
    function showChangePasswordLoadingState() {
      changePasswordLoader.style.display = 'inline-block';
      changePasswordButton.disabled = true;
    }
  
    function hideChangePasswordLoadingState() {
      changePasswordLoader.style.display = 'none';
      changePasswordButton.disabled = false;
    }
  
    function simulateChangePassword(callback) {
      // Simulate change password success or failure randomly
      const success = Math.random() < 0.8; // Adjust the probability as needed
      callback(success);
    }
  });
  