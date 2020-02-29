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

let setSize = 25;
let arr = [];
let algo = '';
let highlight = 'rgb(163, 228, 228)';
let numToSearch;

sliderDiv.style.display = 'none';
searchDiv.style.display = 'none';
resetBtn.addEventListener('click', fullReset);

searchInput.addEventListener('change', (e) => {
	numToSearch = parseInt(e.target.value);
	console.log('numToSearch', numToSearch);
});

document.addEventListener('keydown', (e) => {
	if (e.keyCode === 13) {
		execute();
	} else if (e.keyCode === 27) {
		fullReset();
	}
});
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
	generateArrayAndBars();
	if (algo === 'linear' || algo === 'binary') {
		generateNumToSearchVal();
		console.log(numToSearch);
	}
	if (algo === 'selection' || algo === 'bubble') {
		searchDiv.style.display = 'none';
	} else {
		searchInput.disabled = false;
		searchDiv.style.display = 'block';
	}
});

function generateNumToSearchVal() {
	let randomNum = Math.floor(Math.random() * arr.length + 1);
	searchInput.value = arr[randomNum];
	numToSearch = arr[randomNum];
}

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
	if (numToSearch !== '') {
		console.log('Searching for: ', numToSearch);
		fn(numToSearch);
	} else {
		alert('please enter a valid input');
	}
	return;
}

slider.addEventListener('change', (e) => {
	arr = [];
	search.value = '';
	numToSearch = '';
	setSize = parseInt(e.target.value);
	sliderValueSpan.textContent = e.target.value;
	clearContainerDiv();
	generateArrayAndBars();
	if (algo === 'linear' || algo === 'binary') {
		generateNumToSearchVal();
		console.log(numToSearch);
	}
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
			newDiv.classList.add('sortBarColor');
			newDiv.style.height = barHeight;
			containerDiv.append(newDiv);
		}
	} else {
		for (let num of arr) {
			let newDiv = document.createElement('div');
			newDiv.textContent = num;
			if (algo === 'linear' || algo === 'binary') {
				newDiv.addEventListener('click', function(e) {
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
async function linear() {
	inputDisable(true);
	let divNum;
	let found = false;
	colorBars('white', 0);
	colorBarText();
	for (let child of containerDiv.children) {
		divNum = parseInt(child.innerText);
		if (divNum === numToSearch) {
			await wait(100);
			child.style.background = highlight;
			child.style.color = '#2b2b2b';
			found = true;
			break;
		} else {
			await wait(100);
			child.style.background = '#2b2b2b';
			child.style.color = 'rgb(212, 212, 212)';
		}
	}
	inputDisable(false);
	if (!found) {
		containerDiv.children[containerDiv.children.length - 1].style.background = '#2b2b2b';
		containerDiv.children[containerDiv.children.length - 1].style.color = 'rgb(212, 212, 212)';
		await wait();
		alert('Not found!');
	}
}

function inputDisable(val) {
	choice.disabled = val;
	goBtn.disabled = val;
	searchInput.disabled = val;
	slider.disabled = val;
}
//==========================
//binary search
//==========================
async function binary() {
	console.log('searching for: ', numToSearch);
	inputDisable(true);
	let start = 0;
	let end = containerDiv.children.length - 1;
	await colorBars('', 0);
	colorBarText();
	colorBinaryBars(start, end);
	let found = false;
	await wait(500);

	while (start <= end) {
		let mid = Math.floor((start + end) / 2);
		let midDivNum = parseInt(containerDiv.children[mid].innerText);
		console.log('midDivNum: ', midDivNum);

		await colorBars('white', 0);
		colorBarText();

		if (start >= end && midDivNum !== numToSearch) {
			console.log('Entered this');
			console.log('found value: ', found);
			break;
		}

		if (midDivNum === numToSearch) {
			//found
			containerDiv.children[mid].style.background = highlight;
			containerDiv.children[mid].style.color = '#2b2b2b';
			found = true;
			break;
		} else if (midDivNum < numToSearch) {
			start = mid + 1;
			colorBinaryBars(start, end);
		} else {
			end = mid - 1;
			colorBinaryBars(start, end);
		}
		await wait(1000);
	}
	inputDisable(false);
	if (!found) {
		await colorBars('white', 0);
		colorBarText();
		await wait();
		alert('Not found!');
	}
	return;
}

function colorBinaryBars(s, e, bgCol = '#2b2b2b', fontCol = 'rgb(212, 212, 212)') {
	containerDiv.children[s].style.background = bgCol;
	containerDiv.children[s].style.color = fontCol;
	containerDiv.children[e].style.background = bgCol;
	containerDiv.children[e].style.color = fontCol;
}

// ==========================
// selectionSort
// ==========================
async function selectionSort() {
	inputDisable(true);
	for (let i = 0; i < containerDiv.children.length - 1; i++) {
		// let min = parseInt(containerDiv.children[i].innerText);
		containerDiv.children[i].style.backgroundColor = 'rgb(212, 212, 212)';
		containerDiv.children[i].style.color = '#2b2b2b';
		await wait(40);
		for (let j = i + 1; j < containerDiv.children.length; j++) {
			containerDiv.children[j].style.backgroundColor = 'rgb(212, 212, 212)';
			containerDiv.children[j].style.color = '#2b2b2b';
			await wait(40);
			if (arr[j] < arr[i]) {
				swapper(i, j);
			}
			containerDiv.children[j].style.backgroundColor = '';
			containerDiv.children[j].style.color = 'rgb(212, 212, 212)';
			await wait(40);
		}
		containerDiv.children[i].style.backgroundColor = highlight;
		containerDiv.children[i].style.color = '#2b2b2b';
	}
	containerDiv.children[containerDiv.children.length - 1].style.backgroundColor = highlight;
	containerDiv.children[containerDiv.children.length - 1].style.color = '#2b2b2b';
	inputDisable(false);
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
	inputDisable(true);
	let swapped;
	do {
		swapped = false;
		for (let i = 0; i < arr.length - 1; i++) {
			await wait(125);
			colorBarText('rgb(212, 212, 212)');

			containerDiv.children[i].style.backgroundColor = 'rgb(212, 212, 212)';
			containerDiv.children[i].style.color = '#2b2b2b';
			containerDiv.children[i + 1].style.backgroundColor = 'rgb(212, 212, 212)';
			containerDiv.children[i + 1].style.color = '#2b2b2b';

			if (arr[i] > arr[i + 1]) {
				await wait(125);
				swapper(i, i + 1);
				swapped = true;
			}
			containerDiv.children[i].style.backgroundColor = '';
			containerDiv.children[i + 1].style.backgroundColor = '';
		}
		colorBarText('rgb(212, 212, 212)');
	} while (swapped);

	colorBars(highlight, 125);
	colorBarText();
	inputDisable(false);
	return;
}

async function colorBars(color = 'white', t = 40, start = 0, end = containerDiv.children.length) {
	let bar = containerDiv.children;
	for (let i = start; i < end; i++) {
		await wait(t);
		bar[i].style.backgroundColor = color;
	}
}

function colorBarText(color = '#2b2b2b') {
	let bar = containerDiv.children;
	for (let i = 0; i < bar.length; i++) {
		bar[i].style.color = color;
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
