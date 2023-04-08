export const utilService = {
	makeId,
};

function makeId(length = 8) {
	let str = 'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let id = '';
	for (let i = 0; i < length; i++) {
		id += str.charAt(getRandIntInc(0, str.length - 1));
	}
	return id;
}

function getRandIntInc(min = 0, max: number) {
	return Math.trunc(Math.random() * (min + max + 1) + min);
}
