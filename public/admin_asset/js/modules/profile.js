// Event Binding
$( document ).ready(function() {
  $( "#update_profile_button" ).click(function() {
    updateProfile();
  });

  $( "#update_password_btn" ).click(function() {
    updatePassword();
  });

  // $("#email, #password").keypress(function(e) {
  //     if(e.which == 13) {
  //       loginUser();
  //     }
  // });

});

function updatePassword()
{
  var currentPassword = $.trim($('#current_password').val());  
  var newPassword = $.trim($('#new_password').val());
  var newCpassword = $.trim($('#new_cpassword').val());
  var check = true;

  if(currentPassword == '')
  {
    $('#current_password').addClass('error-class').focus();
    check = false;
  }  

  if(newPassword == '')
  {
    $('#new_password').addClass('error-class').focus();
    check = false;
  }

  if(newCpassword == '')
  {
    $('#new_cpassword').addClass('error-class').focus();
    check = false;
  }

  if(newCpassword != '' && newPassword != '' && (newPassword != newCpassword))
  {
    $('#new_cpassword, #new_password').addClass('error-class');
    $('#new_password').focus();    
    check = false;
  }

  if(check)
  {
    $.ajax({
      type: 'POST',
      url: apiUrl + 'password',
      data: { current_password: currentPassword, new_password:newPassword, new_cpassword:newCpassword },
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          showMsg('#update_password_msg', data.message, 'green');
        }
        else
        {
          showMsg('#update_password_msg', data.message, 'red');  
        }

      },
      error:function(){

      }    
    });    
  }
}

function updateProfile()
{
  var name = $.trim($('#name').val());
  var email = $.trim($('#email').val());    
  var contactNumber = $.trim($('#contact_number').val());      
  var picPath = $.trim($('#pic_path').val());      
  var check = true;

  if(name == '')
  {
    $('#name').addClass('error-class').focus();
    check = false;
  }

  if(email == '')
  {
    $('#email').addClass('error-class');
    if(check)
      $('#email').focus();
    check = false;
  }

  if(contactNumber == '')
  {
    $('#contact_number').addClass('error-class');
    if(check)
      $('#contact_number').focus();
    check = false;
  }

  if(check)
  {
    $.ajax({
      type: 'POST',
      url: apiUrl + 'profile',
      data: { name:name, email:email, contact_number: contactNumber, pic_path:picPath },
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          showMsg('#update_msg', data.message, 'green');
          $('.profile_picture').attr('src', data.url);
          $('.user_name_span').html(name);
          $('.user_email_span').html(email);
        }
        else
        {
          showMsg('#update_msg', data.message, 'red');  
        }

      },
      error:function(){

      }
    });    
  }
}