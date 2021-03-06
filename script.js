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
sliderDiv.style.display = 'none';
searchDiv.style.display = 'none';

resetBtn.addEventListener('click', fullReset);

choice.addEventListener('change', (e) => {
	//reset stuff
	reset();
	algo = e.target.value;
	console.log(algo);
	if (algo) {
		sliderDiv.style.display = 'block';
	}

	if (algo === 'selection' || algo === 'bubble') {
		searchDiv.style.display = 'none';
	} else {
		searchDiv.style.display = 'block';
	}

	if (algo === 'binary') {
		generateArray();
		arr.sort((a, b) => {
			if (a > b) return 1;
			if (a < b) return -1;
		});
		generateBars();
	} else {
		generateArray();
		generateBars();
	}
});

goBtn.addEventListener('click', () => {
	let numToSearch = parseInt(searchInput.value);
	switch (algo) {
		case 'linear':
			if (numToSearch) {
				console.log('Searching for: ', numToSearch);
				linear(numToSearch);
			} else {
				alert('please enter a valid input');
			}
			break;
		case 'binary':
			if (numToSearch) {
				console.log('Searching for: ', numToSearch);
				binary(numToSearch);
			} else {
				alert('please enter a valid input');
			}
			break;
		case 'bubble':
			break;
		case 'selection':
			console.log('selection sorting!');
			selectionSort();
			break;
		default:
			alert('Choose an algorithm!');
			break;
	}
});

slider.addEventListener('change', (e) => {
	arr = [];
	setSize = parseInt(e.target.value);
	sliderValueSpan.textContent = e.target.value;
	// console.log('setSize: ', setSize);
	//populate container with ranges of random numbers
	clearContainerDiv();

	if (algo === 'binary') {
		generateArray();
		arr.sort((a, b) => {
			if (a > b) return 1;
			if (a < b) return -1;
		});
		generateBars();
	} else {
		generateArray();
		generateBars();
	}
});

(function onLoad() {
	slider.value = 25;
	sliderValueSpan.textContent = 25;
})();

function fullReset() {
	reset();
	sliderDiv.style.display = 'none';
	choice.value = 'default';
}

function reset() {
	arr = [];
	searchDiv.style.display = 'none';
	clearContainerDiv();
	searchInput.value = '';
	sliderValueSpan.textContent = 25;
	slider.value = 25;
	slider.disabled = false;
	algo = '';
}

function generateBars() {
	//add height based on algo - if sorting
	//add flex-end property to container element based on algo - if sorting
	const containerHeight = containerDiv.clientHeight - 20;

	if (algo === 'selection' || algo === 'bubble') {
		for (let num of arr) {
			let newDiv = document.createElement('div');
			newDiv.textContent = num;
			containerDiv.style.alignItems = 'flex-end'; //reset this property based on algo
			let barHeight = Math.floor(containerHeight * (num / 100));
			barHeight += 'px';
			// console.log(barHeight);
			newDiv.classList.add('barColor');
			newDiv.style.height = barHeight;
			containerDiv.append(newDiv);
		}
	} else {
		for (let num of arr) {
			let newDiv = document.createElement('div');
			newDiv.textContent = num;
			containerDiv.style.alignItems = 'center'; //reset this property based on algo
			newDiv.classList.add('barColor');
			containerDiv.append(newDiv);
		}
	}
}

//make an array of N random numbers where N - sliderValue
function generateArray() {
	for (let i = 0; i < setSize; i++) {
		// let num = Math.floor(Math.random() * 100) + 1;
		let num = Math.floor(Math.random() * 96) + 5;
		arr.push(num);
	}
}

function clearContainerDiv() {
	containerDiv.innerHTML = '';
}

//algos----------------------------------------------------------------------------------------------------------------//

// ==========================
// linear search
// ==========================
async function linear(el) {
	slider.disabled = true;
	searchInput.disabled = true;
	let divNum;
	for (let child of containerDiv.children) {
		divNum = parseInt(child.innerText);
		if (divNum === el) {
			await wait();
			child.style.background = 'pink';
			break;
		} else {
			await wait();
			child.style.background = 'red';
		}
	}
	searchInput.disabled = false;
	slider.disabled = false;
}
//==========================
//binary search
//==========================
async function binary(el) {
	slider.disabled = true;
	searchInput.disabled = true;
	let start = 0;
	// let end = arr.length - 1;
	let end = containerDiv.children.length - 1;

	containerDiv.children[start].style.border = '5px solid red';
	containerDiv.children[end].style.border = '5px solid red';

	while (start <= end) {
		let mid = Math.floor((start + end) / 2);
		let divNum = parseInt(containerDiv.children[mid].innerText);
		if (divNum === el) {
			//found it! color div pink
			await wait();
			containerDiv.children[mid].style.background = 'pink';
			break;
		} else if (divNum < el) {
			//color new range limit
			await wait();
			// containerDiv.children[mid].style.border = '5px solid red';
			start = mid + 1;
			containerDiv.children[start].style.border = '5px solid red';
			containerDiv.children[end].style.border = '5px solid red';
		} else {
			//arr[mid] > el
			//color new range limit
			await wait();
			// containerDiv.children[mid].style.border = '5px solid red';
			end = mid - 1;
			containerDiv.children[start].style.border = '5px solid red';
			containerDiv.children[end].style.border = '5px solid red';
		}
	}
	searchInput.disabled = false;
	slider.disabled = false;
	return null;
}

// ==========================
// selectionSort
// ==========================
async function selectionSort() {
	slider.disabled = true;
	for (let i = 0; i < containerDiv.children.length - 1; i++) {
		//color the 1st bar
		let min = parseInt(containerDiv.children[i].innerText);
		await wait();
		containerDiv.children[i].style.backgroundColor = 'yellow';
		for (let j = i + 1; j < containerDiv.children.length; j++) {
			//delay
			await wait();
			//color the next bar
			containerDiv.children[j].style.backgroundColor = 'yellow';

			if (arr[j] < arr[i]) {
				swapper(i, j);
			}
			// if (arr[j] < arr[i]) {
			// 	let iHeight = containerDiv.children[i].style.height;
			// 	let iText = containerDiv.children[i].innerText;
			// 	let jHeight = containerDiv.children[j].style.height;
			// 	let jText = containerDiv.children[j].innerText;
			// 	//swap array
			// 	[ arr[i], arr[j] ] = [ arr[j], arr[i] ]; //swap
			// 	//delay
			// 	//swap DOM element
			// 	// await wait();
			// 	containerDiv.children[i].style.height = jHeight;
			// 	containerDiv.children[i].innerText = jText;
			// 	containerDiv.children[j].style.height = iHeight;
			// 	containerDiv.children[j].innerText = iText;
			// }
			await wait();
			containerDiv.children[j].style.backgroundColor = '';
		}
		containerDiv.children[i].style.backgroundColor = 'lightblue';
	}
	containerDiv.children[containerDiv.children.length - 1].style.backgroundColor = 'lightblue';

	slider.disabled = false;
	return;
}

function swapper(prev, next) {
	let prevHeight = containerDiv.children[prev].style.height;
	let prevText = containerDiv.children[prev].innerText;
	let nextHeight = containerDiv.children[next].style.height;
	let nextText = containerDiv.children[next].innerText;
	//swap array
	[ arr[prev], arr[next] ] = [ arr[next], arr[prev] ]; //swap
	//delay
	//swap DOM element
	// await wait();
	containerDiv.children[prev].style.height = nextHeight;
	containerDiv.children[prev].innerText = nextText;
	containerDiv.children[next].style.height = prevHeight;
	containerDiv.children[next].innerText = prevText;
}
//==========================
//bubble sort
//==========================
function bubbleSort() {
	slider.disabled = true;
	let swapped;
	do {
		swapped = false;
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] > arr[i + 1]) {
				[ arr[i], arr[i + 1] ] = [ arr[i + 1], arr[i] ]; //swap
				swapped = true;
			}
		}
	} while (swapped);

	slider.disabled = true;
	return;
}

function wait() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, 400);
	});
}
// function linear(el) {
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] === el) return arr[i];
// 	}

// 	return null;
// }

//==========================
//binary search
//==========================
// function binary(arr, el){
//   let start = 0;
//   let end = arr.length-1;

//   while(start<=end){
//     let mid = Math.floor((start+end)/2);
//     if(arr[mid] === el) {
//       return mid; //return the index
//     } else if(arr[mid]<el){
//       start = mid+1;
//     } else { //arr[mid] > el
//       end = mid-1;
//     }
//   }
//   return null;
// }

//====================================================
//====================================================

//==========================
//selectionSort
//==========================
// function selectionSort(arr){
//   for(let i = 0;i<arr.length-1; i++){
//     let min = arr[i];
//     for(let j = i+1; j<arr.length;j++){
//       if(arr[j]<arr[i]) {
//         [arr[i], arr[j]] = [arr[j], arr[i]]; //swap
//       }
//     }
//   }
//   return arr;
// }

//==========================
//bubble sort
//==========================
// function bubbleSort(arr){
//   let swapped;
//   do{
//     swapped = false;
//     for(let i = 0; i<arr.length-1; i++){
//       if(arr[i] > arr[i+1]){
//         [arr[i], arr[i+1]] = [arr[i+1], arr[i]]; //swap
//         swapped = true;
//       }
//     }
//   }while(swapped)

//   return arr;
// }
