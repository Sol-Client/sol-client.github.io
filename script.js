var credit = ["FelixFromDiscord", "TheKodeToad", "eyezah"];
var creditTypes = [
	"Site created by {}.",
	"Made with the blood and tears of {}.",
	"Mostly stolen from stackoverflow by {}.",
	"Created using Wnidows 7 proffesionnall by {}.",
	"Created using an expiring Adobe Dreamweaver license by {}.",
	"Hosted by monkeys and programmed by {}."
];
var downloadButton = document.getElementById("download-button");

var request = new XMLHttpRequest();
request.addEventListener("load", function () {
	var response = JSON.parse(request.responseText);

	// If the rate limit is exceeded, fall back to the less user friendly page
	if (!response[0])
		return;
	response = response[0];
	if (!response.assets)
		return;
	
	var asset = response.assets[0];
	if (!asset)
		return;
	if (!asset.browser_download_url)
		return;

	downloadButton.href = asset.browser_download_url;
});
request.open("GET", "https://api.github.com/repos/Sol-Client/installer/releases");
request.send();

if (window.matchMedia("(hover: hover)").matches) {
	var logo = document.querySelector(".logobg");
	var rotationMultiplier = 0.2;

	logo.style.animation = "initial";
	logo.style.transform = "initial";

	logo.addEventListener("mousemove", (event) => {
		var bounds = logo.getBoundingClientRect();
		var rotationX = -(event.clientY - bounds.y - bounds.height / 2) * rotationMultiplier;
		var rotationY = (event.clientX - bounds.x - (bounds.width / 2)) * rotationMultiplier;
		window.requestAnimationFrame(() => {
			logo.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
		});
	});

	logo.addEventListener("mouseleave", () => {
		logo.style.transform = "initial";
	});
};

var footer = document.querySelector("small");
var authors = "";

for (var i = 0; i < credit.length; i++) {
	authors += credit[i];
	if (i == credit.length - 2) {
		authors += " and ";
	} else if (i != credit.length - 1) {
		authors += ", ";
	}
}

footer.innerText = creditTypes[Math.floor(Math.random() * creditTypes.length)].replace("{}", authors);
