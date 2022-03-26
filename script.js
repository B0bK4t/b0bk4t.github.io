let header = document.querySelector("thead").querySelector("tr");
let imgindex = 0;
let weaks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let resists = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let inputed_mons = [];
let savedmons = cache_get("pokemon");
if (savedmons) {
	inputed_mons = savedmons.split(",");
}

init();

function init() {
	for (let i = 0; i < inputed_mons.length; i++) {
		const m = inputed_mons[i];
		let pkmn = m.split("|")[0];
		add(pkmn, true);
	}
}

let input = document.querySelector("#add_main");
input.addEventListener("keydown", function (e) {
	if (e.code === "Enter" && input.value != "") {
		add(input.value);
	}
});

function textarea_activate(id) {
	let ta = document.querySelector(id);
	if (ta.value != "") {
		let pkmns = ta.value.match(/(?:\()[^\(\)]*?(?:\))/g);
		for (let i = 0; i < pkmns.length; i++) {
			let name = pkmns[i].replace("(", "").replace(")", "");
			add(name);
		}
	}
}

function add(query, init) {
	query = format(query);
	let pokemon;
	if ((pokemon = data.find((element) => format(element.id) === query))) {
	} else if (
		(pokemon = data.find((element) => format(element.name) === query))
	) {
	} else if (
		(pokemon = data.find((element) => format(element.french) === query))
	) {
	}
	if (pokemon != undefined) {
		append(pokemon, init);
	}
}

function append(pokemon, init) {
	imgindex++;
	let p = pokemon;
	let element = document.createElement("th");
	let t1 = p.type1;
	let t2;
	if ((t2 = p.type2)) {
	} else {
		t2 = t1;
	}
	let random = Math.floor(Math.random() * 100 + 1);
	let directory = "";
	if (random > 6) {
		directory = "ani";
	} else {
		directory = "ani-shiny";
	}
	element.innerHTML = `
    <h3>${p.name}</h3>
    <img
		id="img-${imgindex}"
		onclick="shiny(${imgindex})"
        src="https://play.pokemonshowdown.com/sprites/${directory}/${p.id}.gif"
    />
    <div class="types">
        <span class="${t1.toLowerCase()}Type">${t1}</span>
        <span class="${t2.toLowerCase()}Type">${t2}</span>
    </div>`;
	header.appendChild(element);

	t1 = t1.toLowerCase();
	t2 = t2.toLowerCase();

	let index;

	let rows = [];
	for (let i = 0; i < types.length; i++) {
		const c = types[i];
		let tObj = typeChart[c];
		let multiplier = tObj[t1];
		multiplier = tObj[t1];
		if (multiplier == undefined) {
			multiplier = 1;
		}

		if (t2 != t1) {
			let multiplier2 = tObj[t2];
			multiplier2 = tObj[t2];
			if (multiplier2 == undefined) {
				multiplier2 = 1;
			}
			multiplier = multiplier * multiplier2;
		}

		let display = multiplier;
		let className;
		switch (display) {
			case 0:
				className = "immune";
				resists[i]++;
				break;
			case 0.25:
				className = "quarter";
				resists[i]++;
				break;
			case 0.5:
				className = "half";
				resists[i]++;
				break;
			case 2:
				className = "double";
				weaks[i]++;
				break;
			case 4:
				className = "quadruple";
				weaks[i]++;
				break;
			default:
				className = "";
				break;
		}

		let row = document.querySelector(`[data-${c}]`);
		let cols = row.querySelectorAll("th");
		let col = cols[cols.length - 1];
		let colID = col.id.split("-")[1];
		if (colID == "r") {
			colID = 0;
		} else {
			colID = parseInt(colID);
		}

		let displayBox = document.createElement("th");
		displayBox.innerHTML = `<h3>x${display}</h3>`;
		displayBox.id = `${c}-${colID + 1}`;
		displayBox.classList = className;
		displayBox.dataset.value = display;
		element.id = `header-${colID + 1}`;
		row.appendChild(displayBox);
		rows.push(displayBox);
		index = colID + 1;
	}

	element.innerHTML += `<button class='delete' onclick="remove('${index}')">X</button>`;
	element.dataset.id = `${p.id}|${index}`;
	element.classList.add("pokemon");
	updateWeakResist();
	if (!init) {
		inputed_mons.push(`${p.id}|${index}`);
		cache_set("pokemon", inputed_mons, true);
	}
}

function clear_all() {
	let pokemon = document.querySelectorAll(".pokemon");
	for (let i = 0; i < pokemon.length; i++) {
		const p = pokemon[i];
		remove(p.id.replace("header-", ""));
	}
}

function remove(index) {
	let header = document.querySelector("#header-" + index);
	header.parentElement.removeChild(header);
	for (let i = 0; i < types.length; i++) {
		let c = types[i];
		let row = document.querySelector(`#${c}-${index}`);
		let value = parseInt(row.dataset.value);
		switch (value) {
			case 0:
			case 0.25:
			case 0.5:
				resists[i]--;
				break;
			case 2:
			case 4:
				weaks[i]--;
				break;
			default:
				break;
		}
		row.parentElement.removeChild(row);
	}
	updateWeakResist();
	removeFromArray(inputed_mons, header.dataset.id);
	cache_remove("pokemon");
}

function shiny(i) {
	let img = document.querySelector("#img-" + i);
	let src = img.getAttribute("src");
	if (src.includes("/ani/")) {
		img.setAttribute("src", src.replace("/ani/", "/ani-shiny/"));
	} else {
		img.setAttribute("src", src.replace("/ani-shiny/", "/ani/"));
	}
}

function updateWeakResist() {
	for (let i = 0; i < types.length; i++) {
		const c = types[i];
		let weakBox = document.querySelector(`#${c}-w`);
		let resistBox = document.querySelector(`#${c}-r`);
		switch (weaks[i]) {
			case 0:
				weakBox.innerHTML = "";
				weakBox.classList.remove("one");
				weakBox.classList.remove("two");
				weakBox.classList.remove("three");
				break;
			case 1:
				weakBox.innerHTML = weaks[i];
				weakBox.classList.add("one");
				weakBox.classList.remove("two");
				weakBox.classList.remove("three");
				break;
			case 2:
				weakBox.innerHTML = weaks[i];
				weakBox.classList.remove("one");
				weakBox.classList.add("two");
				weakBox.classList.remove("three");
				break;
			default:
				weakBox.innerHTML = weaks[i];
				weakBox.classList.remove("one");
				weakBox.classList.remove("two");
				weakBox.classList.add("three");
				break;
		}

		switch (resists[i]) {
			case 0:
				resistBox.innerHTML = "";
				resistBox.classList.remove("one");
				resistBox.classList.remove("two");
				resistBox.classList.remove("three");
				break;
			case 1:
				resistBox.innerHTML = resists[i];
				resistBox.classList.add("one");
				resistBox.classList.remove("two");
				resistBox.classList.remove("three");
				break;
			case 2:
				resistBox.innerHTML = resists[i];
				resistBox.classList.remove("one");
				resistBox.classList.add("two");
				resistBox.classList.remove("three");
				break;
			default:
				resistBox.innerHTML = resists[i];
				resistBox.classList.remove("one");
				resistBox.classList.remove("two");
				resistBox.classList.add("three");
				break;
		}
	}
}
