/*jslint sloppy:true, browser:true, devel:true, white:true, vars:true, eqeq:true, nomen:true, unparam:true */
/*global intel, google, Marker, device */

var _map = null;
var _seconds = 30;
var _llbounds = null;
var myLatLng;
var oldLatLng = "";
var boolTripTrack = true;
var clueLatLng;
var markers = [];
//Create the google Maps and LatLng object 

function removeMarkers() {
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function drawMap() {
    //Creates a new google maps object
    removeMarkers();
    var latlng = new google.maps.LatLng(currentLatitude, currentLongitude);
    myLatLng = latlng;
    var clue1Lat = localStorage.getItem('c1Lat');
    var clue1Long = localStorage.getItem('c1Long');
    console.log(clue1Lat + ", " + clue1Long);
    clueLatLng = new google.maps.LatLng(clue1Lat, clue1Long);
    var mapOptions = {
        center: latlng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
        }
    };
    if (boolTripTrack === true) {
        if (google.maps) {
            _map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        } else {
            alert("Unable to display map.");
        }
    }
    
}
//40.7655,-73.97204 = NYC
var currentLatitude = "40.713768";
var currentLongitude = "-73.016696";
var options = {
    timeout: 10000,
    maximumAge: 11000,
    enableHighAccuracy: true
};
//Success callback
var suc = function (p) {
    console.log("geolocation success", 4);
    removeMarkers();
    var clue1Lat = localStorage.getItem('c1Lat');
    var clue1Long = localStorage.getItem('c1Long');
    console.log(clue1Lat + ", " + clue1Long);
    clueLatLng = new google.maps.LatLng(clue1Lat, clue1Long);

    //Draws the map initially
    if (_map === null) {
        currentLatitude = p.coords.latitude;
        currentLongitude = p.coords.longitude;
        drawMap();
    } else {
        google.maps.event.trigger(_map, 'resize');
        myLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);

    }
    //calls the distance tracker 
    distance = getDistance(clueLatLng,myLatLng);
    
    
    //Creates a new google maps marker object for using with the pins
    if ((myLatLng.toString().localeCompare(oldLatLng.toString())) !== 0) {
        //Create a new map marker
        var Marker = new google.maps.Marker({
            position: myLatLng,
            map: _map
        });
        markers.push(Marker);
        var Marker1 = new google.maps.Marker({
            position: clueLatLng,
            map: _map
        });
        markers.push(Marker1);
        if (_llbounds === null) {
            //Create the rectangle in geographical coordinates
            _llbounds = new google.maps.LatLngBounds(new google.maps.LatLng(p.coords.latitude, p.coords.longitude)); //original
        } else {
            //Extends geographical coordinates rectangle to cover current position
            _llbounds.extend(myLatLng);
        }
        //Sets the viewport to contain the given bounds & triggers the "zoom_changed" event
        _map.fitBounds(_llbounds);
    }
    oldLatLng = myLatLng;
};
var fail = function () {
    console.log("Geolocation failed. \nPlease enable GPS in Settings.", 1);
};
var getLocation = function () {
    console.log("in getLocation", 4);
};
//Execute when the DOM loads  

function onDeviceReady() {
    try {
        if (navigator.geolocation !== null) {
            document.getElementById("map_canvas").style.height = screen.height + "px";
            navigator.geolocation.watchPosition(suc, fail, options);
        } else {
            alert("navigator.geolocation == null")
        }
    } catch (e) {
        alert(e.message);
    }

    try {
        //hide splash screen
        navigator.splashscreen.hide(); 
    } catch (e) {}
}
document.addEventListener("deviceready", onDeviceReady, false);