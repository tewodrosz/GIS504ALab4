window.onload = function(){
alert('Hey! If you give it permission, this web page will access to your location and device sensors.');
} 

var map = L.map('map').fitWorld(); 

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.streets', 
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' 
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
 

  L.circle(e.latlng, radius).addTo(map); 
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
  setView: true, 
  maxZoom: 16, 
  timeout: 15000, 
  watch: false, 
});



var mbAttr = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';


  var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    dark  = L.tileLayer(mbUrl, {id: 'mapbox.dark',   attribution: mbAttr}),
     satellite  = L.tileLayer(mbUrl, {id: 'mapbox.satellite',   attribution: mbAttr});

 
  var baseLayers = {
    "Grayscale": grayscale,
    "Dark": dark,
    "Satllite": satellite
  };

  

  L.control.layers(baseLayers).addTo(map); 

