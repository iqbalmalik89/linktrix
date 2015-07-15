// Event Binding
$( document ).ready(function() {
  $( "#user_login_button" ).click(function() {
    loginUser();
  });

  $( "#user_forgot_button" ).click(function() {
    forgotPassword();
  });

  $( "#reset_password_button" ).click(function() {
    resetPassword();
  });


  $("#email, #password").keypress(function(e) {
      if(e.which == 13) {
        loginUser();
      }
  });

});

function resetPassword()
{
  var password = $.trim($('#password').val());
  var confirmPassword = $.trim($('#confirm_password').val());  
  var userCode = $.trim($('#user_code').val());  
  var check = true;

  if(password == '')
  {
    $('#password').addClass('error-class').focus();
    check = false;
  }    

  if(confirmPassword == '')
  {
    $('#confirm_password').addClass('error-class').focus();
    check = false;
  }    

  if(password != '' && confirmPassword != '')
  {
    if(password != confirmPassword)
    {
      $('#password').addClass('error-class').focus();
      $('#confirm_password').addClass('error-class').focus();
      check = false;
    }
  }

  if(check)
  {
    $.ajax({
      type: 'POST',
      url: apiUrl + 'reset_password',
      data: { password: password, user_code: userCode},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          showMsg('#msg', 'Password reset successfully. Redirecting...', 'green');
          setTimeout(function(){ 
              window.location = 'login';
           }, 3000);
        }
        else
        {
          showMsg('#msg', 'User code already used', 'red');
        }

      },
      error:function(){

      }
    });        
  }

}

function showForgot()
{
  $('#logindiv').hide();
  $('#forgotdiv').fadeIn();  
}

function hideForgot()
{
  $('#forgotdiv').hide();
  $('#logindiv').fadeIn();  
}

function forgotPassword()
{
  var email = $.trim($('#forgot_email').val());
  var check = true;
  if(email == '')
  {
    $('#forgot_email').addClass('error-class').focus();
    check = false;
  }  

  if(check)
  {
    $.ajax({
      type: 'POST',
      url: apiUrl + 'forgot',
      data: { email: email, },
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          showMsg('#msg', 'An email is sent to you. Please check email', 'green');
        }
        else
        {
          showMsg('#msg', 'This email is not associated with any user', 'red');
        }

      },
      error:function(){

      }
    });        
  }
}

function loginUser()
{
  var userEmail = $.trim($('#user_email').val());
  var userPassword = $.trim($('#user_password').val());    
  var check = true;

  if(userEmail == '')
  {
    $('#user_email').addClass('error-class').focus();
    check = false;
  }

  if(userPassword == '')
  {
    $('#user_password').addClass('error-class');
    if(check)
      $('#user_password').focus();
    check = false;
  }

  if(check)
  {
    $.ajax({
      type: 'POST',
      url: apiUrl + 'login',
      data: { email: userEmail, password: userPassword },
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          showMsg('#msg', 'You loggedin successfully. Redirecting...', 'green');
          window.location = 'dashboard';
        }
        else
        {
          showMsg('#msg', data.message, 'red');                    
        }

      },
      error:function(){

      }
    });    
  }
}