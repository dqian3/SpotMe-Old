var x = document.getElementById("demo");
var user_latitude;
var user_longitude;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    return user_longitude + " " + user_latitude;
}
function showPosition(position) {
    user_latitude=position.coords.latitude;
    user_longitude=position.coords.longitude;
    moreMapInit(user_latitude, user_longitude);


}