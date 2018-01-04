//functions for buttons

function clue1() {
    removeMarkers();
    
    document.getElementById("message").innerHTML = "Bookshop on patrick Street that is not waterstones"; 

    localStorage.setItem('c1Lat', '51.899567'); //sets local storage variable of latitude
    localStorage.setItem('c1Long', '-8.470838'); // longitude
    
    main.drawMap();
}

function clue2() {
    removeMarkers();
    document.getElementById("message").innerHTML = "Only University in Cork."; //changes text in div to give clue

    localStorage.setItem('c1Lat', '51.892838'); //sets local storage variable of latitude
    localStorage.setItem('c1Long', '-8.493721'); // longitude
    
    main.drawMap();
}

function clue3() {
    removeMarkers();
    document.getElementById("message").innerHTML = "Old market";//changes text in div to give clue

    localStorage.setItem('c1Lat', '51.8924002'); //sets local storage variable of latitude
    localStorage.setItem('c1Long', '-8.4620656'); // longitude
    
    main.drawMap();
}

function clue4() {
    removeMarkers();
    document.getElementById("message").innerHTML = "Belltower";//changes text in div to give clue

    localStorage.setItem('c1Lat', '51.903343'); //sets local storage variable of latitude
    localStorage.setItem('c1Long', '-8.476016'); // longitude
    
    main.drawMap();
}