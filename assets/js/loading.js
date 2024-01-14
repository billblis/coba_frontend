document.addEventListener("DOMContentLoaded", function () {
    const awesomeLoaderWrapper = document.createElement("div");
    awesomeLoaderWrapper.classList.add("awesome-loader-wrapper");

    const awesomeLoaderContent = document.createElement("div");
    awesomeLoaderContent.classList.add("awesome-loader");

    for (let i = 0; i < 12; i++) {
        const circle = document.createElement("div");
        awesomeLoaderContent.appendChild(circle);
    }

    awesomeLoaderWrapper.appendChild(awesomeLoaderContent);
    document.body.appendChild(awesomeLoaderWrapper);

    const loadingModal = document.getElementById("loadingModal");

    function showAwesomeLoading() {
        document.body.style.overflow = "hidden"; // Prevent scrolling while loading
        awesomeLoaderWrapper.style.display = "flex";
    }

    function hideAwesomeLoading() {
        document.body.style.overflow = ""; // Enable scrolling after loading
        awesomeLoaderWrapper.style.display = "none";
    }

    function showLoadingModal() {
        loadingModal.style.display = "flex";
    }

    function hideLoadingModal() {
        loadingModal.style.display = "none";
    }

    const loginButton = document.getElementById("button");

    loginButton.addEventListener("click", function () {
        showAwesomeLoading();
        showLoadingModal();

        // Simulate a login request (replace this with your actual login logic)
        setTimeout(() => {
            hideAwesomeLoading();
            hideLoadingModal();
            // Optionally, you can redirect to another page after successful login
            window.location.href = "dashboard.html";
        }, 3000);
    });
});
