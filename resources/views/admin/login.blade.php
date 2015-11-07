<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
<link href="admin_asset/bs3/css/bootstrap.min.css" rel="stylesheet">
<link href="admin_asset/css/style-responsive.css" rel="stylesheet">
<link href="admin_asset/css/atom-style.css" rel="stylesheet">
<link href="admin_asset/css/font-awesome.min.css" rel="stylesheet">
<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'> -->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="admin_asset/js/jquery-1.10.2.js"></script> 
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="config.js"></script>
<script src="admin_asset/js/modules/auth.js"></script>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
<script type="text/javascript">
$( document ).ready(function() {
    // $( ".btn-primary" ).click(function(obj) {
    //     $(this).css('background-color','#606060');
    //     $(this).removeAttr('onclick');
    // });
});    
</script>

</head>
<body>

<div class="container login-bg">

<form action="http://198.154.230.250/marketplace/atom/index.html" class="login-form-signin">
  <div class="login-logo"><img src="shared_images/logo.png"></div>
    <h2 class="login-form-signin-heading">Login Your Account</h2>
        <div class="login-wrap">
        <div class="notification-bar" id="msg"></div>


    <div id="logindiv">        
            <input type="text" autofocus placeholder="Email" id="user_email" class="form-control">
            <input type="password" placeholder="Password" id="user_password" class="form-control">
            <label class="checkbox">
                <input type="checkbox" id="remember_me" value="1"> Remember me
                <span class="pull-right">
                    <a href="javascript:void(0);" onclick="showForgot()" data-toggle="modal"> Forgot Password?</a>

                </span>
            </label>
            <button type="button" style="width:40%; margin-left:59%;" id="user_login_button" class="btn btn-lg btn-primary btn-block">Sign in</button>
            <img id="login_spinner" src="shared_images/spinner.gif" style="position:absolute;left:48.5%;top:55%;display:none;">
    </div>          



    <div id="forgotdiv" style="display:none;">        
            <input type="text" autofocus placeholder="Email" id="forgot_email" class="form-control">
            <label class="checkbox">
                <span class="pull-right">
                    <a href="javascript:void(0);" onclick="hideForgot();"> Back</a>

                </span>
            </label>
            <button type="button" style="width:45%; margin-left:59%;" id="user_forgot_button" class="btn btn-lg btn-primary btn-block">Forgot Password</button>
            <img id="forgot_spinner" src="shared_images/spinner.gif" style="position:absolute;left:48.5%;top:48.5%;display:none;">

    </div> 

            
<!--             <div class="registration">
                Don't have an account yet?
                <a href="index.html">Create an account</a>
            </div> -->

        </div>



      </form>

    </div>



</body>
</html>