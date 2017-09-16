var x = document.getElementById("demo");
var user_latitude1;
var user_longitude1;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
getLocation();
function showPosition(position) {
    user_latitude1=position.coords.latitude;
    user_longitude1=position.coords.longitude;
}