// This will probably control a popup in the future that appeares on
// Map html instead of a separate info.html

var config = {
	apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
	authDomain: "spotme-a2502.firebaseapp.com",
	databaseURL: "https://spotme-a2502.firebaseio.com",
	projectId: "spotme-a2502",
	storageBucket: "spotme-a2502.appspot.com",
	messagingSenderId: "1041315357650"
};
firebase.initializeApp(config);

var destId = "4HRB2yLjjCbeeKQmMfodjIFSBc12" //Very important, set this to what the map selected
var ETA = 5;

firebase.database().ref('/users/' + destId).once('value').then(function(user) {
	//Make this display properly instead of raw json.
	$(".personal_info").text(JSON.stringify(user.child("personal_info")));

	firebase.database().ref("orders/" + destId).once("value").then(function(order){
		console.log(JSON.stringify(order));
		$("#amt_needed").val(order.val().amount_needed);
		$("#dist").val(ETA); //Temporary, will be based on location later
	});
});


function accept() {
	var userId = firebase.auth().currentUser.uid;
	firebase.database().ref("deliverers/" + userId).set(destId);
	firebase.database().ref("orders/" + destId + "/ETA").set(ETA); //Eta, gotten from distance
	firebase.database().ref("orders/" + destId + "/started").set(true); //Eta, gotten from distance
	firebase.database().ref("user/" + userId + "/ordering").set(false); //Just to makes sure
	window.location.href = "info.html";
}

