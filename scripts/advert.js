//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        var propId = sessionStorage.getItem('prop');
        console.log("Session " + propId);
        //get data
        //var propId = "8wHeljc273V9LbemDlDW";
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
            //console.log(prop);
            const li = `
      <li>
      <div id="address">${prop.customer}</div> 
      <div id="address">${prop.address.houseNo}</div>
      <div id="address">${prop.address.street}</div>
      <div id="address">${prop.address.town}</div>
      <div id="address">${prop.address.postCode}</div>
      <div id="address">${prop.price}</div>
      <div id="address">${prop.propertyType}</div>
      <div class="right-align" id="image"><img class="materialboxed display:inline right-align" width="500" alt="house image" onError="this.src='./images/image_placeholder.png';" class="responsive-img" src=${prop.mainPhotoUrl}></div>
      <div id="address">No of Bedrooms - ${prop.bedrooms}</div>
      <div id="address">No of Receptions - ${prop.receptions}</div>
      <div id="address">No of Bathrooms - ${prop.bathrooms}</div>
      </li>
    `;
           html += li;
        });
        propData.innerHTML = html;
    } else {
        propData.innerHTML = '<h5 class="center-align">No Adverts</h5>'
    }
};

// setup the Advert
const setupAdvert = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const adv = doc.data();
            //console.log(adv);
            const li = `
      <li>
      <div id="roomName">${adv.roomName}
      <img class="materialboxed" width="300" src=${adv.imageUrl} data-caption="${adv.roomName}" alt="room image" onError="this.src='./images/image_placeholder.png';"><br>
      </div>
      </li>
    `;
            html += li;
        });
        roomData.innerHTML = html;
    } else {
        roomData.innerHTML = '<h5 class="center-align">No room details have been created yet</h5>'
    }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    $(document).ready(function(){
        setTimeout(function() {
            $('.materialboxed').materialbox();
        }, 1000);
    });

});