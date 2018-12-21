//JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
var imageAddr = "https://i.imgur.com/5QjKrLY.jpg"; 
var downloadSize = 5178005; // 4.9Mbytes in bytes
function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedbitps = (bitsLoaded / duration).toFixed(0);
        var speedBps = (downloadSize / duration).toFixed(0);
        var speedKbitps = (speedbitps / 1024).toFixed(0);
        var speedKBps = (speedBps / 1024).toFixed(0);
        var speedMbitps = (speedKbitps / 1024).toFixed(2);
        var speedMBps = (speedKBps / 1024).toFixed(2);
        ShowProgressMessage([
            "Your connection speed (in BYTES) is:", 
            speedBps + " B/s", 
            speedKBps + " KB/s", 
            speedMBps + " MB/s",
            "<br />",
            "Your connection speed (in BITS) is:",
            speedbitps + " bps",
            speedKbitps + " Kbps",
            speedMbitps + " Mbps"
        ]);
    }
}
