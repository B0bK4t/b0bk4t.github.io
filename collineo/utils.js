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
