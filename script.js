let setups = [{ x: 0, y: 0, zoom: 2 }];
let setup = 0;

let x = setups[setup].x;
let y = setups[setup].y;
let zoom = setups[setup].zoom;

//Styles
let tilesets = [
	"mapbox/streets-v11", //Streets, 0
	"mapbox/satellite-v9", //Satellite, 1
	"mapbox/light-v10", //Light, 2
	"mapbox/dark-v10", //Dark, 3
	"mapbox/outdoors-v11", //Topographic, 4
];
let style = tilesets[0];

//Script
let map = L.map("mapid").setView([x, y], zoom);

function average(array) {
	let value = 0;
	for (let i = 0; i < array.length; i++) {
		value += array[i];
	}

	return value / array.length;
}

L.tileLayer(
	"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
	{
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: style,
		tileSize: 512,
		zoomOffset: -1,
		accessToken:
			"pk.eyJ1IjoiYjBiazR0IiwiYSI6ImNrazFzeWR0cDB1bTQydnBwN2xlbWd6d3UifQ.AnxiJC1924NDM6tqNTA2mw",
	}
).addTo(map);

let lines = [];

function line(array, title, colorName, label) {
	if (colorName == undefined) colorName = "blue";
	let polyline;

	polyline = L.polyline(array, {
		color: colorName,
	}).addTo(map);

	if (label) polyline.bindPopup(title);
	lines.push({
		id: title,
		object: polyline,
	});
}

function onMapClick(e) {
	let coords = e.latlng.toString().substring(7, 28);
	coords = coords.replace(")", "");
	navigator.clipboard.writeText(coords);
}
// map.on("click", onMapClick);

function getLine(id) {
	let line = lines.find((element) => element.id === id);
	return line;
}

let input = document.querySelector("input");

input.addEventListener("keydown", function (e) {
	if (e.code === "Enter" && input.value != "") {
		latitude();
	}
});

function latitude() {
	let x = input.value;
	let width = 360;

	if (x == "") {
		alert("Please enter a value");
	} else if (x < -90 || x > 90) {
		alert(
			`This value (${x}) is out of bounds, please stay between 90° and -90°`
		);
	} else {
		if (getLine("a")) {
			getLine("a").object.remove();
		}
		lines = [];
		line(
			[
				[x, -width],
				[x, width],
			],
			"a",
			"red",
			"false"
		);
	}
}
