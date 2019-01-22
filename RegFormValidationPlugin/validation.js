$(function() {
    $("#b_Update").hide();
    var form = $( "#register_form" );
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function(element) {
          $(element)
            .closest('.form-group')
            .addClass('has-error');
        },
        unhighlight: function(element) {
          $(element)
            .closest('.form-group')
            .removeClass('has-error');
        },
        success: "valid"
    });
    $(form).validate({
        rules: {
            first_name: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            last_name: {
                required: true,
                nowhitespace: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true
            },
            birth_date: {
                required: true
            },
            phone_number: {
                required: true,
                digits: true
            },
            user_addr: {
                required: true
            },
            about_user: {
                required: true
            }

        },
        messages: {
            first_name: {
                required: 'Please enter firstname.',
                nowhitespace: 'firstname cannot contain any spaces.',
                lettersonly: 'firstname should only contain letters.'
            },
            last_name: {
                required: 'Please enter lastname. ',
                nowhitespace: 'lastname cannot contain any spaces.',
                lettersonly: 'lastname should only contain letters.'
            },
            email: {
                required: 'please enter an email address.',
                email: 'please enter a valid email address!'
            },
            birth_date: {
                required: 'please enter your date of birth. ',
            },
            phone_number: {
                required: 'please enter phone number. ',
            },
            user_addr: {
                required: 'please enter your address.'
            },
            about_user:{
                required: 'please write something about yourself.'
            }
        }        
    });
    $('#birth_date').datepicker({ dateFormat: 'dd/mm/yy' });

    var random_id = function  () 
	{
		var id_num = Math.random().toString(9).substr(2,3);
		var id_str = Math.random().toString(36).substr(2);
		
		return id_num + id_str;
	}

    $("#submit_btn").click(function() {
        if (form.valid() === true)
        {
            var tbl = '';
            var row_id = random_id();

            tbl += '<tr row_id="'+row_id+'">';
			tbl += '<td><div class="row_data" edit_type="click" col_name="first_name">'+$("#first_name").val()+'</div></td>';
			tbl += '<td><div class="row_data" edit_type="click" col_name="middle_name">'+$("#middle_name").val()+'</div></td>';
			tbl += '<td><div class="row_data" edit_type="click" col_name="last_name">'+$("#last_name").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="sex">'+$("#sex").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="country">'+$("#country").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="state">'+$("#state").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="city">'+$("#city").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="phone_number">'+$("#phone_number").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="birth_date">'+$("#birth_date").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="user_email">'+$("#user_email").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="user_addr">'+$("#user_addr").val()+'</div></td>';
            tbl += '<td><div class="row_data" edit_type="click" col_name="about_user">'+$("#about_user").val()+'</div></td>';
            tbl += '<td>'+'<input type="button" value="Edit" id="b_Edit"><input type="button" value="Delete" id="b_Del">'+'</td></tr>';
            $("#user_data").append(tbl);                                    //Appending the data into table 
            $("#register_form").trigger('reset')
        }
    });


});