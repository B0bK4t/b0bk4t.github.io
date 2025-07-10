//En utilisant https://leafletjs.com/ Github: https://github.com/Leaflet/Leaflet
//Documentation https://leafletjs.com/reference.html

//Setup map
let views = [
	//[x, y], zoom
	[48.511, -66.764, 8], //Global
	[47.91933, -69.22099, 15], //VIG
	[48.697947, -67.866519, 13], //BDS
	[48.204712, -66.135434, 13], //CAR
	[48.3128, -66.7297, 12], //MUU
	[49.097906, -64.641406, 13], //AAV
	[49.180976, -65.46173, 13], //GMO
	[49.177678, -64.941747, 14], //MSE
];

let parcs = {
	0: 0,
	VIG: 1,
	BDS: 2,
	CAR: 3,
	MUU: 4,
	AAV: 5,
	GMO: 6,
	MSE: 7,
};

function flyTo(parc) {
	parc = parcs[parc];
	map.flyTo([views[parc][0], views[parc][1]], views[parc][2]);
}

var map = L.map('map').setView([views[0][0], views[0][1]], views[0][2]);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', //Doc pour l'API OSM: https://operations.osmfoundation.org/policies/tiles/
}).addTo(map);

//Setup modals
let modalT = document.querySelector('#modalT');
// modalT.querySelector('.close').addEventListener('click', function () {
// 	modalT.style.display = 'none';
// });

// let modalP = document.querySelector('#modalP');
// modalP.querySelector('.close').addEventListener('click', function () {
// 	modalP.style.display = 'none';
// });

function openModal(modal, name) {
	modal.style.display = 'initial';
	modal.querySelector('.nom').innerHTML = name;
	let newContent = [];

	let problemes = initialDataArray.filter(function (probleme) {
		return probleme.id == name;
	});

	for (let i = 0; i < problemes.length; i++) {
		const p = problemes[i];

		let photos = initialPhotoArray.filter(function (photo) {
			return photo.rapport == p.rapport;
		});

		//Bonne turbine
		let p_turbines = photos.filter(function (photo) {
			return photo.file.includes(p.parc + '-' + p.nbRaw);
		});

		//Bon côté
		let p_sides = p_turbines.filter(function (photo) {
			if (photo.double_name == true) {
				return photo.file.includes(
					p.side.substring(0, 2) +
						p.parc +
						'-' +
						p.nbRaw +
						p.side.substring(1, p.side.length)
				);
			}
			return photo.file.includes(p.side);
		});

		let imgs = '';
		for (let j = 0; j < p_sides.length; j++) {
			let photo = p_sides[j];
			imgs += `<img src='data/${p.rapport}/img/${photo.file}'>\n`;
		}

		newContent.push({
			content: `
		<h3>${p.date} (${p.side}) &ndash; ${p.desc}</h3>
		${imgs}
		`,
			compare: p.date,
		});
	}

	if (problemes.length == 0) {
		newContent = [
			{
				content: `<h3>Aucun problème</h3><div style='width: 650px; height: 380px;'></div>`,
			},
		];
	}

	newContent.sort(compare);
	newContent.reverse();

	modal.querySelector('.modal-content').innerHTML = '';

	for (let i = 0; i < newContent.length; i++) {
		modal.querySelector('.modal-content').innerHTML +=
			newContent[i].content + '\n';
	}
}

//Setup arborescence
function populateArborescence() {
	let years = [2025];

	let html = '';

	for (let i = 0; i < years.length; i++) {
		const y = years[i];

		html += `<h2 onclick="toYear(${y})">${y}</h2>\n`;
		let bkillers = `<h3>Blade killers</h3>\n`;
		let bris = `<h3>Bris majeurs</h3>\n`;

		for ([key, value] of Object.entries(parcs)) {
			if (key != '0') {
				let row = `<h4 onclick="toParc('${key}', ${y})">${key}</h4>\n`;
				bkillers += row + `<ul id="${key}${y}C5"></ul>\n`;
				bris += row + `<ul id="${key}${y}C4"></ul>\n`;
			}
		}

		html += bkillers;
		html += bris;
	}

	document.querySelector('.arborescence').innerHTML = html;
}
populateArborescence();

//Points sur la carte
function parc(x, y, desc) {
	let marker = L.marker([x, y]).addTo(map);
	marker.on('click', function () {
		toParc(desc);
		// openModal(modalP, desc);
		modalT.style.display = 'none';
	});
}

let turbineClicked = false;
let turbineTotal = 0;
let turbinesCoords = [];
function turbine(x, y, id, clr, radius = 100) {
	turbineTotal++;

	// let clrs = ['red', 'yellow', 'blue', 'green'];
	// clr = clrs[Math.floor(Math.random() * 4)];
	clr = 'blue';

	let circle = L.circle([x, y], { radius: radius, color: clr }).addTo(map);
	turbinesCoords.push({ id: id, x: x, y: y });
	circle.on('click', function () {
		turbineClicked = true;
		toTurbine(id);
		// openModal(modalT, id); //Dans toTurbine()
		// modalP.style.display = 'none';
	});
}

//Clic sur la carte
function onMapClick(e) {
	// modalP.style.display = 'none';
	if (!turbineClicked) {
		modalT.style.display = 'none';
	} else {
		turbineClicked = false;
	}
}
map.on('click', onMapClick);

//Pie chart
function createPie(elem, data, r = 100) {
	let data_ = [];
	let clr = [];
	for (let i = 0; i < data.length; i++) {
		const d = data[i];
		data_.push({ name: d.donnee, value: d.value, customData: d.desc });
		clr.push([d.clr]);
	}

	document.querySelector('#c5').innerHTML = data[3].value;
	document.querySelector('#c4').innerHTML = data[2].value;
	document.querySelector('#tfin').innerHTML =
		data[0].value + data[1].value + data[2].value + data[3].value;

	return donut({
		el: elem,
		size: r,
		// weight: r / 2, //Weight ÷ 2 = pas de trou au milieu
		weight: r / 5,
		data: data_,
		colors: clr,
	});
}

function updatePie(pie, newValues) {
	let size = pie.style.height.replace('px', '');
	let div = pie.parentElement;
	pie.parentElement.removeChild(pie);
	return createPie(div, newValues, size);
}

//Compilation des données
let initialDataArray = [];
let initialPhotoArray = [];
function compileData() {
	let data = [];

	let problemes = problemes_raw.split('\n');
	//i = 1 si la ligne de titre est gardée
	for (let i = 1; i < problemes.length; i++) {
		let p = problemes[i].split(';');

		if (p[0]) {
			let turbineName = p[1] + p[3].padStart(2, '0');
			let catNb = p[6].substring(0, 1); //Si les ++ sont gardés
			if (catNb == '-1') {
				catNb = '0';
			}

			data.push({
				id: turbineName,
				parc: p[1],
				nb: p[3].padStart(2, '0'),
				nbRaw: p[3],
				side: p[4],
				date: p[2],
				year: p[2].substring(0, 4),
				category: 'C' + catNb,
				desc: p[5],
				rapport: p[0],
				compare:
					5 -
					parseInt(catNb) +
					'-' +
					p[1] +
					'-' +
					p[2] +
					'-' +
					turbineName +
					'-' +
					p[4],
			});
		}
	}

	//Pattern de comparaison: (5-Cat)-PARC-DATE-TURBINE-SIDE
	data.sort(compare);
	initialDataArray = data;

	let data_photo = [];
	let photos = photos_raw.split('\n');
	//i = 1 si la ligne de titre est gardée
	for (let i = 1; i < photos.length; i++) {
		let p = photos[i].split(';');

		if (p[0]) {
			let parc = p[2].substring(4, 7);
			let double_parc_name = false;

			if (p[2].split(parc).length > 2) {
				double_parc_name = true;
			}

			data_photo.push({
				rapport: p[0],
				date: p[1],
				file: p[2],
				double_name: double_parc_name,
			});
		}
	}

	initialPhotoArray = data_photo;

	for (let i = 0; i < data.length; i++) {
		const d = data[i];

		// if (d.id == 'CAR09') {
		// 	openModal(modalT, d.id);
		// }

		if (d.category == 'C4' || d.category == 'C5') {
			let li = document.createElement('li');
			li.innerHTML = d.id + ': ' + d.desc;
			li.addEventListener('click', function () {
				toTurbine(d.id);
			});
			document
				.querySelector('#' + d.parc + d.year + d.category)
				.appendChild(li);
		}
	}

	return data;
}

const initialData = compileData();

//Initial pie chart
function countCats(year = null, parc = null) {
	let catCount = {
		C0: 0,
		C1: 0,
		C2: 0,
		C3: 0,
		C4: 0,
		C5: 0,
	};

	for (let i = 0; i < initialData.length; i++) {
		const d = initialData[i];
		let count = true;

		if (year && d.year != year) {
			count = false;
		}

		if (parc && d.parc != parc) {
			count = false;
		}

		if (count) {
			catCount[d.category]++;
		}
	}

	return [
		{ donnee: 'C0', clr: 'aqua', value: catCount['C0'] },
		{ donnee: 'C1', clr: 'limegreen', value: catCount['C1'] },
		{ donnee: 'C2', clr: 'green', value: catCount['C2'] },
		{ donnee: 'C3', clr: 'lime', value: catCount['C3'] },
		{ donnee: 'C4', clr: 'yellow', value: catCount['C4'] },
		{ donnee: 'C5', clr: 'red', value: catCount['C5'] },
	];
}

let globalPie = createPie(document.querySelector('#pie'), countCats(), 200);

//Manipulation des pie charts & déplacements
function reset() {
	flyTo(0);
	document.querySelector('#label').innerHTML = 'Vue globale';
	globalPie = updatePie(globalPie, countCats());
}

function toYear(year) {
	flyTo(0);
	document.querySelector('#label').innerHTML = 'Campagne inspection ' + year;
	globalPie = updatePie(globalPie, countCats(year));
}

function toParc(parc, year = null) {
	flyTo(parc);
	document.querySelector('#label').innerHTML = 'Parc ' + parc;
	if (year) {
		document.querySelector('#label').innerHTML += ' ' + year;
	}
	globalPie = updatePie(globalPie, countCats(year, parc));
}

function toTurbine(turbine) {
	let coords = turbinesCoords.find((element) => element.id === turbine);
	map.flyTo([coords.x, coords.y], 17);
	openModal(modalT, coords.id);
}

//Données
parc(47.919977, -69.220581, 'VIG');
parc(48.697947, -67.866519, 'BDS');
parc(48.204712, -66.135434, 'CAR');
parc(48.3128, -66.7297, 'MUU');
parc(49.097906, -64.641406, 'AAV');
parc(49.180976, -65.46173, 'GMO');
parc(49.177678, -64.941747, 'MSE');
