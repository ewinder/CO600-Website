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
                setupRooms(snapshot.docs);
            });
            db.collection('Properties').where(firebase.firestore.FieldPath.documentId(), '==', propId).get().then((snapshot) => {
            propDet(snapshot.docs);
        });
    } else {
        setupAdvert([]);
        propDet([]);
    }
});

// DOM elements
const roomData = document.querySelector('.rooms');
const propData = document.querySelector('.property');
//const imageData = document.querySelector('.images');

const propDet = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc =>{
            const prop = doc.data();
            //console.log(prop);
            const li = `
      <div class="center-align">
        <a href="index.html">
        <img id ="logo" src="property_manager_small.png" alt="Logo">
        </a>
      </div>
      <nav class="nav extended z-depth-0 #448aff blue accent-2">
      <div class="row">
    <!-- Address --->
    <div class="col l10" id="address" style="font-size:1.8vw">${prop.address.houseNo} ${prop.address.street} ${prop.address.town} ${prop.address.postCode}</div>
    <!-- price--->
    <div class="col l2 right-align" id="price" style="font-size:1.5vw">${prop.price}</div>
    </div>     
     </nav>
      <div class="row">
      <div class="col l6" id="details" style="font-size:1.5vw">
      <ol>${prop.propertyType}</ol>
      <ol>${prop.bedrooms} Bedrooms</ol>
      <ol>${prop.receptions} Receptions</ol>
      <ol>${prop.bathrooms} Bathrooms</ol>
      <ol>Garden ${prop.garden}</ol>
      <ol>Parking ${prop.parking}</ol>
      <ol>Gas Central Heating ${prop.gasHeat}</ol>
      <ol>Double Glazing ${prop.dg}</ol>
      </div>
      <div class="col l6 right-align display:inline" id="image"><img class="materialboxed responsive-img" width="800"  alt="house image" onError="this.src='./images/image_placeholder.png';" src=${prop.mainPhotoUrl} data-caption="Main Image"></div>
      </div>
           
    `;
            html += li;
        });
        propData.innerHTML = html;
    } else {
        propData.innerHTML = '<h5 class="center-align">No Adverts</h5>'
    }
};

// setup the Advert
const setupRooms = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const adv = doc.data();
            //console.log(adv);
            const li = `
      <div class="col l3 center-align">
      <div class="center-align" id="room"><div class="" id="roomName"><h4>${adv.roomName}</h4></div><img class="materialboxed position: absolute" width="300" src=${adv.imageUrl} data-caption="${adv.roomName}" alt="room image" onError="this.src='./images/image_placeholder.png';"><div>${adv.roomDesc}</div></div>
      <br>
      </div>
      </div>
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