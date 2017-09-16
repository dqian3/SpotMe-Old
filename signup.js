var config = {
	apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
	authDomain: "spotme-a2502.firebaseapp.com",
	databaseURL: "https://spotme-a2502.firebaseio.com",
	projectId: "spotme-a2502",
	storageBucket: "spotme-a2502.appspot.com",
	messagingSenderId: "1041315357650"
};
firebase.initializeApp(config);

function store_cust_id(id) 
{
	//store in firebase
	create_account(id);

	var userId = firebase.auth().currentUser.uid;
	firebase.database().ref('users/' + userId + "/cust_id").set(id);
}

function store_acc_id(id)
{
	var userId = firebase.auth().currentUser.uid;
	firebase.database().ref('users/' + userId + "/acc_id").set(id);
	window.location.href = "main.html";
}

function del_firebase_user() {
	var user = firebase.auth().currentUser;
	firebase.database().ref('users/'+user.uid).remove();
	user.delete();
}

function grabData()
{
	console.log($("#pass").val() + $("#confpass").val() +" " +$("#email").val())
	if ($("#pass").val() != $("#confpass").val()) {
		alert("Passwords don't match");
		return;
	}
	var data = {
		first_name: $("#fname").val(),
		last_name: $("#lname").val(),
		address:
		{
			street_number: $("#stnum").val(),
			street_name: $("#stname").val(),
			city: $("#city").val(),
			state: $("#state").val(),
			zip: $("#zip").val()
		},
		phonenumber: $("#phone").val()
	};

	firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#pass").val()).then(function() {
		var userId = firebase.auth().currentUser.uid;
		firebase.database().ref('users/' + userId).set({
			personal_info: data
		});

		register_customer(data);

	});



}