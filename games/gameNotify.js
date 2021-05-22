window.onload = function() {
    let data = new Object();
    data.height = document.body.scrollHeight;
    let path = window.location.pathname;
    let page = path.split("/").pop().split(".")[0];
    data.id = page;

    //origin = "https://spookig.github.io/games.html";
    origin = window.parent.location;
    if (window.location.protocol == "file:")
    {
        origin = "*";
    }

    console.log("sent message to: " + origin);

    parent.postMessage(data, origin); 
}