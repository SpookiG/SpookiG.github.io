var frameHeightLookup = new Object();

document.addEventListener("DOMContentLoaded", function(){
    let frames = document.getElementsByTagName("iframe");
    
    Array.prototype.forEach.call(frames, frame => {
        let frameKey = frame.getAttribute("class");
        frameHeightLookup[frameKey] = "0px";
    });

    //alert(frames[0].style.height.toString());
    
});

/*window.onload = function() {
    let frames = document.getElementsByTagName("iframe");

    console.log(parent.document.body.clientHeight);
    console.log(document.documentElement.scrollHeight);
}*/

/*function resizeHeight(frame) {
    console.log(frame.style.height);
    console.log(frame.contentWindow.height);

    console.log(frame.document.height);
}*/

window.onmessage = function(mess) {
    let frameKey = mess.data.id;
    frameHeightLookup[frameKey] = mess.data.height + "px";

    let frames = document.getElementsByClassName(mess.data.id);
    Array.prototype.forEach.call(frames, frame => {
        frame.style.height = frameHeightLookup[frameKey];
    });
    
}




function hideFrame(frame) {
    frame.style.height = "0px";
}

function showFrame(frame) {
    // height = iframe content size

    if (!frame.hasAttribute("src"))
    {
        let newSrc = "games/" + frame.getAttribute("class") + ".html";
        frame.setAttribute("src", newSrc);
    }
    
    let frameKey = frame.getAttribute("class");
    frame.style.height = frameHeightLookup[frameKey];
}


// todo:
/*

1. change message send * to specific window
2. load iframe and check tags to determine whether to hide ("Highlights-Programming" "Good-Art_Design")
3. use this on current default page
4. buttons to select goodness and area of work
5. Actually make the info pages



*/