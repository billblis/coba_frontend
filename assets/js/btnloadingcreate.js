// script.js

document.addEventListener('DOMContentLoaded', function () {
    const button1Text = document.getElementById('button1-text');
    const button1Loader = document.getElementById('button1-loader');
    const createAccountButton = document.getElementById('button1');
  
    createAccountButton.addEventListener('click', function () {
      showCreateAccountLoadingState();
  
      // Simulate the account creation process (replace with actual AJAX call or relevant logic)
      simulateAccountCreation(function (success) {
        if (success) {
          hideCreateAccountLoadingState();
          button1Text.innerText = 'Account Created';
          // Add logic for navigation or actions after successful account creation
        } else {
          // Simulate account creation failure
          setTimeout(function () {
            hideCreateAccountLoadingState();
            button1Text.innerText = 'Create Account';
            // Add logic for displaying an error message or handling failure
            alert('Account creation failed. Please try again.');
          }, 2000); // Replace 2000 with the desired duration for error state
        }
      });
    });
  
    function showCreateAccountLoadingState() {
      button1Loader.style.display = 'inline-block';
      createAccountButton.disabled = true;
    }
  
    function hideCreateAccountLoadingState() {
      button1Loader.style.display = 'none';
      createAccountButton.disabled = false;
    }
  
    function simulateAccountCreation(callback) {
      // Simulate account creation success or failure randomly
      const success = Math.random() < 0.8; // Adjust the probability as needed
      callback(success);
    }
  });
  