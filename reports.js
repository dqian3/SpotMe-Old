var config = {
    apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
    authDomain: "spotme-a2502.firebaseapp.com",
    databaseURL: "https://spotme-a2502.firebaseio.com",
    projectId: "spotme-a2502",
    storageBucket: "spotme-a2502.appspot.com",
    messagingSenderId: "1041315357650"
  };
  firebase.initializeApp(config);


var userId= "4HRB2yLjjCbeeKQmMfodjIFSBc12"; ///these will change with implementation
var reportedId= "SwUOBxSqBqgyYH4znoH23BbE8px1";//////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function fileReport(id_of_reported, id_of_reporter)
{
	console.log("im in");
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
	firebase.database().ref('/orders/' + userId).once("value").then(function(deliverer) {
  		var delivererId = deliverer.val().deliverer;
  		//delivererId, in this case, is the person being reported
  		console.log(delivererId);
		
		firebase.database().ref('/deliverers/').once("value").then(function(deliverer) {
  			var recieverID = deliverer.child(reportedId).val();
  			//recieverId is the person reporting
  			console.log(recieverID);
  			fileReport(delivererId, recieverID);
  		});
  	});
	window.location.href = "main.html";  	

}

//getInfo(); ///remember to comment this out







