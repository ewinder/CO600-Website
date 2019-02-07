//listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    //get data
    db.collection('Customers').get().then(snapshot => {
      setupCust(snapshot.docs);
      setupUI(user);
      //console.log(firebase.auth().currentUser.displayName);
    });
  } else {
    setupUI();
    setupCust([]);
  }
})

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
  
})

// sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  //const name = signupForm['signup-name'].value;
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
   });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    //console.log("user signed out")
  });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});