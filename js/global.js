loadTheme();

window.onload = function(){
    if(loggedIn){
        getUserInfo();
    }
}
if(localStorage.getItem('pfp') !== null && localStorage.getItem('pfp') !== ""){
    document.getElementById('navpfp').src = localStorage.getItem('pfp');
}

var sess = localStorage.getItem("sess");
var loggedIn = false;
if(sess !== null && sess !== ""){
    loggedIn = true;
}
if(loggedIn){
    document.getElementById("loggedOut").style.display = "none";
    document.getElementById("loggedIn").style.display = "flex";
}

// nav dropdown //
function updateNavDropdownContent(){
    if(loggedIn){
        document.getElementById("loggedInAs").innerHTML = localStorage.getItem("username");
        document.getElementById("loggedInAs").title = 'Logged in as '+localStorage.getItem("username");
    }
}
// nav dropdown display //
var pfpNavDropdown = document.getElementById('pfpNavDropdown');
var navDropdown = document.getElementById('navDropdown');
document.addEventListener("click", function(event) {
    var isClickInside = pfpNavDropdown.contains(event.target);
    var navDropdownContent = navDropdown.contains(event.target);
    
    if(document.getElementById("navDropdown").style.display == "none" || navDropdownContent){
        document.getElementById('navDropdown').style.display = "block";
        document.getElementById('pfpNavDropdown').classList.add("active");
    }else{
        document.getElementById("navDropdown").style.display = "none";
        document.getElementById("pfpNavDropdown").classList.remove("active");
    }
    if (!isClickInside && !navDropdownContent) {
        //the click was outside the nav dropdown
        document.getElementById("navDropdown").style.display = "none";
        document.getElementById("pfpNavDropdown").classList.remove("active");
    }
});

// login popup //
var popuped = false;
function loginPopUp() {
    if (!popuped) {
        popuped = true;
        var loginpopup = window.open("https://stibarc.com/login/", "", "menubar=no,location=no,resizable=no,scrollbars=yes,status=yes,height=360,width=500");
        window.addEventListener("message", function(evt) {
            if (evt.data != "Cancelled") {
                localStorage.sess = evt.data;
                console.log(evt.data);
                loginpopup.close();
                location.href = "index.html";
            }else {
                loginpopup.close();
                popuped = false;
            }
        });
    }
}

// get profile info //
function getUserInfo(){
    if(localStorage.getItem("username") == null){
        console.log('Username ls not set, requesting it.');
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            localStorage.setItem("username",  xhttp.responseText);
            console.log('Username ls is set.');
            updateNavDropdownContent();
            getUserPfp();
        };
        xhttp.open('GET', 'https://api.stibarc.com/v2/getusername.sjs?sess='+localStorage.getItem("sess"), true);
        xhttp.send();
    }else{
        updateNavDropdownContent();
        getUserPfp();
    }
}
// get profile pfp //
function getUserPfp(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var userPfp = xhttp.responseText;
        localStorage.setItem('pfp', userPfp);
        document.getElementById('navpfp').src = localStorage.getItem('pfp');
    };
    xhttp.open('GET', 'https://api.stibarc.com/v2/getuserpfp.sjs?id='+localStorage.getItem("username"), true);
    xhttp.send();
}

// load theme //
function loadTheme() {
	try {
		var theme = localStorage.getItem('theme');
		if (theme != undefined) {
			if (theme == "custom") {
				if (localStorage.getItem('customtheme').trim() != "") {
					document.getElementById('themer').href = localStorage.getItem('customtheme');
				} else {
					document.getElementById('themer').href = 'css/themes/light.css';
				}
			} else {
				document.getElementById('themer').href = 'css/themes/'+theme+".css";
			}
		} else {
			document.getElementById('themer').href = 'css/themes/light.css';
		}
	} catch(err) {
		console.error(err);
	}
}

// logout //
function logout() {
	console.log('Loging out... (Sending request to kill session)');
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("pfp");
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var tmp = xhttp.responseText;
        console.log('Loging out... (Request sent)');
        if(tmp == 'gud\n'){
            // logout went ok
            window.localStorage.removeItem("sess");
            console.log('Loging out complete: '+tmp);
            location.href = "index.html";
        }else{
            // logout request sent but might no be ok
            console.log('Logout failed (Request error: '+tmp+')');
            alert('Logout may have failed (Request error: '+tmp+')');
        }
    };
    xhttp.open("GET", "https://api.stibarc.com/logout.sjs?sess="+window.localStorage.getItem("sess"), true);
    xhttp.send();
}

// get url path from hash //
function getUrlPathHash(){
    var afterHash = window.location.hash.substr(1);
    return afterHash;
}
// get url params //
function getAllUrlParams(url) {
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
	var obj = {};
	if (queryString) {
		queryString = queryString.split('#')[0];
		var arr = queryString.split('&');
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split('=');
			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function (v) {
				paramNum = v.slice(1, -1);
				return '';
			});
			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
			paramName = paramName;
			paramValue = paramValue;
			if (obj[paramName]) {
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [obj[paramName]];
				}
				if (typeof paramNum === 'undefined') {
					obj[paramName].push(paramValue);
				}
				else {
					obj[paramName][paramNum] = paramValue;
				}
			}
			else {
				obj[paramName] = paramValue;
			}
		}
	}
	return obj;
}