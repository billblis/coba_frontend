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
  
    // "Tambah" button logic
    const insertButton = document.getElementById('btnInsert');
    const insertLoader = document.getElementById('insert-loader');
  
    insertButton.addEventListener('click', function () {
      showInsertLoadingState();
  
      // Simulate the data insertion process
      simulateInsertion(function (success) {
        if (success) {
          // Simulate data insertion success after a delay
          setTimeout(function () {
            // Replace the following line with your actual logic for data insertion
            console.log('Data inserted successfully');
  
            // Hide loading state and enable the button
            hideInsertLoadingState();
          }, 2000); // Replace 2000 with the desired duration for data insertion
        } else {
          // Simulate data insertion failure after a delay
          setTimeout(function () {
            // Log an error message or perform any other error-handling logic
            console.log('Data insertion failed');
  
            // Hide loading state and enable the button
            hideInsertLoadingState();
          }, 2000); // Replace 2000 with the desired duration for failure state
        }
      });
    });
  
    function showInsertLoadingState() {
      insertLoader.style.display = 'inline-block';
      insertButton.disabled = true;
    }
  
    function hideInsertLoadingState() {
      insertLoader.style.display = 'none';
      insertButton.disabled = false;
    }
  
    function simulateInsertion(callback) {
      // Simulate data insertion success or failure randomly
      const success = Math.random() < 0.8; // Adjust the probability as needed
      callback(success);
    }
  });
  