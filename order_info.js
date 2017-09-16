function uploadData(order_data)
{
	// Gives firebase all the data
}

function grabData()
{
	var order = {
		amount_needed: $(#"amt_needed").val(),
		max_dist: $(#"max_dist_away").val(),
	}
	
	uploadData(order);
}