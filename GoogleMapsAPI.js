var origin1 = new google.maps.LatLng(user_latitude, user_longitude);
var destination1 = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
    {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: 'DRIVING',
        transitOptions: TransitOptions,
        drivingOptions: DrivingOptions,
        unitSystem: UnitSystem,
        avoidHighways: Boolean,
        avoidTolls: Boolean,
    }, callback);

function callback(response, status) {
    // See Parsing the Results for
    // the basics of a callback function.
}