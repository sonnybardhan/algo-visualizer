const goBtn = document.querySelector('#goBtn');
const sizeInput = document.querySelector('#sizeInput');
const slider = document.querySelector('#slider');
const choice = document.querySelector('#choice');
const sliderValueSpan = document.querySelector('#sliderValue');
const containerDiv = document.querySelector('.container');
const searchInput = document.querySelector('#search');
const genRandDataSetBtn = document.querySelector('#generateRandomDataSet');
const resetBtn = document.querySelector('#resetBtn');
const sliderDiv = document.querySelector('#sliderDiv');
const searchDiv = document.querySelector('#searchDiv');

document.addEventListener('keydown', (e) => {
	if (e.keyCode === 13) {
		execute();
	} else if (e.keyCode === 27) {
		fullReset();
	}
});

let setSize = 25;
let arr = [];
let algo = '';
let numToSearch = parseInt(searchInput.value);

sliderDiv.style.display = 'none';
searchDiv.style.display = 'none';

resetBtn.addEventListener('click', fullReset);

choice.addEventListener('change', (e) => {
	let temp = choice.value;
	fullReset();
	choice.value = temp;
	slider.value = setSize;
	sliderValueSpan.innerText = setSize;
	algo = e.target.value;
	if (algo) {
		sliderDiv.style.display = 'block';
	}
	if (algo === 'selection' || algo === 'bubble') {
		searchDiv.style.display = 'none';
	} else {
		searchDiv.style.display = 'block';
	}
	generateArrayAndBars();
});

goBtn.addEventListener('click', () => {
	execute();
});

function generateArrayAndBars() {
	generateArray();
	if (algo === 'binary') {
		arr.sort((a, b) => {
			if (a > b) return 1;
			if (a < b) return -1;
		});
	}
	generateBars();
}

function execute() {
	// let numToSearch = parseInt(searchInput.value);
	switch (algo) {
		case 'linear':
			searchPreCheck(linear, numToSearch);
			break;
		case 'binary':
			searchPreCheck(binary, numToSearch);
			break;
		case 'bubble':
			bubbleSort();
			break;
		case 'selection':
			selectionSort();
			break;
		default:
			alert('Choose an algorithm!');
			break;
	}
}

function searchPreCheck(fn) {
	if (numToSearch) {
		console.log('Searching for: ', numToSearch);
		fn(numToSearch);
	} else {
		alert('please enter a valid input');
	}
	return;
}

slider.addEventListener('change', (e) => {
	arr = [];
	numToSearch = '';
	setSize = parseInt(e.target.value);
	sliderValueSpan.textContent = e.target.value;
	clearContainerDiv();
	generateArrayAndBars();
});

function fullReset() {
	reset();
	sliderDiv.style.display = 'none';
	choice.value = 'default';
}

function reset() {
	arr = [];
	numToSearch = '';
	searchDiv.style.display = 'none';
	clearContainerDiv();
	searchInput.value = '';
	sliderValueSpan.textContent = 25;
	slider.value = 25;
	goBtn.disabled = false;
	slider.disabled = false;
	choice.disabled = false;
	algo = '';
}

function generateBars() {
	const containerHeight = containerDiv.clientHeight - 20;

	if (algo === 'selection' || algo === 'bubble') {
		for (let num of arr) {
			let newDiv = document.createElement('div');
			newDiv.textContent = num;
			containerDiv.style.alignItems = 'flex-end';
			let barHeight = Math.floor(containerHeight * (num / 100));
			barHeight += 'px';
			newDiv.classList.add('barColor');
			newDiv.style.height = barHeight;
			containerDiv.append(newDiv);
		}
	} else {
		for (let num of arr) {
			let newDiv = document.createElement('div');
			newDiv.textContent = num;
			//adding click handlers
			if (algo === 'linear' || algo === 'binary') {
				newDiv.addEventListener('click', function(e) {
					// console.log(e.target.innerText);
					numToSearch = parseInt(e.target.innerText);
					search.value = parseInt(e.target.innerText);
				});
			}
			containerDiv.style.alignItems = 'center';
			newDiv.classList.add('barColor');
			containerDiv.append(newDiv);
		}
	}
}

function generateArray() {
	for (let i = 0; i < setSize; i++) {
		let num = Math.floor(Math.random() * 96) + 5; //Math.random() * (max-min+1) +min
		arr.push(num);
	}
}

function clearContainerDiv() {
	containerDiv.innerHTML = '';
}

// ==========================
// linear search
// ==========================
async function linear(el) {
	goBtn.disabled = true;
	slider.disabled = true;
	searchInput.disabled = true;
	let divNum;
	let found = false;
	colorBars('white', 0);
	for (let child of containerDiv.children) {
		divNum = parseInt(child.innerText);
		if (divNum === el) {
			await wait(100);
			child.style.background = 'tomato';
			found = true;
			break;
		} else {
			await wait(100);
			child.style.background = 'lightseagreen';
		}
	}
	goBtn.disabled = false;
	searchInput.disabled = false;
	slider.disabled = false;
	if (!found) alert('Not found!');
}
//==========================
//binary search
//==========================
async function binary(el) {
	goBtn.disabled = true;
	slider.disabled = true;
	searchInput.disabled = true;
	let start = 0;
	let end = containerDiv.children.length - 1;
	let found = false;
	await colorBars('white', 0);
	while (start <= end) {
		let mid = Math.floor((start + end) / 2);
		let divNum = parseInt(containerDiv.children[mid].innerText);
		await colorBars('white', 0);
		await colorBars('lightseagreen', 80, start, end + 1);
		if (divNum === el) {
			await colorBars('white', 0);
			containerDiv.children[mid].style.background = 'tomato';
			found = true;
			break;
		} else if (divNum < el) {
			start = mid + 1;
			await colorBars('white', 0);
		} else {
			end = mid - 1;
			await colorBars('white', 0);
		}
	}
	goBtn.disabled = false;
	searchInput.disabled = false;
	slider.disabled = false;
	if (!found) {
		containerDiv.children[containerDiv.children.length - 1].style.backgroundColor = '';
		await wait(40);
		alert('Not found!');
	}
	return null;
}

// ==========================
// selectionSort
// ==========================
async function selectionSort() {
	goBtn.disabled = true;
	slider.disabled = true;
	choice.disabled = true;
	for (let i = 0; i < containerDiv.children.length - 1; i++) {
		let min = parseInt(containerDiv.children[i].innerText);
		await wait();
		containerDiv.children[i].style.backgroundColor = 'lightseagreen';
		for (let j = i + 1; j < containerDiv.children.length; j++) {
			await wait(40);
			containerDiv.children[j].style.backgroundColor = 'lightseagreen';
			if (arr[j] < arr[i]) {
				swapper(i, j);
			}
			await wait(40);
			containerDiv.children[j].style.backgroundColor = '';
		}
		containerDiv.children[i].style.backgroundColor = 'tomato';
	}
	containerDiv.children[containerDiv.children.length - 1].style.backgroundColor = 'tomato';
	colorBars('hotpink', 40);
	goBtn.disabled = false;
	slider.disabled = false;
	choice.disabled = false;
	return;
}

function swapper(prev, next) {
	let prevHeight = containerDiv.children[prev].style.height;
	let prevText = containerDiv.children[prev].innerText;
	let nextHeight = containerDiv.children[next].style.height;
	let nextText = containerDiv.children[next].innerText;

	[ arr[prev], arr[next] ] = [ arr[next], arr[prev] ]; //swap

	containerDiv.children[prev].style.height = nextHeight;
	containerDiv.children[prev].innerText = nextText;
	containerDiv.children[next].style.height = prevHeight;
	containerDiv.children[next].innerText = prevText;
}
//==========================
//bubble sort
//==========================
async function bubbleSort() {
	goBtn.disabled = true;
	slider.disabled = true;
	choice.disabled = true;
	let swapped;
	do {
		swapped = false;
		for (let i = 0; i < arr.length - 1; i++) {
			await wait(40);
			containerDiv.children[i].style.backgroundColor = 'lightseagreen';
			containerDiv.children[i + 1].style.backgroundColor = 'lightseagreen';
			if (arr[i] > arr[i + 1]) {
				await wait(40);
				swapper(i, i + 1);
				swapped = true;
			}
			containerDiv.children[i].style.backgroundColor = '';
			containerDiv.children[i + 1].style.backgroundColor = '';
		}
	} while (swapped);
	colorBars('hotpink', 40);
	goBtn.disabled = false;
	slider.disabled = false;
	choice.disabled = false;
	return;
}

async function colorBars(color = 'lightblue', t = 40, start = 0, end = containerDiv.children.length) {
	let bar = containerDiv.children;
	for (let i = start; i < end; i++) {
		await wait(t);
		bar[i].style.backgroundColor = color;
	}
}
function colorBorders() {
	let bar = containerDiv.children;
	for (let i = 0; i < bar.length; i++) {
		bar[i].style.border = '';
	}
}
//timeout---------------------------------------------------------------------------//
function wait(t = 400) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, t);
	});
}
