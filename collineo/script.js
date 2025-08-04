//Utils
function compare(a, b) {
	const itemA = a.compare;
	const itemB = b.compare;

	let comparison = 0;
	if (itemA > itemB) {
		comparison = 1;
	} else if (itemA < itemB) {
		comparison = -1;
	}
	return comparison;
}

//https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n, table_id) {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.querySelector('#' + table_id);
	switching = true;
	// Set the sorting direction to ascending:
	dir = 'asc';
	/* Make a loop that will continue until
  no switching has been done: */
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
    first, which contains table headers): */
		for (i = 1; i < rows.length - 1; i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
      one from current row and one from the next: */
			x = rows[i].getElementsByTagName('TD')[n];
			y = rows[i + 1].getElementsByTagName('TD')[n];
			/* Check if the two rows should switch place,
      based on the direction, asc or desc: */
			if (dir == 'asc') {
				if (
					x.getAttribute('data-sort').toLowerCase() >
					y.getAttribute('data-sort').toLowerCase()
				) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == 'desc') {
				if (
					x.getAttribute('data-sort').toLowerCase() <
					y.getAttribute('data-sort').toLowerCase()
				) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
      and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == 'asc') {
				dir = 'desc';
				switching = true;
			}
		}
	}
}

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

//En utilisant https://leafletjs.com/ Github: https://github.com/Leaflet/Leaflet
//Documentation https://leafletjs.com/reference.html

var map = L.map('map').setView([views[0][0], views[0][1]], views[0][2]);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', //Doc pour l'API OSM: https://operations.osmfoundation.org/policies/tiles/
}).addTo(map);

//Setup opérateurs
let operateurs = {
	david: 'David',
	eloise: 'Éloïse',
	gabriel_a: 'Gabriel A.',
	gabriel_g: 'Gabriel G.',
	guillaume: 'Guillaume',
	marcantoine: 'Marc-Antoine',
	theo: 'Théo',
	isaac: 'Isaac',
};

//Setup info
function openTurbine(turbine) {
	let div = document.querySelector('#info');
	div.style.display = 'block';
	div.querySelector('#tID').innerHTML = turbine;

	div.querySelector('#close').addEventListener('click', function () {
		this.parentElement.parentElement.style.display = 'none';
	});

	let problemes = initialDataArray.filter(function (probleme) {
		return probleme.id == turbine;
	});

	let problemes_ = [];

	for (let i = 0; i < problemes.length; i++) {
		const p = problemes[i];

		let photos = initialPhotoArray.filter(function (photo) {
			return photo.rapport == p.rapport;
		});

		//Bonne turbine
		let p_turbines = photos.filter(function (photo) {
			return photo.file.includes(p.parc + '-' + p.nbRaw);
		});

		//Bonne pale
		let p_blades = p_turbines.filter(function (photo) {
			return photo.blade == p.side.substring(0, 1);
		});

		//Bon côté
		let side_parts = p.side.substring(1, p.side.length).split('-');
		let side = side_parts[side_parts.length - 1];
		let p_side = p_blades.filter(function (photo) {
			return photo.side.includes(side);
		});

		let imgs = '';

		for (let j = 0; j < p_side.length; j++) {
			const photo = p_side[j];
			// imgs += `<img src="data_/${photo.rapport}/img/${photo.file}">`;
			imgs += `<img src="data/${photo.rapport}/img/${photo.file}">`;
		}

		// let op_text = '';
		// for (let index = 0; index < array.length; index++) {
		// 	const element = array[index];
		// }

		let authorText = '';
		let authorImg = '';

		if (p.author[0] == '') {
			authorText = 'N/D';
		} else {
			for (let j = 0; j < p.author.length; j++) {
				const op = p.author[j];
				authorText += operateurs[op];
				if (j < p.author.length - 1) {
					authorText += ', ';
				}

				authorImg += `<img src="users/${op}.jpg" />`;
			}
		}

		if (p.year < 2025) {
			authorText = 'N/D';
			authorImg = '';
		}

		let div = document.createElement('div');
		div.innerHTML = `
			<h3>
				${p.date} (${p.side}) – ${p.desc} – détecté par ${authorText}
			</h3>
			<div class="photos_pfp">
				<div class="pfp">${authorImg}</div>
				<div class="photos">
					${imgs}
				</div>
			</div>
		`;
		div.classList.add('probleme');

		problemes_.push({
			compare: `${p.date}-${p.side}`,
			year: p.year,
			content: div,
		});
	}

	problemes_ = problemes_.sort(compare);
	problemes_ = problemes_.reverse();

	for (let i = 0; i < years.length; i++) {
		const y = years[i];
		document.querySelector('#p' + y).innerHTML = '';
	}

	for (let i = 0; i < problemes_.length; i++) {
		const p = problemes_[i];
		if (p.content) {
			document.querySelector('#p' + p.year).appendChild(p.content);
		} else {
			document.querySelector('#p' + p.year).innerHTML =
				'<h4>Aucun problème</h4>';
		}
	}
}

//Setup arborescence
let years = [2025, 2024, 2023];
let op_per_year = [operateurs, null, null];

function populateArborescence() {
	let html = '';
	for (let i = 0; i < years.length; i++) {
		const y = years[i];
		html += `<h2 onclick="toYear(${y})">${y}</h2>\n`;
		if (op_per_year[i]) {
			let ops = op_per_year[i];
			html += `<table id="table__${y}">`;
			html += `<tr>
				<th onclick="sortTable(0, 'table__${y}')">Opérateur</th>
				<th onclick="sortTable(1, 'table__${y}')">Bris majeurs</th>
				<th onclick="sortTable(2, 'table__${y}')">Blade killers</th>
				<th onclick="sortTable(3, 'table__${y}')">Mouches</th>
				<th onclick="sortTable(4, 'table__${y}')">Spécial</th>
			</tr>`;
			for ([key, value] of Object.entries(ops)) {
				html += `<tr id="${key}">
					<td data-sort="${key}"><b>${value}</b></td>
					<td data-sort="" id="${key}__c5"></td>
					<td data-sort="" id="${key}__c4"></td>
					<td data-sort="" id="${key}__m"></td>
					<td data-sort="" id="${key}__s"></td>
				</tr>`;
			}
			html += '</table>';
		}
		// 	let bkillers = `<h3>Blade killers</h3>\n`;
		// 	let bris = `<h3>Bris majeurs</h3>\n`;
		// 	for ([key, value] of Object.entries(parcs)) {
		// 		if (key != '0') {
		// 			let row = `<h4 onclick="toParc('${key}', ${y})">${key}</h4>\n`;
		// 			bkillers += row + `<ul id="${key}${y}C5"></ul>\n`;
		// 			bris += row + `<ul id="${key}${y}C4"></ul>\n`;
		// 		}
		// 	}
		// 	html += bkillers;
		// 	html += bris;
	}

	document.querySelector('.arborescence').innerHTML = html;
}
populateArborescence();

//Points sur la carte
function parc(x, y, desc) {
	let marker = L.marker([x, y]).addTo(map);
	marker.on('click', function () {
		toParc(desc);
		modalT.style.display = 'none';
	});
}

parc(47.919977, -69.220581, 'VIG');
parc(48.697947, -67.866519, 'BDS');
parc(48.204712, -66.135434, 'CAR');
parc(48.3128, -66.7297, 'MUU');
parc(49.097906, -64.641406, 'AAV');
parc(49.180976, -65.46173, 'GMO');
parc(49.177678, -64.941747, 'MSE');

let turbineClicked = false;
let turbineTotal = 0;
let turbinesCoords = [];
function turbine(x, y, id, clr, radius = 100) {
	turbineTotal++;

	// let clrs = ['red', 'yellow', 'blue', 'green'];
	// clr = clrs[Math.floor(Math.random() * 4)];
	clr = 'blue';

	let circle = L.circle([x, y], { radius: radius, color: clr }).addTo(map);
	turbinesCoords.push({ id: id, x: x, y: y, obj: circle });
	circle.on('click', function () {
		turbineClicked = true;
		toTurbine(id);
	});
}

//Ajouter turbines
for (let i = 0; i < turbines.length; i++) {
	const t = turbines[i];
	turbine(t.coords[0], t.coords[1], t.id, 'blue');
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

document.querySelector('#closeT').addEventListener('click', onMapClick);

//Pie chart
function createPie(elem, data, r = 100) {
	let data_ = [];
	let clr = [];
	for (let i = 0; i < data.length; i++) {
		const d = data[i];
		data_.push({ name: d.donnee, value: d.value, customData: d.desc });
		clr.push([d.clr]);
	}

	document.querySelector('#c5').innerHTML = data[5].value;
	document.querySelector('#c4').innerHTML = data[4].value;

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
			let catNb = p[6].substring(0, 1); //Si les 3++ sont gardés

			if (catNb == '-') {
				catNb = '0';
			}

			let operators = turbines.find((element) => element.id == turbineName).op;

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
				author: operators,
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

			data_photo.push({
				rapport: p[0],
				date: p[1],
				file: p[2],
				parc: p[3],
				turbine: p[4],
				blade: p[5],
				side: p[6],
			});
		}
	}

	initialPhotoArray = data_photo;

	// for (let i = 0; i < data.length; i++) {
	// 	const d = data[i];

	// 	if (d.category == 'C4' || d.category == 'C5') {
	// 		let li = document.createElement('li');
	// 		li.innerHTML = d.id + ': ' + d.desc;
	// 		li.addEventListener('click', function () {
	// 			toTurbine(d.id);
	// 		});
	// 		document
	// 			.querySelector('#' + d.parc + d.year + d.category)
	// 			.appendChild(li);
	// 	}
	// }

	for (let i = 0; i < years.length; i++) {
		let y = document.querySelector('#table__' + years[i]);

		if (op_per_year[i]) {
			let ops = op_per_year[i];
			for ([key, value] of Object.entries(ops)) {
				let problemes_trouves = data.filter(function (a) {
					return a.author.includes(key);
				});

				let p_cat_5 = problemes_trouves.filter(function (p) {
					return p.category == 'C5';
				});
				let p_cat_5_nb = p_cat_5.length;

				let p_cat_5_box = y.querySelector('#' + key + '__c5');
				p_cat_5_box.innerHTML = p_cat_5_nb;
				p_cat_5_box.setAttribute(
					'data-sort',
					p_cat_5_nb.toString().padStart(2, '0')
				);

				let p_cat_4 = problemes_trouves.filter(function (p) {
					return p.category == 'C4';
				});
				let p_cat_4_nb = p_cat_4.length;
				let p_cat_4_box = y.querySelector('#' + key + '__c4');
				p_cat_4_box.innerHTML = p_cat_4_nb;
				p_cat_4_box.setAttribute(
					'data-sort',
					p_cat_4_nb.toString().padStart(2, '0')
				);

				y.querySelector('#' + key + '__m').innerHTML = 0;
				y.querySelector('#' + key + '__s').innerHTML = 0;
			}
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

		// let obj = turbinesCoords.find((element) => element.id === d.id).obj;
		// let clr = 'aqua';
		// switch (d.category) {
		// 	case 'C1':
		// 		clr = 'turquoise';
		// 		break;
		// 	case 'C2':
		// 		clr = 'green';
		// 		break;
		// 	case 'C3':
		// 		clr = 'yellow';
		// 		break;
		// 	case 'C4':
		// 		clr = 'orange';
		// 		break;
		// 	case 'C5':
		// 		clr = 'red';
		// 		break;
		// }

		// obj.setStyle({ color: clr });
	}

	return [
		{ donnee: 'C0', clr: 'aqua', value: catCount['C0'] },
		{ donnee: 'C1', clr: 'lime', value: catCount['C1'] },
		{ donnee: 'C2', clr: 'green', value: catCount['C2'] },
		{ donnee: 'C3', clr: 'yellow', value: catCount['C3'] },
		{ donnee: 'C4', clr: 'orange', value: catCount['C4'] },
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
	openTurbine(coords.id);
}
