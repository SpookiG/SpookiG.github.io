var frameHeightLookup;
var qualitySelection;
var categorySelection;

document.addEventListener("DOMContentLoaded", function(){
    frameHeightLookup = new Object();
    let frames = document.getElementsByTagName("iframe");
    
    Array.prototype.forEach.call(frames, frame => {
        let frameKey = frame.getAttribute("class");
        frameHeightLookup[frameKey] = "0px";
    });

    qualitySelection = null;
    categorySelection = new Set();
    updateQualitySelection();
    updateCategorySelection();
    loadSelections();
    

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

    let frame = document.getElementById(frameKey);
    frame.style.height = frameHeightLookup[frameKey];
}




function hideFrame(frame) {
    frame.style.height = "0px";
}

function showFrame(frame) {
    // height = iframe content size
    let srcDirectory = window.location.pathname.split("/").pop().split(".")[0]; // maybe move somewhere else later for efficiency
    frame.src = srcDirectory + "/" + frame.id + ".html";
    let frameKey = frame.id;
    frame.style.height = frameHeightLookup[frameKey];
}


// quality selections => single variable
// category selections => array / set




function qualitySelect() {
    updateQualitySelection();
    loadSelections();
}

function categorySelect() {
    updateCategorySelection();
    loadSelections();
}





function updateQualitySelection() {
    // build up a set containing the current form selection
    let qualityForm = document.getElementById("quality-banner").getElementsByTagName("input");
    let formSelection = new Set();
    Array.prototype.forEach.call(qualityForm, item => {
        if (item.checked) {
            formSelection.add(item.parentNode.innerText);
        }
    });

    // remove current selected and check & set if a new selected has been made (for context, only one quality selection can be selected at a time)
    formSelection.delete(qualitySelection);
    Array.prototype.forEach.call(qualityForm, item => {                           // Have to do this roundabout check because ie doesn't support sets very much
        if (item.checked && formSelection.has(item.parentNode.innerText)) {
            qualitySelection = item.parentNode.innerText;
        }
    });

    if (qualitySelection === null) {
        // shouldn't ever be here but let's just catch this and go
        qualitySelection = qualityForm[0].parentNode.innerText;
    }

    // apply changes back to form
    Array.prototype.forEach.call(qualityForm, item => {
        if (item.parentNode.innerText === qualitySelection) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    });
}

function updateCategorySelection() {
    // build up a set containing the current form selection
    let categoryForm = document.getElementById("category-banner").getElementsByTagName("input");
    let formSelection = new Set();
    Array.prototype.forEach.call(categoryForm, item => {
        if (item.checked) {
            formSelection.add(item.parentNode.innerText);
        }
    });
    categorySelection = formSelection;
}

function loadSelections() {
    let frames = document.getElementById("frames").getElementsByTagName("iframe");
    Array.prototype.forEach.call(frames, frame => {
        // get 
        let highlightedCategories = frame.getAttribute('data-highlight').split(" ");
        let goodCategories = frame.getAttribute('data-good').split(" ");
        let visible = false;

        if (qualitySelection === "archive") {
            visible = true;
        } else {
            if (qualitySelection === "good work") {
                Array.prototype.forEach.call(goodCategories, category => {
                    if (categorySelection.has(category)) {
                        visible = true;
                    }
                });
            }

            // no need for a qualitySelection === highlights check here because highlights are also good work
            Array.prototype.forEach.call(highlightedCategories, category => {
                if (categorySelection.has(category)) {
                    visible = true;
                }
            });
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

5. Actually make the game info pages
    c. images in each segment & in summary
    g. change layout depending on if in frame or on the actual page?
    h. some bugs when resizing the window (if I css styled the background of frames would that matter?)

6. Add an other hobbies segment to my website (linking to photography, shaders, etc)
7. Big website summary
8. Add my name to that summary




*/