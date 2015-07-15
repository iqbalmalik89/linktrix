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
</head>
<body>

<div class="container login-bg">

<form action="http://198.154.230.250/marketplace/atom/index.html" class="login-form-signin">
  <div class="login-logo"><img src="shared_images/logo.png"></div>
    <h2 class="login-form-signin-heading">Enter New Password</h2>
        <div class="login-wrap">
        <div class="notification-bar" id="msg"></div>


    <div id="logindiv">        
            <input type="password" autofocus placeholder="New Password" id="password" class="form-control">
            <input type="password" placeholder="Confirm New Password" id="confirm_password" class="form-control">
            <input type="hidden" id="user_code" value="<?php if(isset($_GET['code'])) echo  $_GET['code']; ?> ">
            <button type="button" id="reset_password_button" class="btn btn-lg btn-primary btn-block">Reset Password</button>
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