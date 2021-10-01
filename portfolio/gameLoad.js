var frameHeightLookup;
var frameActive;
var qualitySelection;
//var categorySelection;
//var engineSelection;
//var dimensionSelection;
var loaded = false;

document.addEventListener("DOMContentLoaded", function(){
    frameHeightLookup = new Object();
    frameActive = new Object();
    let frames = document.getElementsByTagName("iframe");
    
    Array.prototype.forEach.call(frames, function(frame) {
        let frameKey = frame.id;
        frameActive[frameKey] = true;
    });

    qualitySelection = null;
    //categorySelection = new Set();
    updateQualitySelection();
    //updateCategorySelection();
    loadSelections();

    //alert(frames[0].style.height.toString());
    loaded = true;
    
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
    if (mess.data.type === "pageData") {
        let frameKey = mess.data.id;
        frameHeightLookup[frameKey] = mess.data.height + "px";

        adjustFrameSize(frameKey);
    } else if (mess.data.type === "expandImage") {
        // copying over function displayImage from gameNotify.js

        let modal = document.getElementById("myModal");
        let modalImg = document.getElementById("modalImage");
        let captionText = document.getElementById("caption");

        modal.onclick = hideImage;
        modal.style.display = "block";
        modalImg.src = mess.data.src;
        captionText.innerHTML = mess.data.alt;
    }
}


function adjustFrameSize(frameKey) {
    if (frameActive[frameKey]) {
        if (loaded) {
            let frame = document.getElementById(frameKey);
            frame.style.height = frameHeightLookup[frameKey];
        } else {
            console.log("yo");
            setTimeout(function() { adjustFrameSize(frameKey) }, 50);
        }
    }
}


function hideImage() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.onclick = null;
}




function hideFrame(frame) {
    frame.style.height = "0px";
    frameActive[frame.id] = false;
}

function showFrame(frame) {
    // height = iframe content size
    if (frame.src === "") {
        let srcDirectory = window.location.pathname.split("/").pop().split(".")[0]; // maybe move somewhere else later for efficiency
        frame.src = srcDirectory + "/" + frame.id + ".html";
    }
    
    let frameKey = frame.id;
    frame.style.height = frameHeightLookup[frameKey];
    frameActive[frameKey] = true;
}


// quality selections => single variable
// category selections => array / set




function qualitySelect() {
    updateQualitySelection();
    loadSelections();
}

// function categorySelect() {
//     updateCategorySelection();
//     loadSelections();
// }





function updateQualitySelection() {
    // build up a set containing the current form selection
    let qualityForm = document.getElementById("quality-banner").getElementsByTagName("input");
    let formSelection = new Set();
    Array.prototype.forEach.call(qualityForm, function(item) {
        if (item.checked) {
            formSelection.add(item.parentNode.innerText);
        }
    });

    // remove current selected and check & set if a new selected has been made (for context, only one quality selection can be selected at a time)
    formSelection.delete(qualitySelection);
    Array.prototype.forEach.call(qualityForm, function(item) {                           // Have to do this roundabout check because ie doesn't support sets very much
        if (item.checked && formSelection.has(item.parentNode.innerText)) {
            qualitySelection = item.parentNode.innerText;
        }
    });

    if (qualitySelection === null) {
        // shouldn't ever be here but let's just catch this and go
        qualitySelection = qualityForm[0].parentNode.innerText;
    }

    // apply changes back to form
    Array.prototype.forEach.call(qualityForm, function(item) {
        if (item.parentNode.innerText === qualitySelection) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    });
}

// function updateCategorySelection() {
//     // build up a set containing the current form selection
//     let categoryForm = document.getElementById("category-banner").getElementsByTagName("input");
//     let formSelection = new Set();
//     Array.prototype.forEach.call(categoryForm, function(item) {
//         if (item.checked) {
//             formSelection.add(item.parentNode.innerText);
//         }
//     });
//     categorySelection = formSelection;
// }

function loadSelections() {
    let frames = document.getElementById("frames").getElementsByTagName("iframe");
    Array.prototype.forEach.call(frames, function(frame) {
        let visible = false;

        if (qualitySelection === "archive") {
            visible = true;
        } else {
            if (qualitySelection === "good work") {
                if (frame.getAttribute('data-quality') === "good") {
                    visible = true;
                }
            }

            // no need for a qualitySelection === highlights check here because highlights are also good work
            if (frame.getAttribute('data-quality') === "highlight") {
                visible = true;
            }
        }
        
        if (visible) {
            showFrame(frame);
        } else {
            hideFrame(frame);
        }
    });
}




// todo:
/*

5.6 add all images to iframes
    art
    design
    programming
5.7 lazy load iframes? Depends how slow games page ends up
6. Add an other hobbies segment to my website (linking to photography, shaders, etc)
7. Big website summary
8. Add my name to that summary




*/