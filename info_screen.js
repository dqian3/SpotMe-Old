var config = {
    apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
    authDomain: "spotme-a2502.firebaseapp.com",
    databaseURL: "https://spotme-a2502.firebaseio.com",
    projectId: "spotme-a2502",
    storageBucket: "spotme-a2502.appspot.com",
    messagingSenderId: "1041315357650"
  };
  firebase.initializeApp(config);
var userType;
var userId= "4HRB2yLjjCbeeKQmMfodjIFSBc12";

function getRecieverInfo()
{
   //userId = firebase.auth().currentUser.uid;
   console.log (userId);
   return firebase.database().ref('/users/' + userId).once("value").then(function(snapshot) {
  	var fname = snapshot.child("personal_info/first_name").val();
  	var lname = snapshot.child("personal_info/last_name").val();
  	var phonenum = snapshot.child("personal_info/phonenumber").val();

  	   console.log("#1  " + fname + '  ' + lname + "  " + phonenum);

  	$("#CustomerInfor").html(fname + "\n" + lname + "\n" + phonenum);


  	
  });

}

function getDelivererInfo(uId)
{
   console.log(uId);
   firebase.database().ref('/users/' + uId).once("value").then(function(snapshot) {
  		var fname = snapshot.child("personal_info/first_name").val();
  		var lname = snapshot.child("personal_info/last_name").val();
  		var phonenum = snapshot.child("personal_info/phonenumber").val();
  		
  	  	 console.log("#1  " + fname + '  ' + lname + "  " + phonenum);

  	$("#CustomerInfor").html(fname + "\n" + lname + "\n" + phonenum);


  	
  	});


}


function userStatus()
	{
		// userId = firebase.auth().currentUser.uid;
  		firebase.database().ref('/users/' + userId).once("value").then(function(snapshot) {
  		var ordering = snapshot.child("ordering").val();
  		console.log(userId);
  		console.log(ordering);
  		if (ordering === true)
			{
				//on the money reciever's phone
				userType = "customer";
				var deliverId = snapshot.child("deliverer").val();
				//Get deliverer's info
				firebase.database().ref('/orders/' + userId).once("value").then(function(deliverer) {
  					var delivererId = deliverer.val().deliverer;
  					console.log(delivererId);
  					getDelivererInfo(delivererId);
  				});
					

			}
		else
			{
				//on the deliverer's phone
				userType = "deliverer";
			}
  });
}

userStatus();










