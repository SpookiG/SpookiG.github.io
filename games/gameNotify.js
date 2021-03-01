window.onload = function() {
    let data = new Object();
    data.height = document.body.scrollHeight;
    let path = window.location.pathname;
    let page = path.split("/").pop().split(".")[0];
    data.id = page;
    parent.postMessage(data,"*"); 
}