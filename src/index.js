//✅ 1. refactor: event handler functions, render functions, testing functions

/* constants */
const bookList = document.querySelector("#book-list");
const toggleBookFormButton = document.querySelector("#toggle-form");
const bookForm = document.querySelector("#book-form"); 
const storeForm = document.querySelector("#store-form");
const toggleStoreFormButton = document.querySelector("#toggle-store-form");
const storeSelector = document.querySelector("#store-selector")
const url = "http://127.0.0.1:3000"
//✅ 3. store drop-down list
//✅ 3. store-form const

//✅ 2. include POST request on new book form submit
  //✅ 2a. create fetch request: pessimistic and optimistic approach
  //✅ 2b. use boilerplate from request_helpers.js to execute POST request
	//✅ 2c. use dev tools to simulate a slow collection (network) and add a loading class to li 
bookForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: e.target.price.value,
    reviews: [],
    inventory: e.target.inventory.value,
    imageUrl: e.target.imageUrl.value
  }
  fetch(`${url}/books`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(book)
  })
  .then(res => res.json())
  .then(data=>renderBook(data))
  .catch(err => alert("Something Went Wrong"))
})


//✅ 3. implement store form and store dropdown
//✅ 3a. create eventListener for form
	//✅ 3b. create POST request for new store
storeForm.addEventListener("submit", (e)=>{
  e.preventDefault()
    const store = {
      location: e.target.location.value,
      name: e.target.name.value,
      number: e.target.number.value
    }
  fetch(`${url}/stores`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(store)
  })
  .then(res => res.json())
  .then(data=> addSelectOptionForStore(data))
  .catch(err => alert("Something Went Wrong"))
})


/* fetches and renders all books */
fetch(`${url}/books`)
	.then((res) => res.json())
	.then((books) => books.forEach((book) => renderBook(book)));
getJSON(`${url}/stores`)
.then(stores => {
	renderStoreSelectionOptions(stores)
	renderHeader(stores[0])
	renderFooter(stores[0])
})

/* event listeners to toggle forms */
toggleBookFormButton.addEventListener("click", (e) => {
	toggleBookForm();
});
toggleStoreFormButton.addEventListener("click", (e) => {
	toggleStoreForm();
});

/* fills in form with data for testing */
fillStore(storeForm, {
	name: "BooksRUs",
	location: "LaLaLand",
	number: "555-555-5555"
});

fillBook(bookForm, {
	title: "Designing Data Intensive Applications",
	author: "Martin Kleppmann",
	price: 20,
	imageUrl: "https://m.media-amazon.com/images/I/91YfNb49PLL._SY522_.jpg",
	inventory: 11
})


//////////////////////
// render functions //
//////////////////////


////////////////////////////////////////////////////////////////
// Event Listeners/Handlers (Behavior => Data => Display) //////
////////////////////////////////////////////////////////////////


///////////////////////////
// Testing functions //////
///////////////////////////
