//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        setupUI(user);
        db.collection('Properties').get().then(snapshot => {
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
const setupAdvert = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const cust = doc.data();
            //console.log(cust)

            const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> Name - ${cust.name} </div>
        <div class="collapsible-body white"> ${cust.address.houseNo}
        ${cust.address.street}<br>
        ${cust.address.town}<br>
        ${cust.address.postCode}</div>
        <div class="collapsible-body white"> ${cust.email} </div>
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

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        //console.log("user signed out")
        window.location = "index.html";

    });
});
