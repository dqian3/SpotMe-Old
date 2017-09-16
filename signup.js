function uploadData(cust_data)
{
	// Gives firebase all the data
}
function store_cust_id()
{

}

function store_acc_id()
{

}

function grabData()
{
	var data = {
		first_name: $("fname").val();
		last_name: $("lname").val();
		address:
		{
			street_number: $("stnum").val();
			street_name: $("stname").val();
			city: $("city").val();
			state: $("state").val();
			zip: $("zip").val();
		}
	}

	uploadData(data);
}