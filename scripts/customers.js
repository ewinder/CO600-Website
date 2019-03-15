//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        setupUI(user);
        db.collection('Customers').get().then(snapshot => {
            setupCust(snapshot.docs);
            snapshot.forEach(doc => {
                custData(doc.data);
            });
            //console.log(firebase.auth().currentUser.displayName);
        });
        db.collection('Properties').get().then(snapshot => {
            setupProp(snapshot.docs);
        });

    } else {
        setupUI();
        setupCust([]);
    }
});

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
const setupCust = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const cust = doc.data();
            //console.log(cust)

            const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${cust.name} </div>
        <div class="collapsible-body white"> ${cust.address.houseNo}
        ${cust.address.street}<br>
        ${cust.address.town}<br>
        ${cust.address.postCode}</div>
        <div class="collapsible-body grey lighten-4" black-text> <a href="mailto:${cust.email}?subject=Property Manager">${cust.email}</a></div>
        <div class="collapsible-body white"> ${cust.phoneNo} </div>
      </li>
    `;
            html += li;
        });
        customerList.innerHTML = html;
    } else {
        customerList.innerHTML = '<h5 class="center-align">Login to view Customer Details</h5>'
    }
};

// new customer
const createForm = document.querySelector('#create-form');
var newRef = db.collection('Customers').doc();
//console.log(newRef.id);
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    newRef.set({
        name: createForm['name'].value,
        phoneNo: createForm['phone'].value,
        email: createForm['email'].value,
        address: {
            houseNo: createForm['houseNo'].value,
            street: createForm['street'].value,
            town: createForm['town'].value,
            postCode: createForm['postCode'].value
        },
        serverTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        creatorId: firebase.auth().currentUser.displayName,
        customerId: newRef .id

    }).then(() => {
        // close modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
        location.reload();
    })
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        //console.log("user signed out")
        window.location = "index.html";

    });
});

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});