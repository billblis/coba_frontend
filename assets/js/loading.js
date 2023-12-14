document.addEventListener("DOMContentLoaded", function () {
    var loaderWrapper = document.createElement("div");
    loaderWrapper.id = "loader-wrapper";
    loaderWrapper.innerHTML = `
        <div id="loader"></div>
        <div id="loader"></div>
        <div id="loader"></div>
        <div id="loader"></div>
        <div id="loader"></div>    
    `;
    
    document.body.appendChild(loaderWrapper);
  
    setTimeout(function () {
        loaderWrapper.style.display = 'none';
    }, 3000);
    
  });