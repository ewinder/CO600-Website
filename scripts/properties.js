//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        setupUI(user);
        db.collection('Customers').get().then(snapshot => {
            custData(snapshot.docs);

            //console.log(firebase.auth().currentUser.displayName);
        });
        db.collection('Properties').get().then(snapshot => {
            setupProp(snapshot.docs);
        });

    } else {
        setupUI();
        setupProp([]);
    }
});

// DOM elements
const propertyList = document.querySelector('.properties');
const customerList = document.querySelector('.custName');
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

// setup Properties
const setupProp = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const prop = doc.data();
            //console.log(prop);

            const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${prop.address.houseNo} ${prop.address.street} </div> 
        <div class="collapsible-body"><img class="materialboxed" width="400" alt="house image" onError="this.src='./images/image_placeholder.png';"  src=${prop.mainPhotoUrl} data-caption="Main Image"></div>
        <div class="collapsible-body white">${prop.customer}</div>
        <div class="collapsible-body grey lighten-4">${prop.propertyType}</div>
        <div class="collapsible-body white"> ${prop.address.houseNo}     
        ${prop.address.street}<br>
        ${prop.address.town}<br>
        ${prop.address.postCode}</div>
      <div class="collapsible-body grey lighten-4">
      <form action="advert.html" target="_blank" >
        <button class="btn #448aff blue accent-2 waves-effect waves-light" onClick="sessionStorage.setItem('prop', this.value)" value="${prop.propertyId}">View Advert</button>
      </form>
      </div>
      </li>
    `;
            html += li;
        });
        propertyList.innerHTML = html;
    } else {
        propertyList.innerHTML = '<h5 class="center-align">Login to view Property Details</h5>'
    }
};

// new property
const custData = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const cust = doc.data();
            //console.log(cust);
            const select = `
      <select>
        <option value=${cust.customerId}>${cust.name}</option>
      </select>
      `;
            html += select;
        });
        setTimeout(function(){ customerList.innerHTML = html;
            $('select').formSelect();}, 1000);
    } else {
        customerList.innerHTML = '<ul class="center-align">no data</ul>'
    }
    $(document).ready(function() {
        $('select').formSelect();
    });
};

const createFormProp = document.querySelector('#create-form-prop');
var propRef = db.collection('Properties').doc();
createFormProp.addEventListener('submit', (e) => {
    e.preventDefault();

    var park = false;
    var gas = false;
    var gard = false;
    var doubGlaze = false;

    if ($('#parking').is(":checked"))
    {
        park = true;
    }

    if ($('#gas').is(":checked"))
    {
        gas = true;
    }

    if ($('#garden').is(":checked"))
    {
       gard = true;
    }

    if ($('#doubGlaze').is(":checked"))
    {
        doubGlaze = true;
    }

    var cId = $("#custId").val();
    var name = $( "#custId option:selected" ).text();

        propRef.set({

        customer: name,
        address: {
            houseNo: createFormProp['houseNo'].value,
            street: createFormProp['street'].value,
            town: createFormProp['town'].value,
            postCode: createFormProp['postCode'].value
        },
        propertyType: createFormProp['property-type'].value,
        receptions: createFormProp['receptions'].value,
        bathrooms: createFormProp['bathrooms'].value,
        bedrooms: createFormProp['bedrooms'].value,
        parking: park,
        garden: gard,
        dg: doubGlaze,
        gasHeat: gas,
        customerId: cId,
        serverTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        creatorId: firebase.auth().currentUser.displayName,
        propertyId: propRef.id

    }).then(() => {
        // close modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createFormProp.reset();
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


        setTimeout(function() {
            $('.materialboxed').materialbox();
        }, 1000);

});