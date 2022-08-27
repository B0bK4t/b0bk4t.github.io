// let inputs = document.querySelectorAll(".input");

// for (let i = 0; i < inputs.length; i++) {
// 	const c = inputs[i];
// 	c.addEventListener("keyup", test);
// }

// function test() {
// 	if (this.value != "") {
// 		console.log(this.value);
// 	}
// }

update(chars, "left", "oshino_shinobu");

function update(type, dir, entity) {
	let e = chars[type.findIndex((item) => item.id === entity)];

	updatefield(dir, "en", e.name);
	updatefield(dir, "jp", e.jp);
	alt_names(dir, e);
	updateimg(dir, e.img);

	if (type == chars || type == staff) {
		//TODO birthday
		updatefield(dir, "bday", e.bday);

		updatelink(dir, "mal_", e.mal.id);
		updatefield(dir, "mal_favs", e.mal.favs);
		updatefield(dir, "mal_ranking", e.mal.rank);

		updatelink(dir, "alist_", e.alist.id);
		updatefield(dir, "alist_likes", e.alist.likes);

		updatelink(dir, "adb_", e.adb.id);
		updatefield(dir, "adb_rating", e.adb.rating);
		updatefield(dir, "adb_rating_votes", e.adb.votes);

		updatelink(dir, "aplan_", e.aplan.url);
		updatefield(dir, "aplan_likes", e.aplan.likes);

		updatelink(dir, "acdb_", e.acdb.id);

		updatelink(dir, "asrch_", e.asrch.id);
		updatefield(dir, "asrch_favs", e.asrch.favs);

		updatelink(dir, "vndb_", e.vndb);

		updatelink(dir, "booru_", e.booru.tag);
		updatefield(dir, "booru_tag", e.booru.tag);
		updatefield(dir, "booru_res", e.booru.res);

		updatelink(dir, "pixiv_", e.pixiv.tag);
		updatefield(dir, "pixiv_tag", e.pixiv.tag);
		updatefield(dir, "pixiv_res", e.pixiv.res);

		updatefield(dir, "mudae_name", e.mudae.name);
		updatefield(dir, "mudae_k", e.mudae.k);
		updatefield(dir, "mudae_claim", e.mudae.claim);
		updatefield(dir, "mudae_like", e.mudae.like);
	}

	if (type == chars) {
		updatefield(dir, "adb_waifu", e.adb.waifu);
		updatefield(dir, "adb_waifu_char_name", e.name);
		updatefield(dir, "adb_trash", e.adb.trash);

		updatefield(dir, "aplan_likes_rank", e.aplan.lrank);
		updatefield(dir, "aplan_dlikes", e.aplan.dlike);
		updatefield(dir, "aplan_dlikes_rank", e.aplan.dlrank);

		updatelink(dir, "waifu_", e.waifu.url);
		updatefield(dir, "waifu_pop", e.waifu.popularity);
		updatefield(dir, "waifu_likes", e.waifu.likes);
		updatefield(dir, "waifu_likes_rank", e.waifu.lrank);
		updatefield(dir, "waifu_trash", e.waifu.trash);
		updatefield(dir, "waifu_trash_rank", e.waifu.trank);

		updatefield(dir, "acdb_favs", e.acdb.favs);
		updatefield(dir, "acdb_up", e.acdb.up);
		updatefield(dir, "acdb_down", e.acdb.down);
		updatefield(dir, "acdb_love", e.acdb.love);
		updatefield(dir, "acdb_hate", e.acdb.hate);

		updatefield(dir, "asrch_favs_rank", e.asrch.rank);
	}
}

function updatefield(dir, id, value) {
	let box = document.querySelector("#" + dir + "_" + id);
	box.innerHTML = value;
}

function updateimg(dir, value) {
	let img = document.querySelector("#" + dir + "_main_img");
	img.src = value;
}

function updatelink(dir, id, value) {
	let a;
	a = document.querySelector("#" + dir + "_" + id);

	if (a == undefined) {
		a = document.querySelector("#" + dir + "_" + id + "_");
	}

	a.href += value;
}

function alt_names(dir, entity) {
	let box = document.querySelector("#" + dir + "_alt_names");
	box.innerHTML = "";
	let names = entity.alt_names.split("|");
	names.sort();
	for (let i = 0; i < names.length; i++) {
		const n = names[i];
		let div = document.createElement("div");
		div.innerHTML = n;
		box.appendChild(div);
	}
}
