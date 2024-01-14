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

    function showAwesomeLoading() {
        document.body.style.overflow = "hidden"; // Prevent scrolling while loading
        awesomeLoaderWrapper.style.display = "flex";
    }

    function hideAwesomeLoading() {
        document.body.style.overflow = ""; // Enable scrolling after loading
        awesomeLoaderWrapper.style.display = "none";
    }

    const loginButton = document.getElementById("button");

    loginButton.addEventListener("click", function () {
        showAwesomeLoading();
        setTimeout(() => {
            hideAwesomeLoading();
            window.location.href = "dashboard.html"; // Redirect to dashboard after successful login
        }, 3000);
    });
});
