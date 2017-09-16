 var config = {
    apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
    authDomain: "spotme-a2502.firebaseapp.com",
    databaseURL: "https://spotme-a2502.firebaseio.com",
    projectId: "spotme-a2502",
    storageBucket: "spotme-a2502.appspot.com",
    messagingSenderId: "1041315357650"
  };
firebase.initializeApp(config);


function store_order(order)
{
	var userId = firebase.auth().currentUser.uid;
	console.log(userId)
	var promise = firebase.database().ref('orders/' + userId).set(order);

    promise.then(function() {
    	var promise2 = firebase.database().ref('users/' + userId + '/ordering').set(true);
        promise2.then(function() {
        	
            window.location.href = "info.html";
        });
    });
    promise.catch(function(error) {
      alert("Failed");
    });

	
	
	
}


function grabData()
{
	var order = {
		amount_needed: $("#amt_needed").val(),
		max_eta: $("#max_eta_away").val(),
		time: new Date(),
		location: {lat:user_latitude1, long: user_longitude1}, 
		started: false
		//ETA:
	}
	
	store_order(order);
}