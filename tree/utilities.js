function monthName(int) {
	let month = "";
	switch (parseInt(int)) {
		case 1:
			month = "January";
			break;
		case 2:
			month = "February";
			break;
		case 3:
			month = "March";
			break;
		case 4:
			month = "April";
			break;
		case 5:
			month = "May";
			break;
		case 6:
			month = "June";
			break;
		case 7:
			month = "July";
			break;
		case 8:
			month = "August";
			break;
		case 9:
			month = "September";
			break;
		case 10:
			month = "October";
			break;
		case 11:
			month = "November";
			break;
		case 12:
			month = "December";
			break;
	}

	return month;
}

function calcAge(birthDate, otherDate) {
	birthDate = new Date(birthDate);
	otherDate = new Date(otherDate);

	var years = otherDate.getFullYear() - birthDate.getFullYear();

	if (
		otherDate.getMonth() < birthDate.getMonth() ||
		(otherDate.getMonth() == birthDate.getMonth() &&
			otherDate.getDate() < birthDate.getDate())
	) {
		years--;
	}

	return years;
}

function addZero(int) {
	if (int.toString().length == 1) {
		return 0 + int.toString();
	} else {
		return int;
	}
}

let localURL = "../../vas/images/";

let platform = "online"; //online or local
