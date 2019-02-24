// DOM elements
const customerList = document.querySelector('.customers');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
     // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup Customers
const setupCust  =  (data)  => {

  if (data.length) {
    
  } else {
    customerList.innerHTML = '<h5 class="center-align">Login to view Service Updates</h5>'
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded',  function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});