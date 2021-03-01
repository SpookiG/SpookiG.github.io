document.addEventListener("DOMContentLoaded", function(){
    let frames = document.getElementsByTagName("iframe");

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
    let frames = document.getElementsByClassName(mess.data.id);
    Array.prototype.forEach.call(frames, frame => {
        frame.style.height = mess.data.height + "px";
    });
    
}