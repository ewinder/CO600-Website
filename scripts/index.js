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
    }
});

// DOM elements
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
  }};

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("user signed out")
        //window.location = "index.html";

    });
});

// setup materialize components
document.addEventListener('DOMContentLoaded',  function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});