function cache_set(key, value, force) {
	if (key === undefined) {
		console.error("Vous n'avez pas fourni de clé pour le localStorage");
	} else if (value === undefined) {
		console.error("Vous n'avez pas fourni de valeur pour le localStorage");
	} else if (isLocalStorageAvailable()) {
		if (!cache_get(key) || force === true) {
			key = `BPKMN_${key}`;
			localStorage.setItem(key, value);
		} else {
			console.error(
				"La clé que vous fourni est déjà utilisée. Forcer au besoin."
			);
		}
	}
}

function cache_get(key, defaultValue) {
	if (key === undefined) {
		console.error("Vous n'avez pas fourni de clé pour le localStorage");
	} else if (isLocalStorageAvailable()) {
		key = `BPKMN_${key}`;
		return localStorage.getItem(key) ? localStorage.getItem(key) : defaultValue;
	}
}

function cache_remove(key) {
	if (key === undefined) {
		console.error("Vous n'avez pas fourni de clé pour le localStorage");
	} else if (isLocalStorageAvailable()) {
		key = `BPKMN_${key}`;
		localStorage.removeItem(key);
	}
}

function isLocalStorageAvailable() {
	const test = "__timTools__";

	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch (error) {
		console.error("LocalStorage n'est pas disponible sur votre navigateur");
	}
}

function removeFromArray(array, value) {
	array.splice(array.indexOf(value), 1);
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
