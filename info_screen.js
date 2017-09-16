var config = {
    apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
    authDomain: "spotme-a2502.firebaseapp.com",
    databaseURL: "https://spotme-a2502.firebaseio.com",
    projectId: "spotme-a2502",
    storageBucket: "spotme-a2502.appspot.com",
    messagingSenderId: "1041315357650"
  };

var userId;
var otherId;
var userType;

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	  userStatus(user.uid);  // User is signed in.
  }
});


function getRecieverInfo(rId)
{
   console.log (rId);
   firebase.database().ref('/users/' + rId).once("value").then(function(snapshot) 
   {
  	var fname = snapshot.child("personal_info/first_name").val();
  	var lname = snapshot.child("personal_info/last_name").val();
  	var phonenum = snapshot.child("personal_info/phonenumber").val();

  	console.log("#2  " + fname +  " " + lname + "  " + phonenum);

  	$("#name").html(fname + " " + lname); 
  	$("#call").attr("href", "tel:"+phonenum);
  	$("#text").attr("href", "sms:"+phonenum);
  });
}

function getDelivererInfo(dId)
{
   console.log(dId);
   firebase.database().ref('/users/' + dId).once("value").then(function(snapshot)  {
  		var fname = snapshot.child("personal_info/first_name").val();
  		var lname = snapshot.child("personal_info/last_name").val();
  		var phonenum = snapshot.child("personal_info/phonenumber").val();
  		
  	  	console.log("#1  " + fname + '  ' + lname + "  " + phonenum);

	  	$("#name").html(fname + " " + lname); 
	  	$("#call").attr("href", "tel:"+phonenum);
	  	$("#text").attr("href", "sms:"+phonenum);
  	});
}


function userStatus(id) {
	userId = id;
	firebase.database().ref('/users/' + userId).once("value").then(function(snapshot) {
  		var ordering = snapshot.child("ordering").val();
   		console.log(ordering);

  		if (ordering) {
  			//on the money reciever's phone
			$("#info").hide(); 
			$("#pending").show();
  			userType = "customer";

  			firebase.database().ref('/orders/' + userId).on("value", function(order) {
  				if(order.child("started").val()) {
  					$("#info").show();
  					$("#pending").hide();
  					var delivererId = order.val().deliverer;
  					otherId = delivererId;
					getDelivererInfo(delivererId);
					firebase.database().ref('/orders/' + userId).off();
  				}

  			});

		}
		else
		{
			$("#info").show();
			$("#pending").hide();

			//on the deliverer's phone
			//DelUser (in this case)
			userType = "deliverer";
			//Get reciever's info
			//DelUserId will switch to userId
			firebase.database().ref('/deliverers/').once("value").then(function(deliverer) {
				var recieverID = deliverer.child(userId).val();
				console.log("Receiver:" + recieverID);
				getRecieverInfo(recieverID);
			});;
		}
  });
}

function confirmedExchange() {
	if (userType == "customer") {
		firebase.database().ref('/orders/' + userId).update({recConfirm:true});
		firebase.database().ref('/orders/' + userId).on("value", function(order) {
			console.log(order.child("delConfirm").val());
			if(order.child("delConfirm").val()) {
				alert("confirmed");
			}
		});
	}
	if (userType == "deliverer") {
		firebase.database().ref('/deliverers/').once("value").then(function(deliverer) {
			firebase.database().ref('/orders/' + deliverer.val()[userId]).update({delConfirm:true});
			firebase.database().ref('/orders/' + deliverer.val()[userId]).on("value", function(order) {
				if(order.child("recConfirm").val()) {
					alert("confirmed");
				}
			});
		});
	}
}  









