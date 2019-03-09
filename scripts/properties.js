// DOM elements
const propertyList = document.querySelector('.properties');
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
}

// setup Properties
const setupProp = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const prop = doc.data();
            //console.log(prop)

            const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> Name - ${prop.name} </div>
        <div class="collapsible-body white"> ${prop.address.houseNo}
        ${prop.address.street}<br>
        ${prop.address.town}<br>
        ${prop.address.postCode}</div>
      
      </li>
    `;
            html += li;
        });
        propertyList.innerHTML = html;
    } else {
        propertyList.innerHTML = '<h5 class="center-align">Login to view Property Details</h5>'
    }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
