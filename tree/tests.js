//https://balkan.app/FamilyTreeJS/Docs/GettingStarted

for (let i = 0; i < people.length; i++) {
	const p = people[i];

	//Img
	p.pic = `../../sites/vas/images/${p.imgID}.png`;
	if (window.location.href.includes("https")) {
		if (p.imgLink != undefined && p.imgLink != "") {
			p.pic = p.imgLink;
		} else {
			p.pic = `https://www.delvinia.com/wp-content/uploads/2020/05/placeholder-headshot.png`;
		}
	}

	//Check for others
	if (people.findIndex((item) => item.id === p.pids[0]) == -1) {
		p.pids = "";
	}
	if (people.findIndex((item) => item.id === p.mid) == -1) {
		p.mid = "";
	}
	if (people.findIndex((item) => item.id === p.fid) == -1) {
		p.fid = "";
	}
}

var family = new FamilyTree(document.getElementById("tree"), {
	template: "john",
	nodeContextMenu: false,
	mode: "dark",
	nodeBinding: {
		field_0: "name",
		img_0: "pic",
	},
	nodes: people,
});
