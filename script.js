
function insertData(items, offset, limit) {

	
	// Сортировка элементов по возрастанию (как на картинке)
	items.sort((a, b) => a.price >= b.price ? 1 : -1);
	
	let cntBegin = offset*limit;

	let cntEnd = cntBegin + limit;
	
	let tbodyData = document.querySelector('#table_data');
		
	if (tbodyData) {
		tbodyData.innerHTML = '';
	}
	
	let itemsSelected = items.slice(cntBegin, cntEnd);
	
	for (const [key, value] of Object.entries(itemsSelected)) {
		
		
		let tr = document.createElement("tr");

		let tdID = document.createElement("td");
		tdID.innerHTML = value.id;
		tdID.className = 'is-bold';
		tr.appendChild(tdID);
		
		let tdTitle = document.createElement("td");
		tdTitle.innerHTML = value.title;
		tr.appendChild(tdTitle);
		
		let tdPrice = document.createElement("td");
		tdPrice.innerHTML = value.price;
		tr.appendChild(tdPrice);
		
		let tdQuantity = document.createElement("td");
		tdQuantity.innerHTML = value.quantity;
		tr.appendChild(tdQuantity);
	
	
		if (tbodyData) {
			tbodyData.appendChild(tr);
		}		
	}
};

$( document ).ready(function() {
	
	var offset = 0;
	var limit = 5;
	var items = {};
	
	$.get('/index.php', {}, function(data){
		items = JSON.parse(data);
		
		backButton.classList.add('disabled');
		insertData(items, 0, 5);
		
	});


	let selCount = document.querySelector('#select_count');
	
	let backButton = document.querySelector('#back');
	let forwardButton = document.querySelector('#forward');
	

	selCount.addEventListener('change', function() {

		limit = Number(this.value);
		offset = 0;

		insertData(items, offset, limit);
		
		forwardButton.classList.remove("disabled");
		backButton.classList.add('disabled');
	});	
	
	backButton.addEventListener('click', function() {

		offset--;
		
		if (offset >= 0) {
			
			forwardButton.classList.remove("disabled");
			insertData(items, offset, limit);
			
			if (offset == 0) {
				backButton.classList.add('disabled');
			} else {
				backButton.classList.remove("disabled");
			}
			
		} else {
			offset = 0;
			backButton.classList.add('disabled');
		}

	});

	forwardButton.addEventListener('click', function() {
		
		offset++;		
		
		let maxOffset = Math.ceil(items.length / limit) - 1;
		
		if (offset <= maxOffset) {

			backButton.classList.remove("disabled");

			insertData(items, offset, limit);
			
			if (offset == maxOffset) {
				forwardButton.classList.add('disabled');
			} else {
				forwardButton.classList.remove("disabled");
			}
		} else {
			offset = maxOffset;
			forwardButton.classList.add('disabled');
		}
	});
	 
});