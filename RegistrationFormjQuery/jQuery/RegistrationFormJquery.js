/**
* File Name  : RegFormScript
* File Path: C:\Users\mukeshg\Desktop\Internship\RegFormJquery
* Description : Validation of HTML form and Showing of data in table
* Created date : 18/01/2019
* @Author  : Mukesh
* Comments : First the validation is done and then only the data is passed into table
*/

$(document).ready(function()
{	
    //Declaring global variables to be used throughout the function
	var first_name = '';
	var user_sex = '';
	var country = '';
	var state = '';
	var city = '';
	var phone_number = '';
	var birth_date = '';
	var user_email = '';
	var user_qual = '';
	var user_addr = '';
	var about_user = '';
	var match = false;
	var phonearray = new Array();
	var emailarray = new Array();
    
    //Hiding table so that it isn't unnecessarily visible at the start
    $("#table_user").hide();

    //Hiding update button so that it isn't visible when it's not needed
    $("#b_Update").hide();

	//Error count to limit the form for submission incase validation fails
	var error_count = 0;
    
    //Hiding all Error messages so that it doesn't show up at the beginning
	$("#name_Error").hide();
	$("#country_Error").hide();
	$("#phone_Error").hide();
	$("#birth_date_Error").hide();
	$("#email_Error").hide();
	$("#user_addr_Error").hide();
	$("#about_user_Error").hide();
	
	//Dependent values of country>state>city starts here
	load_json_data('country','');
	function load_json_data(id, parent_id)
	{
		var html_code = '';
		$.getJSON('country_state_city.json', function(data)
		{
            html_code += '<option value="">Select '+id+'</option>';
			$.each(data, function(key, value) //All the country values is loaded in this function
			{
				if(id == 'country')
				{
					if(value.parent_id == '0')
					{
						html_code += '<option value="'+value.id+'">'+value.name+'</option>';
					}
				}
				else
				{
					if(value.parent_id == parent_id)
					{
						html_code += '<option value="'+value.id+'">'+value.name+'</option>';
					}
				}
			});
			$('#'+id).html(html_code);
		}); 
	}
	$(document).on('change', '#country', function()                                              //All the State values is loaded in this function
	{
		var country_id = $(this).val();
	    if(country_id != '')
	    {
	    	load_json_data('state', country_id);
	    }
	    else
	    {
	    	$('#state').html('<option value="">Select state</option>');
	    	$('#city').html('<option value="">Select city</option>');
	    }
	 });
	$(document).on('change', '#state', function()                                                //All the State value is loaded in this function
	{
		var state_id = $(this).val();
		if(state_id != '')
	    {
	    	load_json_data('city', state_id);
	    }
	    else
	    {
	    	$('#city').html('<option value="">Select city</option>');
	    }
	}); //Dependent values ends here
    
    //Different functions are called here on occurrance of different events
	$("#first_name").on('keyup keydown blur', function(event)
	{
    	check_name();                                                                            
	});
	
	$("#country #state #city").on('change blur', function(event)
	{
		check_country();                                                                         
	});
	
	$("#phone_number").on('keyup keydown blur', function(event)
	{
		check_phone();
	});
	
	$("#birth_date").on('keyup keydown blur', function(event)
	{
		check_birthdate();
	});
	
	$("#user_email").on('keyup keydown blur', function(event)
	{
		check_email();
	});
	
	$("#user_addr").on('keyup keydown blur', function(event)
	{
		check_addr();
	});
	
	$("#about_user").on('keyup keydown blur', function(event)
	{
		check_about();
	});
	
	$("#submit_btn").click(function()
	{
		show_result();
	});
    
    //Edit individual element on click event using contenteditable attribute
    $(document).on('click', '.row_data', function(event) 
    {
        event.preventDefault(); 

        if($(this).attr('edit_type') == 'button')
        {
            return false; 
        }

        //make div editable
        $(this).closest('div').attr('contenteditable', 'true');
        //add bg css
        $(this).addClass('bg-warning').css('padding','5px');

        $(this).focus();
    })	
	
	
	//Edit function to edit all the elements of table
	var _trEdit = null;
	$(document).on('click', '#b_Edit', function()
	{
		//fetches the value from the clicked row
     	_trEdit = $(this).closest('tr');
		var _name = $(_trEdit).find('td:eq(0)').text();
		var _sex = $(_trEdit).find('td:eq(1)').text();
		var _country = $(_trEdit).find('td:eq(2)').text();
		var _state = $(_trEdit).find('td:eq(3)').text();
		var _city = $(_trEdit).find('td:eq(4)').text();
		var _phone = $(_trEdit).find('td:eq(5)').text();
		var _dob = $(_trEdit).find('td:eq(6)').text();
		var _email = $(_trEdit).find('td:eq(7)').text();
		var _addr = $(_trEdit).find('td:eq(8)').text();
		var _about = $(_trEdit).find('td:eq(9)').text();
		
		//sends the value back to form from table
		$("#first_name").val(_name);
		$("#sex").val(_sex);
		$("#country").val(_country);
		$("#state").val(_state);
		$("#city").val(_city);
		$("#phone_number").val(_phone);
		$("#birth_date").val(_dob);
		$("#user_email").val(_email);
		$("#user_addr").val(_addr);
		$("#about_user").val(_about);
        document.documentElement.scrollTop = 0;
        
        //Update and Reset button shown as required during updation while submit button is hidden as it isn't required
        $("#b_Update").show();
		$('#submit_btn').hide();
		$("#reset_btn").show();
	});

	//Updates the value in table
	$(document).on('click', '#b_Update', function() 
	{
        var row_id = random_id();
		var _name    = '<div class="row_data" edit_type="click" col_name="first_name">'+$("#first_name").val()+'</div>';	
        var _sex     = '<div class="row_data" edit_type="click" col_name="sex">'+$("#sex").val()+'</div>';
        var _country = '<div class="row_data" edit_type="click" col_name="country">'+$("#country").val()+'</div>';
        var _state   = '<div class="row_data" edit_type="click" col_name="state">'+$("#state").val()+'</div>';
        var _city    = '<div class="row_data" edit_type="click" col_name="city">'+$("#city").val()+'</div>';
        var _phone   = '<div class="row_data" edit_type="click" col_name="phone_number">'+$("#phone_number").val()+'</div>';
        var _dob     = '<div class="row_data" edit_type="click" col_name="birth_date">'+$("#birth_date").val()+'</div>';
        var _email   = '<div class="row_data" edit_type="click" col_name="user_email">'+$("#user_email").val()+'</div>';
        var _addr    = '<div class="row_data" edit_type="click" col_name="user_addr">'+$("#user_addr").val()+'</div>';
        var _about   = '<div class="row_data" edit_type="click" col_name="user_addr">'+$("#user_addr").val()+'</div>';
		
		$(_trEdit).find('td:eq(0)').html(_name);
		$(_trEdit).find('td:eq(1)').html(_sex);
		$(_trEdit).find('td:eq(2)').html(_country);
		$(_trEdit).find('td:eq(3)').html(_state);
		$(_trEdit).find('td:eq(4)').html(_city);
		$(_trEdit).find('td:eq(5)').html(_phone);
		$(_trEdit).find('td:eq(6)').html(_dob);
		$(_trEdit).find('td:eq(7)').html(_email);
		$(_trEdit).find('td:eq(8)').html(_addr);
		$(_trEdit).find('td:eq(9)').html(_about);
		
		phonearray.push(_phone);
		emailarray.push(_email);
		_trEdit = null;
        document.documentElement.scrollTop = 0;
        
        //Register form is reset, update button is hidden as the update is complete and isn't required while submit and reset button is visible so as to submit next entry
		$("#register_form").trigger('reset');
		$("#b_Update").hide();
		$('#submit_btn').show();
		$("#reset_btn").show();
	});
	
	//delete function to delete an entire row from the table
	$(document).on('click', '#b_Del', function()
	{
    	$(this).closest('tr').remove();
    });
    
    //function to generate random id so that the generated id can be used to assign dynamic id to rows of the table
    var random_id = function  () 
	{
		var id_num = Math.random().toString(9).substr(2,3);
		var id_str = Math.random().toString(36).substr(2);
		
		return id_num + id_str;
	}
    
    //function to check name
	function check_name()
	{
		first_name = $("#first_name").val();
		if(first_name.length === 0) 
		{
			$("#name_Error").html("Enter your fullname");
			$("#name_Error").show();
			error_count = 1;
		} 
		else 
		{
			$("#name_Error").hide();
		}
	}
    
    //function to check country, state and city
	function check_country(){
		country = $("#country").val();
		state = $("#state").val();
		city = $("#city").val();
		if (country === '' || state === '' || city === '')
		{
			$("#country_Error").html("Select your Country, State and City.");
			$("#country_Error").show();
			error_count = 1;
		}
		else
		{
			$("#country_Error").hide();
		}
    }
    
    //function to check phone number
	function check_phone()
	{
		phone_number = $("#phone_number").val();
		if (phone_number.length != 10){
			$("#phone_Error").html("Enter a valid number.");
			$("#phone_Error").show();
			error_count = 1;
		}
		else 
		{
			$("#phone_Error").hide();
		}
	}
    
    //function to check date of birth
	function check_birthdate()
	{
		birth_date = $("#birth_date").val();
		if (birth_date === '')
		{
			$("#birth_date_Error").html("Enter valid date of birth.");
			$("#birth_date_Error").show();
			error_count = 0;
		} 
		else
		{
			$("#birth_date_Error").hide();
		}
	}
	
	//function to check email address
	function check_email()
	{
		user_email = $("#user_email").val();
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(user_email))
		{
			$("#email_Error").html("Enter valid email address.");
			$("#email_Error").show();
			error_count = 1;
		}
		else
		{
			$("#email_Error").hide();
		}
	}
    
    //function to check address
	function check_addr()
	{
		user_addr = $("#user_addr").val();
		if (user_addr.length === 0)
		{
			$("#user_addr_Error").html("Enter your address.");
			$("#user_addr_Error").show();
			error_count = 1;
		}
		else 
		{
			$("#user_addr_Error").hide();
		}
	}
    
    //function to check about yourself entry
	function check_about()
	{
		about_user = $("#about_user").val();
		if (about_user.length === 0)
		{
			$("#about_user_Error").html("Write something about yourself.");
			$("#about_user_Error").show();
			error_count = 1;
		}
		else
		{
			$("#about_user_Error").hide();
		}
	}
    
    //function to check duplicate entry
	function check_match()
	{
		if ($.inArray(phone_number, phonearray) != '-1' || $.inArray(user_email, emailarray) != '-1')
		{
			match = true;
		}
	}

	//function to display result in a table
	function show_result()
	{
		error_count = 0;
		match = false;	
		check_name();
		check_country();
		check_phone();
		check_addr();
		check_email();
		check_about();
        check_match();
        var tbl = '';
        var row_id = random_id();
		if (error_count === 0)                                                  //error_count 0 means all the data are validated successfully
		{
			if (match === false)                                                //match false signifies that there is no duplicate entry 
			{
				phonearray.push(phone_number);
                emailarray.push(user_email);
                //Appending data received from form in a variable
		    	tbl += '<tr row_id="'+row_id+'">';
                tbl += '<td><div class="row_data" edit_type="click" col_name="first_name">'+first_name+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="sex">'+$("#sex").val()+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="country">'+country+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="state">'+state+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="city">'+city+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="phone_number">'+phone_number+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="birth_date">'+birth_date+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="user_email">'+user_email+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="user_addr">'+user_addr+'</div></td>';
                tbl += '<td><div class="row_data" edit_type="click" col_name="about_user">'+about_user+'</div></td>';
                tbl += '<td>'+'<input type="button" value="Edit" id="b_Edit"><input type="button" value="Delete" id="b_Del">'+'</td></tr>';
                $("#user_data").append(tbl);                                    //Appending the data into table 
                $("#register_form").trigger('reset');
                document.documentElement.scrollTop = 0;
                $("#table_user").show();			
		    }
			else
			{
				alert('Registration failed. User exits');}                      //User is alerted if there is an duplicate entry and hence the submit operation isn't carried out
			}
		else 
		{
            alert('Fill out all the mandotary field.');                         //User is alerted if the user hasn't entered all the valid data and hence the submit operation isn't carried out
            document.documentElement.scrollTop = 0;	
		}
	}	
});
