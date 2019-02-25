//listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    //get data
    setupUI(user);
    db.collection('Customers').get().then(snapshot => {
    setupCust(snapshot.docs);
     
      //console.log(firebase.auth().currentUser.displayName);
    });
  } else {
    setupUI();
    setupCust([]);
  }
});

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