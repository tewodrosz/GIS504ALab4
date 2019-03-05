window.onload = function(){
alert('Hey! If you give it permission, this web page will access to your location and device sensors.');
} // On load, this alert notifies the user that the page will ask to access their location and gives a reason why. You can easily modify this text.

var map = L.map('map').fitWorld(); //Here we initialize the map in the "map" div defined in the html body. Below, we call in Mapbox tiles and use the options to set the max zoom to 18, include our attribution, specify that the tiles set we want is mapbox.streets, and provide the access token for Mapbox's API

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.streets', // experiment with changing this to mapbox.light, mapbox.dark, mapbox.satellite, etc.
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //this is a generic access token, but when you deploy projects of your own, you must get a unique key that is tied to your Mapbox account
}).addTo(map);


loc = document.getElementById("map");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  
  } else { 
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
  
  }

function showPosition(position) {
  loc.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br> Longitude: " + position.coords.longitude;
}

//the showError function handles various error cases and returns the appropriate text to let the user know that an error has occured. 
function showError(error) {
  switch(error.code) {
    case e.PERMISSION_DENIED:
      loc.innerHTML = "User denied the request for Geolocation."
      break;
    case e.POSITION_UNAVAILABLE:
      loc.innerHTML = "Location information is unavailable."
      break;
    case e.TIMEOUT:
      loc.innerHTML = "The request to get user location timed out."
      break;
    case e.UNKNOWN_ERROR:
      loc.innerHTML = "An unknown error occurred."
      break;
  }
}

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " Meters of this point." + "<br> Latitude: " + e.latlng.lat + "<br>Longitude: " + e.latlng.lng).openPopup();
  //this adds a Leaflet popup to the map at the lat and long returned by the locate function. The text of the popup is defined here as well. Please change this text to specify what unit the radius is reported in.

  L.circle(e.latlng, radius).addTo(map); // this adds a Leaflet circle to the map at the lat and long returned by the locate function. Its radius is set to the var radius defined above.
    if (radius < 30) {
      L.circle(e.latlng, radius, {color: 'blue'}).addTo(map);
    }
    else{
    L.circle(e.latlng, radius, {color: 'red'}).addTo(map);
  }
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);


map.locate({
  setView: true, //this option centers the map on location and zooms
  maxZoom: 16, // this option prevents the map from zooming further than 16, maintaining some spatial context even if the accuracy of the location reading allows for closer zoom
  timeout: 15000, // this option specifies when the browser will stop attempting to get a fix on the device's location. Units are miliseconds. Change this to 5000 and test the change. Before you submit, change this to 15000.
  watch: false, // you can set this option from false to true to track a user's movement over time instead of just once. For our purposes, however, leave this option as is.
});



var mbAttr = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
mbUrl2 = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';


  var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    dark  = L.tileLayer(mbUrl, {id: 'mapbox.dark',   attribution: mbAttr}),
      satellite  = L.tileLayer(mbUrl, {id: 'mapbox.satellite',   attribution: mbAttr});

 
  var baseLayers = {
    "Grayscale": grayscale,
    "Dark": dark
    "Satllite":satellite
  };

  

  L.control.layers(baseLayers).addTo(map); 

