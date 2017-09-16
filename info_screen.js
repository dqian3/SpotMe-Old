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

//var userId = -------- will be assigned somehow when we login
var RecUserId= "4HRB2yLjjCbeeKQmMfodjIFSBc12";
var DelUserId= "SwUOBxSqBqgyYH4znoH23BbE8px1";

function getRecieverInfo(rId)
{
   console.log (rId);
   firebase.database().ref('/users/' + rId).once("value").then(function(snapshot) 
   {
  	var fname = snapshot.child("personal_info/first_name").val();
  	var lname = snapshot.child("personal_info/last_name").val();
  	var phonenum = snapshot.child("personal_info/phonenumber").val();

  	   console.log("#2  " + fname + '  ' + lname + "  " + phonenum);

  	$("#CustomerInfor").html(fname + "\n" + lname + "\n" + phonenum);


  	
  });

}

function getDelivererInfo(dId)
{
   console.log(dId);
   firebase.database().ref('/users/' + dId).once("value").then(function(snapshot) 
   {
  		var fname = snapshot.child("personal_info/first_name").val();
  		var lname = snapshot.child("personal_info/last_name").val();
  		var phonenum = snapshot.child("personal_info/phonenumber").val();
  		
  	  	console.log("#1  " + fname + '  ' + lname + "  " + phonenum);

  	$("#CustomerInfor").html(fname + "\n" + lname + "\n" + phonenum);


  	
  	});


}


function userStatus()
	{
		//userId = firebase.auth().currentUser.uid;
		//RecUserId will switch to userId when the code is implemented
  		firebase.database().ref('/users/' + RecUserId).once("value").then(function(snapshot) {
  		var ordering = snapshot.child("ordering").val();
  		//console.log(userId);
  		console.log(ordering);
  		if (ordering === true) //////////////////this is supposed to be ordering === true
			{
				//on the money reciever's phone
				//RecUser(in this case)
				userType = "customer";
				//Get deliverer's info
				//RecUserId will switch to userId
				firebase.database().ref('/orders/' + RecUserId).once("value").then(function(deliverer) {
  					var delivererId = deliverer.val().deliverer;
  					console.log(delivererId);
  					getDelivererInfo(delivererId);
  				});
					

			}
		else
			{
				//on the deliverer's phone
				//DelUser (in this case)
				userType = "deliverer";
				//Get reciever's info
				//DelUserId will switch to userId
				firebase.database().ref('/deliverers/').once("value").then(function(deliverer) {
				//DelUserId will switch to userId
  					var recieverID = deliverer.child(DelUserId).val();
  					console.log(recieverID);
  					getRecieverInfo(recieverID);
  				});

			}
  });
}

userStatus();










