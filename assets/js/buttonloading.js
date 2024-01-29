document.addEventListener('DOMContentLoaded', function () {
  // Login button logic
  const buttonText = document.getElementById('button-text');
  const buttonLoader = document.getElementById('button-loader');
  const loginButton = document.getElementById('button');

  loginButton.addEventListener('click', function () {
    showLoadingState();

    // Simulate the login process (replace with actual AJAX call or relevant logic)
    simulateLogin(function (success) {
      if (success) {
        hideLoadingState();
        buttonText.innerText = 'Logged in';
        // Add logic for navigation or actions after successful login
      } else {
        // Simulate login failure
        setTimeout(function () {
          hideLoadingState();
          buttonText.innerText = 'Sign in';
        }, 2000); // Replace 2000 with the desired duration for error state
      }
    });
  });

  // Create Account button logic
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
        }, 2000); // Replace 2000 with the desired duration for error state
      }
    });
  });

  function showLoadingState() {
    buttonLoader.style.display = 'inline-block';
    loginButton.disabled = true;
  }

  function hideLoadingState() {
    buttonLoader.style.display = 'none';
    loginButton.disabled = false;
  }

  function showCreateAccountLoadingState() {
    button1Loader.style.display = 'inline-block';
    createAccountButton.disabled = true;
  }

  function hideCreateAccountLoadingState() {
    button1Loader.style.display = 'none';
    createAccountButton.disabled = false;
  }

  function simulateLogin(callback) {
    // Simulate login success or failure randomly
    const success = Math.random() < 0.8; // Adjust the probability as needed
    callback(success);
  }

  function simulateAccountCreation(callback) {
    // Simulate account creation success or failure randomly
    const success = Math.random() < 0.8; // Adjust the probability as needed
    callback(success);
  }
});