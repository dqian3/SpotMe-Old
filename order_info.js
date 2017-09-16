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
	firebase.database().ref('orders/' + order_info).set(order);
	firebase.database().ref('users/' + userId + '/orderring').set(true);

}


function grabData()
{
	var order = {
		amount_needed: $("#amt_needed").val(),
		max_dist: $("#max_dist_away").val(),
		time: new Date(),
		//location: 
		started: false
		//ETA:
	}
	
	store_order(order);
}