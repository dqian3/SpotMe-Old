var key = "b438629de3e45a73dfa48015313dc324";
var baseurl = "http://api.reimaginebanking.com"

function register_customer(customer_info) {
	document.write(JSON.stringify(customer_info));
	
	$.ajax({
	    url: baseurl + "/customers?key=" + key,
	    type: 'POST',
	    data: JSON.stringify(customer_info),
	    dataType: 'json',
	    contentType:"application/json",
	    success: function (data) {
			store_cust_id(data);

		}
    });
}

function create_account(id) {
	// This is arbitrary
	var request = {
		type: "Credit Card",
		nickname: "SpotMe",
		rewards: 0,
		balance: 100
	}
	var url = baseurl + "/customers/" + id + "/accounts?key=" + key;

	$.ajax({
	    url: url,
	    type: 'POST',
	    data: JSON.stringify(request),
	    dataType: 'json',
	    contentType:"application/json",
	    success: function (data) {
			store_acc_id(data);
		}
    });

}

function transfer(to, from, amount) {
	// This is arbitrary
	var request = {
		medium: "balance",
		payee_id: to,
		amount: amount,
		description: "SpotMe"	
	}
	var url = baseurl + "/accounts/" + from + "/transfers?key=" + key;

	$.ajax({
	    url: url,
	    type: 'POST',
	    data: JSON.stringify(request),
	    dataType: 'json',
	    contentType:"application/json",
	    success: function (data) {
		}
    });	

}