var height = 0;
var sendResizeMessage = true;
var collapsableCollapsed = true;

window.onload = function() {
    // change webpage CSS depending on if in an iframe or not
    if (window === window.parent) {
        let page = document.getElementById("page");
        page.classList.add("page");
        let content = document.getElementById("content");
        content.classList.add("content");

        document.body.classList.remove("iframe-colour");

        let expandables = document.getElementsByClassName("clickable-image");
        Array.prototype.forEach.call(expandables, function(expandable) {
            expandable.onclick = function() { displayImage(expandable); };
        });

    } else {
        let page = document.getElementById("page");
        page.classList.remove("page");
        let content = document.getElementById("content");
        content.classList.remove("content");

        content.insertAdjacentHTML('afterbegin', '</br></br></br><div class="frame-separator"></div></br></br>');

        document.body.classList.add("iframe-colour");

        let expandables = document.getElementsByClassName("clickable-image");
        Array.prototype.forEach.call(expandables, function(expandable) {
            expandable.onclick = function() { sendImageToParent(expandable); };
        });
    }


    // attach onclick funtionality to collapsable content and expandable images here so it isn't needed in the html
    let collapsables = document.getElementsByClassName("collapsible");
    Array.prototype.forEach.call(collapsables, function(collapsable) {
        collapsable.onclick = function() { collapse(collapsable); };
    });

    

    // send height of page to parent
    height += document.body.scrollHeight;
    sendPageData();
};

window.onresize = function() {
    if (collapsableCollapsed) {
        height = document.body.scrollHeight;
        sendPageData();
    }
}

function sendPageData() {
    let data = new Object();
    data.type = "pageData";
    data.height = height;
    let path = window.location.pathname;
    let page = path.split("/").pop().split(".")[0];
    data.id = page;

    sendMessage(data);
}

function sendMessage(mess) {
    let origin;
    if (window.location.protocol === "file:")    // because everything about webdev and security checks changes if you're testing locally ugh
    {
        origin = "*";
    } else {
        origin = "https://" + window.parent.location.hostname + window.parent.location.pathname;
    }

    //console.log(origin);

    if (origin.startsWith("https://spookig.github.io") || origin === "*") // validate that the message is being sent to a trusted domain
    {
        parent.postMessage(mess, origin); 
    }
}



function collapse(toggleElement) {
    toggleElement.classList.toggle("active");
    var content = toggleElement.nextElementSibling;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
        height -= content.scrollHeight;

        parentResize(content, -content.scrollHeight);
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        height += content.scrollHeight;

        parentResize(content, content.scrollHeight);
    }

    collapsableCollapsed = false;
    setTimeout(function() { collapsableCollapsed = true; }, 200);
    sendPageData();
}

function parentResize(content, heightDifference) {
    let parentContainer = content.parentElement.closest(".collapsable-content");
    if (parentContainer != null) {
        let oldHeight = 0;
        if (parentContainer.style.maxHeight != "") {
            oldHeight = parseInt(parentContainer.style.maxHeight);
        }

        parentContainer.style.maxHeight = (oldHeight + heightDifference) + "px";
        //console.log(heightDifference);
        //console.log(oldHeight + " + " + heightDifference + " = " + parentContainer.style.maxHeight);

        //height += heightDifference;
        parentResize(parentContainer, heightDifference);
    }
}




function displayImage(image) {
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("modalImage");
    let captionText = document.getElementById("caption");

    modal.onclick = hideImage;
    modal.style.display = "block";
    modalImg.src = image.src;
    captionText.innerHTML = image.alt;
}

function sendImageToParent(image) {
    let data = new Object();
    data.type = "expandImage";
    data.src = image.src;
    data.alt = image.alt;

    sendMessage(data);
}

function hideImage() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.onclick = null;
}