window.onload = function() {
    let data = new Object();
    data.height = document.body.scrollHeight;
    let path = window.location.pathname;
    let page = path.split("/").pop().split(".")[0];
    data.id = page;

    origin = window.parent.location;
    if (window.location.protocol === "file:")    // because everything about webdev and security checks changes if you're testing locally ugh
    {
        origin = "*";
    }

    if (origin.startsWith("https://spookig.github.io") || origin === "*") // validate that the message is being sent to a trusted domain
    {
        parent.postMessage(data, origin); 
    }
}