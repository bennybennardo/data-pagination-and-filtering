//This code paginates, displays, and dynamically searches the array of objects in js/data.js


const itemsPerPage = 9

//This function loops over the 'list' array and displays the number of items declared by the 'itemsPerPage' variable.

function showPage ( list, page ) {
   const startIndex = ( page * itemsPerPage) - itemsPerPage
   const endIndex = page * itemsPerPage
   const studentList = document.querySelector('.student-list')

   studentList.innerHTML = '';

   for ( let i = 0; i < list.length; i++ ) {
      if ( i >= startIndex && i < endIndex ){

         const fullName = `${list[i].name.first} ${list[i].name.last}`

         studentList.insertAdjacentHTML( 'beforeend',  
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="${fullName}'s Profile Picture">
               <h3>${fullName}</h3>  
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">${list[i].registered.date}</span>
            </div>
         </li>`)

      }  

   }

}

/*
This function adds pagination to an array given as the 'list' parameter.
It will then add the 'active' class to whichever page the user is currently viewing.
*/

function addPagination(list) {
   const totalPages = ( list.length / itemsPerPage );
   const linkList = document.querySelector('.link-list');

   linkList.innerHTML = '';

   for ( let i = 0; i < totalPages; i++) {
      linkList.insertAdjacentHTML('beforeend', `<li><button type="button" id="#btn-${i}" class="control-btn">${i+1}</button></li>`)
   }

   document.querySelector('.control-btn').classList.add('active');

   const buttons = document.querySelectorAll('.control-btn');

   function setAction(e) {
      for ( let i = 0; i < buttons.length; i++) {
         buttons[i].classList.remove('active');
      }

      let target = e.target;
      target.classList.add('active');
   };
   
   for ( let i = 0 ; i < totalPages; i++) {

      buttons[i].addEventListener( 'click', (e) => {
         
         setAction(e);
         e.target.classList.add('active');
         showPage(list, e.target.textContent);
            
      });
   }

}

// Calling these functions allows for the first page to be displayed on the first load of the browser.

showPage( data, 1 )
addPagination(data);

//This add the UI elements of a search bar and button to the header.

const h2 = document.querySelector('h2');

h2.insertAdjacentHTML('afterend', `<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button" id="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`);

/*This function compares the user's search bar input to the 'name' values in the data.js array of objects.
If there are matches, it will display them with the appropriate pagination.
If there are no matches, it will display a 'No results found' message with no pagination. */

const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-button');

function searchFunction( searchInput ) {
   const search = searchInput.value.toLowerCase();
   const searchResults = [];

   for ( let i = 0; i < data.length; i++) {

      const fullName = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;

      if ( search.length !== 0 && fullName.includes(search) ) {

         searchResults.push(data[i]);

         showPage(searchResults, 1);
         addPagination(searchResults);

      } else if ( search.length !==0 && searchResults.length === 0 ) {
         document.querySelector('.student-list').innerHTML = `<center>No results found`;
         document.querySelector('.link-list').innerHTML = '';
      }

   }
}

searchButton.addEventListener('click', ()=> {

   searchFunction(searchInput)
   
})

searchInput.addEventListener('keyup', ()=> {

   searchFunction(searchInput)
   
})