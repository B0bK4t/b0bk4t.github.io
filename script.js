let header = document.querySelector("thead").querySelector("tr");

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

function add(query) {
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
		append(pokemon);
	}
}

function append(pokemon) {
	let p = pokemon;
	let element = document.createElement("th");
	let t1 = p.type1;
	let t2;
	if ((t2 = p.type2)) {
	} else {
		t2 = t1;
	}
	element.innerHTML = `
    <h3>${p.name}</h3>
    <img
        src="https://play.pokemonshowdown.com/sprites/ani/${p.id}.gif"
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
				break;
			case 0.25:
				className = "quarter";
				break;
			case 0.5:
				className = "half";
				break;
			case 2:
				className = "double";
				break;
			case 4:
				className = "quadruple";
				break;
			default:
				className = "";
				break;
		}

		let row = document.querySelector(`[data-${c}]`);
		let cols = row.querySelectorAll("th");
		let col = cols[cols.length - 1];
		let colID = parseInt(col.id.split("-")[1]);

		let displayBox = document.createElement("th");
		displayBox.innerHTML = `<h3>x${display}</h3>`;
		displayBox.id = `${c}-${colID + 1}`;
		displayBox.classList = className;
		element.id = `header-${colID + 1}`;
		row.appendChild(displayBox);
		rows.push(displayBox);
		index = colID + 1;
	}

	element.innerHTML += `<button class='delete' onclick="remove('${index}')">X</button>`;
}

function remove(index) {
	let header = document.querySelector("#header-" + index);
	header.parentElement.removeChild(header);
	for (let i = 0; i < types.length; i++) {
		let c = types[i];
		let row = document.querySelector(`#${c}-${index}`);
		row.parentElement.removeChild(row);
	}
}

function format(text) {
	if (text != null) {
		text = text.toLowerCase();
		text = text.replaceAll("à", "a");
		text = text.replaceAll("á", "a");
		text = text.replaceAll("â", "a");
		text = text.replaceAll("ä", "a");
		text = text.replaceAll("ā", "a");
		text = text.replaceAll("β", "b");
		text = text.replaceAll("ç", "c");
		text = text.replaceAll("ć", "c");
		text = text.replaceAll("è", "e");
		text = text.replaceAll("é", "e");
		text = text.replaceAll("ê", "e");
		text = text.replaceAll("ë", "e");
		text = text.replaceAll("ē", "e");
		text = text.replaceAll("ę", "e");
		text = text.replaceAll("ì", "i");
		text = text.replaceAll("í", "i");
		text = text.replaceAll("î", "i");
		text = text.replaceAll("ï", "i");
		text = text.replaceAll("ī", "i");
		text = text.replaceAll("ñ", "n");
		text = text.replaceAll("ò", "o");
		text = text.replaceAll("ó", "o");
		text = text.replaceAll("ô", "o");
		text = text.replaceAll("ö", "o");
		text = text.replaceAll("ō", "o");
		text = text.replaceAll("ø", "o");
		text = text.replaceAll("œ", "oe");
		text = text.replaceAll("ß", "ss");
		text = text.replaceAll("ù", "u");
		text = text.replaceAll("ú", "u");
		text = text.replaceAll("û", "u");
		text = text.replaceAll("ü", "u");
		text = text.replaceAll("ū", "u");
		text = text.replaceAll("ỳ", "y");
		text = text.replaceAll("ý", "y");
		text = text.replaceAll("ŷ", "y");
		text = text.replaceAll("ÿ", "y");
		text = text.replaceAll("ȳ", "y");
		text = text.replaceAll("Ψ", "y");
		text = text.replaceAll("²", "2");
		text = text.replaceAll("∞", "");
		text = text.replaceAll("♡", "");
		text = text.replaceAll("♥", "");
		text = text.replaceAll("☆", "");
		text = text.replaceAll("★", "");
		text = text.replaceAll("'", "");
		text = text.replaceAll(")", "");
		text = text.replaceAll("(", "");
		text = text.replaceAll(":", "");
		text = text.replaceAll(";", "");
		text = text.replaceAll('"', "");
		text = text.replaceAll("~", "");
		text = text.replaceAll("?", "");
		text = text.replaceAll("!", "");
		text = text.replaceAll("！", "");
		text = text.replaceAll("？", "");
		text = text.replaceAll("&", "");
		text = text.replaceAll("[", "");
		text = text.replaceAll("]", "");
		text = text.replaceAll("{", "");
		text = text.replaceAll("}", "");
		text = text.replaceAll(".", "");
		text = text.replaceAll("…", "");
		text = text.replaceAll("-", "");
		text = text.replaceAll("–", "");
		text = text.replaceAll("─", "");
		text = text.replaceAll("—", "");
		text = text.replaceAll("_", "");
		text = text.replaceAll(",", "");
		text = text.replaceAll("・", "");
		text = text.replaceAll("#", "");
		text = text.replaceAll("♯", "");
		text = text.replaceAll("♭", "");
		text = text.replaceAll("$", "");
		text = text.replaceAll("£", "");
		text = text.replaceAll("¢", "");
		text = text.replaceAll("/", "");
		text = text.replaceAll("\\", "");
		text = text.replaceAll("↑", "");
		text = text.replaceAll("→", "");
		text = text.replaceAll("⬱", "");
		text = text.replaceAll("♪", "");
		text = text.replaceAll("♫", "");
		text = text.replaceAll("º", "");
		text = text.replaceAll("*", "");
		text = text.replaceAll("+", "");
		text = text.replaceAll("±", "");
		text = text.replaceAll("^", "");
		text = text.replaceAll("《", "");
		text = text.replaceAll("》", "");
		text = text.replaceAll("<", "");
		text = text.replaceAll(">", "");
		text = text.replaceAll(">", "");
		text = text.replaceAll(" ", "");
		return text;
	}
}
