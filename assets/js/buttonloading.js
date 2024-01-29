  const buttonText = document.getElementById('button-text');
  const buttonLoader = document.getElementById('button-loader');
  const loginButton = document.getElementById('button');

  loginButton.addEventListener('click', function() {
    showLoadingState();

    // Simulasikan proses login (Anda dapat menggantinya dengan panggilan AJAX atau yang sesuai)
    simulateLogin(function() {
      hideLoadingState();
      buttonText.innerText = 'Logged in';
      // Tambahkan logika untuk navigasi atau tindakan setelah login
    });
  });

  function showLoadingState() {
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
  }

  function hideLoadingState() {
    buttonText.style.display = 'inline-block';
    buttonLoader.style.display = 'none';
  }

  function simulateLogin(callback) {
    setTimeout(callback, 2000); // Gantilah angka 2000 dengan durasi login yang sesuai
  }

