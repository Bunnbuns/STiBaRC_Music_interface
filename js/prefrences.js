try {
    document.getElementById("themechng").value = localStorage.getItem("theme");
    document.getElementById("themecust").value = localStorage.getItem("customtheme");
    if(localStorage.getItem("theme") == undefined){
        document.getElementById("themechng").value = "light";
    }
    if (localStorage.getItem("theme") != "custom") {
        document.getElementById("themecust").style.display = "none";
    } else {
        document.getElementById("themecust").style.display = "";
    }
} catch(err){}

document.getElementById("themechng").onchange = function(evt) {
    var value = document.getElementById("themechng").value;
    localStorage.setItem("theme", value);
    if (value != "custom") {
        document.getElementById("themecust").style.display = "none";
        loadTheme();
    } else {
        document.getElementById("themecust").style.display = "";
    }
}

document.getElementById("submit").onclick = function(evt) {
    var value = document.getElementById("themecust").value;
    localStorage.setItem("customtheme", value);
    if (value.trim() != "") {
        loadTheme();
    }
    document.location = "index.html";
}
