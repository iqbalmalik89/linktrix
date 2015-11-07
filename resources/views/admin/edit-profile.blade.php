<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')
  <script src="admin_asset/js/modules/profile.js"></script> 
<style type="text/css">
input[type='file'] {
  color: transparent;
}  

</style>
</head>
<body>
<!--layout-container start-->
<div id="layout-container"> 
  <!--Left navbar start-->
  @include('admin.partials.left')  
  
  <!--main start-->
  <div id="main">
  @include('admin.partials.nav')

    <div class="margin-container">
      <div class="scrollable wrapper">
        <div class="row">
          <div class="col-md-12">
            <div class="page-heading">
              <h1>Edit Profile </h1>
            </div>
          </div>
        </div>

        
        
        
        
        <div class="row">
                  <div class="profile-nav col-lg-3">
                      <div class="panel">
                          <div class="user-heading round">
                              <a href="#">
                              <img class="profile_picture" src="{{$user['url']}}" alt=""> </a>
                              <h1 class="user_name_span">{{$user['name']}}</h1>
                              <p class="user_email_span">{{$user['email']}}</p>
                        </div>

                          <ul class="nav nav-pills nav-stacked">
                              <li class="active"><a href="#"> <i class="icon-edit"></i> Edit profile</a></li>                              
                          </ul>

                      </div>
                  </div>
                  <div class="profile-info col-lg-9">
                      <div class="panel">
                          <div class="panel-body bio-graph-info">
                              <h1> Profile Info</h1>
                      
                              <div class="notification-bar" id="update_msg"></div>

                              <form role="form" class="form-horizontal">
                                  <div class="form-group">
                                      <label class="col-lg-2 control-label">Role</label>
                                      <div class="col-lg-6" style="margin-top:5px;">
                                      <?php echo ucfirst($user['role']['type']);?>
                                      <input type="hidden" id="hidden_role_id" value="<?php echo $user['role']['id'];?>">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-lg-2 control-label">Name</label>
                                      <div class="col-lg-6">
                                          <input type="text" placeholder=" " id="name" class="form-control" value="{{$user['name']}}">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-lg-2 control-label">Email</label>
                                      <div class="col-lg-6">
                                          <input type="text" placeholder=" " <?php if($user['role']['id'] != 1) echo 'disabled="disabled"'; ?> id="email" class="form-control" value="{{$user['email']}}">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-lg-2 control-label">Contact Number</label>
                                      <div class="col-lg-6">
                                          <input type="text" placeholder=" " id="contact_number" class="form-control" value="{{$user['contact_number']}}">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label class="col-lg-2 control-label">Change Avatar</label>
                                      <div class="col-lg-6">
                                      <input type="file" id="profile_pic" name="profile_pic" data-url="api/pic_upload" class="file-pos">
                                      <table>
                                      <td><td>
                                      <img src="{{$user['url']}}" id="temp_pic" width="50" height="50"></td>
                                      <td>
                                        <img id="image_spinner" src="shared_images/spinner.gif" style="display:none;">
                                      </td></td></table>
                                      <input type="hidden" value="{{$user['pic']}}" id="pic_path">


                                      </div>

                                  </div>

                                  <div class="form-group">
                                      <div class="col-lg-offset-2 col-lg-10">
                                          <button class="btn btn-primary" type="button" id="update_profile_button">Save</button>
                                          <button class="btn btn-default" type="button">Cancel</button>
                                          <img id="profile_spinner" src="shared_images/spinner.gif" style="display:none;">

                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                      <div>
                          <div class="box-info">
                              <h2> Set New Password</h2>
                              <div class="notification-bar" id="update_password_msg"></div>

                              <div class="panel-body">
                                  <form role="form" class="form-horizontal">
                                      <div class="form-group">
                                          <label class="col-lg-2 control-label">Current Password</label>
                                          <div class="col-lg-6">
                                              <input type="password" placeholder=" " id="current_password" class="form-control">
                                          </div>
                                      </div>
                                      <div class="form-group">
                                          <label class="col-lg-2 control-label">New Password</label>
                                          <div class="col-lg-6">
                                              <input type="password" placeholder=" " id="new_password" class="form-control">
                                          </div>
                                      </div>
                                      <div class="form-group">
                                          <label class="col-lg-2 control-label">Re-type New Password</label>
                                          <div class="col-lg-6">
                                              <input type="password" placeholder=" " id="new_cpassword" class="form-control">
                                          </div>
                                      </div>

                                      <div class="form-group">
                                          <div class="col-lg-offset-2 col-lg-10">
                                              <button class="btn btn-primary" id="update_password_btn" type="button">Save</button>
                                              <button class="btn btn-default" type="button">Cancel</button>
                                              <img id="password_spinner" src="shared_images/spinner.gif" style="display:none;">
                                          </div>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        
        
        
        
        
        
      </div>
    </div>
  </div>






</div><!--layout-container end--> 

<script>
$('#profile_pic').fileupload({
  dataType: 'json',
  done: function (e, data) {
    $('#image_spinner').hide();    
    $('#pic_path').val(data.result.file_name);
    $('#temp_pic').attr('src',data.result.url);
  },
    send: function (e, data) {
      $('#image_spinner').show();
    }          
});
</script>

</body>
</html>