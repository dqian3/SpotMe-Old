var config = {
    apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
    authDomain: "spotme-a2502.firebaseapp.com",
    databaseURL: "https://spotme-a2502.firebaseio.com",
    projectId: "spotme-a2502",
    storageBucket: "spotme-a2502.appspot.com",
    messagingSenderId: "1041315357650"
  };

var userId;
var userType;

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	  userStatus(user.uid);  // User is signed in.
  }
});


function getRecieverInfo(rId, myId)
{
   console.log (rId);
   firebase.database().ref('/users/' + rId).once("value").then(function(snapshot) 
   {
  	var fname = snapshot.child("personal_info/first_name").val();
  	var lname = snapshot.child("personal_info/last_name").val();
  	var phonenum = snapshot.child("personal_info/phonenumber").val();

  	console.log("#2  " + fname +  " " + lname + "  " + phonenum);

  	$(".customer").each(function() {
        $( this ).html(fname + " " + lname);
    });
    getMyInfo(myId, false); 
    getPrice(rId)
  });
}

function getDelivererInfo(dId, myId)
{
   console.log(dId);
   firebase.database().ref('/users/' + dId).once("value").then(function(snapshot)  {
  		var fname = snapshot.child("personal_info/first_name").val();
  		var lname = snapshot.child("personal_info/last_name").val();
  		var phonenum = snapshot.child("personal_info/phonenumber").val();
  		
  	  	console.log("#1  " + fname + '  ' + lname + "  " + phonenum);

	  	$(".deliverer").each(function() {
        $( this ).html(fname + " " + lname);
      }); 
      getMyInfo(myId, true); 
  	});
}

function getMyInfo(myId, customer)
{
  console.log (myId);
   firebase.database().ref('/users/' + myId).once("value").then(function(snapshot) 
   {
    var fname = snapshot.child("personal_info/first_name").val();
    var lname = snapshot.child("personal_info/last_name").val();
    var phonenum = snapshot.child("personal_info/phonenumber").val();

    if (customer == true){
      //Current user is the customer
      console.log("#2  " + fname +  " " + lname + "  " + phonenum);

      $(".customer").each(function() {
          $( this ).html(fname + " " + lname);
      });
      getPrice(myId)
    }
    else{
      //Current user is the deliverer of cash
      console.log("#2  " + fname +  " " + lname + "  " + phonenum);

      $(".deliverer").each(function() {
        $( this ).html(fname + " " + lname);
      }); 

    }
    
    $("#receiptcontainer").show();
    $("#pending").hide();
  });
}


function userStatus(id) {
	userId = id;
	firebase.database().ref('/users/' + userId).once("value").then(function(snapshot) {
  		var ordering = snapshot.child("ordering").val();
   		console.log(ordering);

  		if (ordering) {
  			//on the money reciever's phone
  			userType = "customer";
  			firebase.database().ref('/orders/' + userId).on("value", function(order) {
  				if(order.child("started").val()) {
  					$("#info").show();
  					$("#pending").hide();
  					var delivererId = order.val().deliverer;
					getDelivererInfo(delivererId, userId);
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
			//DelUserId will switch to userId
					var recieverID = deliverer.child(userId).val();
					console.log("Receiver:" + recieverID);
					getRecieverInfo(recieverID, myId);
			});;
		}
  });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPrice(id){
   firebase.database().ref('/orders/' + id).once("value").then(function(snapshot)  {
    console.log(id)
      var price = snapshot.child("amount_needed").val();
      console.log("Price is  " + price);
      $("#cashPrice").html(numberWithCommas(price));
      $("#bankTransferPrice").html(numberWithCommas(Number(price)+1));
    });
}