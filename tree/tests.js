//https://balkan.app/FamilyTreeJS/Docs/GettingStarted

document.querySelector("#jp-link").href =
	window.location.href.split("?mode=")[0];

let mode = window.location.href.split("?mode=")[1];

let modeDOM = document.querySelector("#mode");

let ageDiffs = [];
let showAgeDiffs = true;

for (let i = 0; i < people.length; i++) {
	const p = people[i];

	switch (mode) {
		case "en":
			p.name = p.gname + " " + p.fname;
			modeDOM.innerHTML = "Western names";
			break;
		case "coma":
			p.name = p.fname + ", " + p.gname;
			break;
		default:
			p.name = p.fname + " " + p.gname;
			break;
	}

	//Partners
	if (p.partners != undefined) {
		p.pids = p.partners.split("|");
	}

	if (p.sep != undefined) {
		p.divorced = p.sep.split("|");
	}

	//Image
	if (platform == "local") {
		if (p.localImg == "") {
			p.img = "placeholder.png";
		} else {
			p.img = localURL + p.localImg + ".png";
		}
	} else if (platform == "online") {
		if (p.onlineImg == "") {
			p.img = "placeholder.png";
		} else {
			p.img = p.onlineImg;
		}
	}

	//Age
	let bday = parseInt(p.bday);
	let hasbday = !isNaN(bday);
	let bmonth = parseInt(p.bmonth);
	let hasbmonth = !isNaN(bmonth);
	let byear = parseInt(p.byear);
	let hasbyear = !isNaN(byear);
	let dday = parseInt(p.dday);
	let hasdday = !isNaN(dday);
	let dmonth = parseInt(p.dmonth);
	let hasdmonth = !isNaN(dmonth);
	let dyear = parseInt(p.dyear);
	let hasdyear = !isNaN(dyear);

	let baseDate = 2020;
	let todayIRL = new Date();
	let today = new Date(
		`${todayIRL.getMonth() + 1}/${todayIRL.getDate()}/${baseDate}`
	);

	//For year calculating
	today = new Date("12/31/2020");
	//

	document.querySelector("#date").innerHTML = `${today.getDate()} ${monthName(
		today.getMonth() + 1
	)} ${today.getFullYear()}`;

	let bdate = "";
	let ddate = "";

	if (hasbday && hasbmonth && hasbyear) {
		bdate = `${bday} ${monthName(bmonth)} ${byear}`;
	}
	if (hasbday && hasbmonth && !hasbyear) {
		bdate = `${bday} ${monthName(bmonth)} xxxx`;
	}
	if (!hasbday && hasbmonth && hasbyear) {
		bdate = `${monthName(bmonth)} ${byear}`;
	}
	if (!hasbday && !hasbmonth && hasbyear) {
		bdate = `${byear}`;
	}

	if (hasdday && hasdmonth && hasdyear) {
		ddate = `${dday} ${monthName(dmonth)} ${dyear}`;
	}
	if (hasdday && hasdmonth && !hasdyear) {
		ddate = `${dday} ${monthName(dmonth)} xxxx`;
	}
	if (!hasdday && hasdmonth && hasdyear) {
		ddate = `${monthName(dmonth)} ${dyear}`;
	}
	if (!hasdday && !hasdmonth && hasdyear) {
		ddate = `${dyear}`;
	}

	let lifespan = "";

	if (hasbyear && hasdyear) {
		let dayvalues = [hasbday, hasbmonth, hasdday, hasdmonth];
		let values = "";
		for (let i = 0; i < dayvalues.length; i++) {
			const d = dayvalues[i];
			if (d) {
				values += "t/";
			} else {
				values += "f/";
			}
		}
		values = values.substring(0, values.length - 1);

		switch (values) {
			// bday/bmonth/dday/dmonth
			case "t/t/t/t":
				lifespan =
					"†" +
					calcAge(
						`${addZero(bmonth)}/${addZero(bday)}/${byear}`,
						`${addZero(dmonth)}/${addZero(dday)}/${dyear}`
					) +
					"";
				break;
			case "f/t/f/t":
				lifespan = calcAge(
					`${addZero(bmonth)}/01/${byear}`,
					`${addZero(dmonth)}/01/${dyear}`
				);
				if (bmonth == dmonth) {
					lifespan = `†${lifespan - 1}~${lifespan}`;
				} else {
					lifespan = `${lifespan}`;
				}
				break;
			default:
				lifespan = calcAge(`01/01/${byear}`, `01/01/${dyear}`);
				lifespan = `†${lifespan - 1}~${lifespan}`;
				break;
		}
	} else if (hasbyear && !hasdday && !hasdmonth) {
		if (hasbday && hasbmonth) {
			lifespan =
				calcAge(
					`${addZero(bmonth)}/${addZero(bday)}/${byear}`,
					`${addZero(today.getMonth() + 1)}/${addZero(
						today.getDate()
					)}/${today.getFullYear()}`
				) + "";
		} else if (hasbmonth) {
			lifespan = calcAge(
				`${addZero(bmonth)}/01/${byear}`,
				`${addZero(today.getMonth() + 1)}/${addZero(
					today.getDate()
				)}/${today.getFullYear()}`
			);
			if (bmonth == today.getMonth() + 1) {
				lifespan = `${lifespan - 1}~${lifespan}`;
			} else {
				lifespan = `${lifespan}`;
			}
		} else {
			lifespan = calcAge(
				`01/01/${byear}`,
				`${addZero(today.getMonth() + 1)}/${addZero(
					today.getDate()
				)}/${today.getFullYear()}`
			);
			lifespan = `${lifespan - 1}~${lifespan}`;
		}
	}
	if (bdate && ddate) {
		p.age = `${bdate} - ${ddate}`;
	} else if (bdate) {
		p.age = `${bdate}`;
	} else if (ddate) {
		p.age = `†${ddate}`;
	}

	if (lifespan) {
		p.age += ` (${lifespan})`;
	}

	//Check for others
	if (people.findIndex((item) => item.id === p.mid) == -1) {
		p.mid = "";
	} else {
		let mother = people[people.findIndex((item) => item.id === p.mid)];
		if (!isNaN(parseInt(mother.byear)) && hasbyear) {
			let mname;
			switch (mode) {
				case "en":
					mname = mother.gname + " " + mother.fname;
					break;
				case "coma":
					mname = mother.fname + ", " + mother.gname;
					break;
				default:
					mname = mother.fname + " " + mother.gname;
					break;
			}

			let diffStr = `${mname} had ${p.name} at ~${
				p.byear - mother.byear
			} years old`;
			ageDiffs.push(diffStr);
		}
	}
	if (people.findIndex((item) => item.id === p.fid) == -1) {
		p.fid = "";
	} else {
		let father = people[people.findIndex((item) => item.id === p.fid)];
		if (!isNaN(parseInt(father.byear)) && hasbyear) {
			let fhname;
			switch (mode) {
				case "en":
					fhname = father.gname + " " + father.fname;
					break;
				case "coma":
					fhname = father.fname + ", " + father.gname;
					break;
				default:
					fhname = father.fname + " " + father.gname;
					break;
			}

			let diffStr = `${fhname} had ${p.name} at ~${
				p.byear - father.byear
			} years old`;
			ageDiffs.push(diffStr);
		}
	}
}

var family = new FamilyTree(document.getElementById("tree"), {
	template: "john",
	scaleInitial: 1,
	nodeContextMenu: false,
	mode: "dark",
	nodeBinding: {
		field_0: "name",
		field_1: "age",
		img_0: "img",
	},
	nodes: people,
	levelSeparation: 80,
	padding: 50,
	partnerSeparation: 110,
});

family.on("render-link", function (sender, args) {
	var cnodeData = family.get(args.cnode.id);
	var nodeData = family.get(args.node.id);

	if (
		cnodeData.divorced != undefined &&
		nodeData.divorced != undefined &&
		cnodeData.divorced.includes(args.node.id) &&
		nodeData.divorced.includes(args.cnode.id)
	) {
		args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
	}
});

if (ageDiffs.length > 0 && showAgeDiffs) {
	console.log("==========Age differences between parents and kids==========");
	for (let i = 0; i < ageDiffs.length; i++) {
		const e = ageDiffs[i];
		console.log(e);
	}
	console.log("============================================================");
}
