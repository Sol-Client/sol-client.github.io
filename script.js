var downloadButton = document.getElementById("download-button");


// https://stackoverflow.com/a/38241481/7658797
function getOSExtension() {
	var userAgent = window.navigator.userAgent;
	var platform = window.navigator.platform;
	var macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K", "Darwin"];
	var windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
	var iosPlatforms = ["iPhone", "iPad", "iPod"];

	if(macosPlatforms.indexOf(platform) !== -1) {
		return ".dmg";
	}
	else if(windowsPlatforms.indexOf(platform) !== -1) {
		return ".exe";
	}
	else if(iosPlatforms.indexOf(platform) !== -1) {
		return null;
	}
	else if(/Android/.test(userAgent)) {
		return null;
	}
	else if(/Linux/.test(platform)) {
		if(/Ubuntu/.test(userAgent) || /Debian/.test(userAgent)) {
			return ".deb";
		}
	
		return ".AppImage";
	}
}

var os = getOSExtension();

if(os) {
	var request = new XMLHttpRequest();
	request.addEventListener("load", (event) => {
		var response = JSON.parse(request.responseText);

		// If the rate limit is exceeded, fall back to the less user friendly page
		if(!response.assets) {
			return;
		}
		
		for(var asset of response.assets) {
			if(asset.name.endsWith(os)) {
				downloadButton.href = asset.browser_download_url;
				return;
			}
		}
	});
	request.open("GET", "https://api.github.com/repos/TheKodeToad/Sol-Client/releases/latest");
	request.send();
}
else {
	downloadButton.innerText = "Unsupported";
}

let movingArea = document.getElementById("header");
let logo = document.getElementById("logo");

if (!os) {
	logo.style.animation = "wheretfami 7s infinite";
}

function transforms(x, y, el) {
	let box = el.getBoundingClientRect();
	let cX = -(y - box.y - (box.height / 2)) / 20 * 1.15;
	let cY = (x - box.x - (box.width / 2)) / 20 * 1.15;
	
	return "perspective(1000px) "
    + "   rotateX("+ cX +"deg) "
    + "   rotateY("+ cY +"deg) ";
};

function transformElement(el, xyEl) {
	el.style.transform  = transforms.apply(null, xyEl);
}

movingArea.onmousemove = animateLogo;

function animateLogo(e) {
	let xy = [e.clientX, e.clientY];
	let position = xy.concat([logo]);

	window.requestAnimationFrame(function(){
    	transformElement(logo, position);
	});
};
