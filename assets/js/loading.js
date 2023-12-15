// refined-loading.js

document.addEventListener("DOMContentLoaded", function () {
    const refinedLoaderWrapper = document.createElement("div");
    refinedLoaderWrapper.classList.add("refined-loader-wrapper");
  
    const refinedLoaderContent = document.createElement("div");
    refinedLoaderContent.classList.add("refined-loader");
  
    for (let i = 0; i < 12; i++) {
      const circle = document.createElement("div");
      refinedLoaderContent.appendChild(circle);
    }
  
    refinedLoaderWrapper.appendChild(refinedLoaderContent);
    document.body.appendChild(refinedLoaderWrapper);
  
    function showRefinedLoading() {
      refinedLoaderWrapper.style.display = "flex";
    }
  
    function hideRefinedLoading() {
      refinedLoaderWrapper.style.display = "none";
    }
  
    showRefinedLoading();
    setTimeout(hideRefinedLoading, 3000);
  });
  