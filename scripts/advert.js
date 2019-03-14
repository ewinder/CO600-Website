//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        var propId = "8wHeljc273V9LbemDlDW";
        const query = db.collection('Properties');//.where(firebase.firestore.FieldPath.documentId(), '==', propId);
        const propDoc = query.doc(propId);
        const docSub = propDoc.collection("Rooms");
            docSub.get().then((snapshot) => {
                setupAdvert(snapshot.docs);
            });
            db.collection('Properties').where(firebase.firestore.FieldPath.documentId(), '==', propId).get().then((snapshot) => {
            propDet(snapshot.docs);
        });
    } else {
        setupAdvert([]);
    }
});

// DOM elements
const roomData = document.querySelector('.advert');
const propData = document.querySelector('.property');

const propDet = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc =>{
            const prop = doc.data();
            console.log(prop);
            const li = `
      <li>
      <div id="address">${prop.customer}</div>
      <div id="address">${prop.address.houseNo}</div>
      <div id="address">${prop.address.street}</div>
      <div id="address">${prop.address.town}</div>
      <div id="address">${prop.address.postCode}</div>
      <div id="address">${prop.price}</div>
      <div id="address">${prop.propertyType}</div>
      <div id="address"><img alt="house image" onError="this.src='./images/image_placeholder.png';" class="responsive-img" src=${prop.mainPhotoUrl}></div>
      <div id="address">No of Bedrooms - ${prop.bedrooms}</div>
      <div id="address">No of Receptions - ${prop.receptions}</div>
      <div id="address">No of Bathrooms - ${prop.bathrooms}</div>
      </li>
    `;
           html += li;
        });
        propData.innerHTML = html;
    } else {
        propData.innerHTML = '<h5 class="center-align">No Advert</h5>'
    }
};

// setup the Advert
const setupAdvert = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const adv = doc.data();
            console.log(adv);
            const li = `
      <li>
      <div id="roomName">${adv.roomName}</div>
      <div id="roomImage"><img class="materialboxed" width="300" alt="room image" onError="this.src='./images/image_placeholder.png';" class="responsive-img" src=${adv.imageUrl}></div>
      </li>
    `;
            html += li;
        });
        roomData.innerHTML = html;
    } else {
        roomData.innerHTML = '<h5 class="center-align">No Advert</h5>'
    }
};

// // logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//     e.preventDefault();
//     auth.signOut().then(() => {
//         //console.log("user signed out")
//         window.location = "index.html";
//
//     });
// });
// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, "outDuration");
});