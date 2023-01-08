const credit = ["FelixFromDiscord", "TheKodeToad", "eyezah"];
const creditTypes = [
	"Site created by {}.",
	"Made with the blood and tears of {}.",
	"Mostly stolen from stackoverflow by {}.",
	"Created using Wnidows 7 proffesionnall by {}.",
	"Created using an expiring Adobe Dreamweaver license by {}.",
	"Hosted by monkeys and programmed by {}."
];
const downloadButton = document.getElementById("download-button");

// https://stackoverflow.com/a/38241481/7658797
function getOSExtension() {
	const userAgent = window.navigator.userAgent;
	const platform = window.navigator.platform;
	const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K", "Darwin"];
	const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
	const iosPlatforms = ["iPhone", "iPad", "iPod"];

	if (macosPlatforms.indexOf(platform) !== -1)
		return ".dmg";
	else if (windowsPlatforms.indexOf(platform) !== -1)
		return ".exe";
	else if (iosPlatforms.indexOf(platform) !== -1)
		return null;
	else if (/Android/.test(userAgent))
		return null;
	else if (/Linux/.test(platform)) {
		if (/Ubuntu/.test(userAgent) || /Debian/.test(userAgent)) {
			return ".deb";
		}

		return ".AppImage";
	}
}

var os = getOSExtension();

if (os) {
	var request = new XMLHttpRequest();
	request.addEventListener("load", () => {
		var response = JSON.parse(request.responseText);

		// If the rate limit is exceeded, fall back to the less user friendly page
		if (!response.assets) {
			return;
		}

		for (var asset of response.assets) {
			if (asset.name.endsWith(os)) {
				downloadButton.href = asset.browser_download_url;
				return;
			}
		}
	});
	request.open("GET", "https://api.github.com/repos/TheKodeToad/Sol-Client/releases/latest");
	request.send();
} else
	downloadButton.innerText = "Unsupported";

if (window.matchMedia("(hover: hover)").matches) {
	const logo = document.querySelector(".logobg");
	const rotationMultiplier = 0.2;

	logo.style.animation = "initial";
	logo.style.transform = "initial";

	logo.addEventListener("mousemove", (event) => {
		const bounds = logo.getBoundingClientRect();
		const rotationX = -(event.clientY - bounds.y - bounds.height / 2) * rotationMultiplier;
		const rotationY = (event.clientX - bounds.x - (bounds.width / 2)) * rotationMultiplier;
		window.requestAnimationFrame(() => {
			logo.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
		});
	});

	logo.addEventListener("mouseleave", () => {
		logo.style.transform = "initial";
	});
};

const footer = document.querySelector("small");
let authors = "";

for (let i = 0; i < credit.length; i++) {
	authors += credit[i];
	if (i == credit.length - 2) {
		authors += " and ";
	} else if (i != credit.length - 1) {
		authors += ", ";
	}
}

footer.innerText = creditTypes[Math.floor(Math.random() * creditTypes.length)].replace("{}", authors);
