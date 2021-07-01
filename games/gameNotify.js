var height = 0;

window.onload = function() {
    height += document.body.scrollHeight;
    sendPageData();
};

function sendPageData() {
    let data = new Object();
    data.height = height;
    let path = window.location.pathname;
    let page = path.split("/").pop().split(".")[0];
    data.id = page;

    let origin;
    if (window.location.protocol === "file:")    // because everything about webdev and security checks changes if you're testing locally ugh
    {
        origin = "*";
    } else {
        origin = window.parent.location.hostname;
    }

    console.log(origin);

    if (origin === "spookig.github.io" || origin === "*") // validate that the message is being sent to a trusted domain
    {
        parent.postMessage(data, "https://" + origin + window.parent.location.pathname); 
    }
}



function collapse(toggleElement) {
    toggleElement.classList.toggle("active");
    var content = toggleElement.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      height -= content.scrollHeight;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      height += content.scrollHeight;
    }

    sendPageData();
}