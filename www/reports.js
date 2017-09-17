var config = {
    apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
    authDomain: "spotme-a2502.firebaseapp.com",
    databaseURL: "https://spotme-a2502.firebaseio.com",
    projectId: "spotme-a2502",
    storageBucket: "spotme-a2502.appspot.com",
    messagingSenderId: "1041315357650"
  };
  firebase.initializeApp(config);

var userId;
var otherId;
var isUserCust;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	userId = firebase.auth().currentUser.uid;
  	firebase.database().ref("users/" + userId).once("value").then(function(user) {
  		if (user.child("ordering")) {
  			firebase.database().ref("orders/" + userId).once("value").then(function(order) {
  				otherId = order.child("deliverer").val();
  				console.log(otherId);
  			});
  		} else {
  			firebase.database().ref("deliverers/").once("value").then(function(cust) {
  				otherId = cust.child(userId).val();
  				console.log(otherId);
  			});
  		}
  	});

  } else {
  }
});

function fileReport(id_of_reported, id_of_reporter)
{
	var time = new Date;
	var preferred;

	if(document.getElementById('phone').checked) 
	{
  		preferred = "Phone";
	}
	else if(document.getElementById('email').checked) 
	{
		preferred = "Email";
	}
	else
	{
		preferred = "Email";
	}
	
	var x = firebase.database().ref("reports/" + id_of_reported);
	
	var info = {
				reporter: id_of_reporter,
				time: time,
				message: $("#message").val(),
				preferred_method: preferred	
			};
	x.set( info	).then(function(){
		console.log("success")
	});


}

function getReportInfo()
{
	fileReport(otherId, userId);
	window.location.href = 'main.html';
}

//getInfo(); ///remember to comment this out







