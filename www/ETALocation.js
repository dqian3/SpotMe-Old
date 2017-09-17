var x = document.getElementById("demo");
var user_latitude4;
var user_longitude4;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    return user_longitude4 + " " + user_latitude4;
}
function showPosition(position) {
    user_latitude4=position.coords.latitude;
    user_longitude4=position.coords.longitude;
    moreMapInit(user_latitude4, user_longitude4);


}