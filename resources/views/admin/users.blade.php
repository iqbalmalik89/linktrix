<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')
<script src="admin_asset/js/modules/user.js"></script>
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


    <!--margin-container start-->
    <div class="margin-container">


    <!--scrollable wrapper start-->
      <div class="scrollable wrapper">
      <!--row start-->
        <div class="row">
         <!--col-md-12 start-->
          <div class="col-md-12">
            <div class="page-heading">

              <h1>Users 
              <?php if($role['type'] == 'admin'){ ?>
              <button type="button" data-toggle="modal" data-target="#adduserPopup" id="addUserPopupButton" class="btn btn-primary">Add User</button>
              <?php } ?>
                </h1>
          <div class="notification-bar" id="user_msg"></div>

<div class="tab-container">
              <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#admin">Admins</a></li>
                <li><a data-toggle="tab" href="#supervisor">Supervisors</a></li>
                <li><a data-toggle="tab" href="#consultant">Consultants</a></li>
                <li><a data-toggle="tab" href="#asistant">Assistant</a></li>
              </ul>
              <div class="tab-content">

                <div id="admin" class="tab-pane active cont" style="height:100%;">
                  <h3>Admins</h3>

                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th class="action_links" style="display:none;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="body1">
     
                    </tbody>
                  </table>
                  <div id="pagination1" align="center"></div>
                </div>


                <div id="supervisor" class="tab-pane cont" style="height:100%;">
                  <h3>Supervisors</h3>
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th class="action_links" style="display:none;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="body2">
     
                    </tbody>
                  </table>
                  <div id="pagination2" align="center"></div>
                </div>


                <div id="consultant" class="tab-pane cont" style="height:100%;">
                  <h3>Consultants</h3>
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th class="action_links" style="display:none;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="body3">
     
                    </tbody>
                  </table>
                  <div id="pagination3" align="center"></div>
                </div>

                <div id="asistant" class="tab-pane cont" style="height:100%;">
                  <h3>Assistants</h3>
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th class="action_links" style="display:none;">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="body4">
     
                    </tbody>
                  </table>
                  <div id="pagination4" align="center"></div>
                </div>












              </div>
            </div>

            </div>
          </div>
          
        </div><!--row end-->

        

      </div><!--scrollable wrapper end--> 
    </div><!--margin-container end--> 
  </div><!--main end--> 
</div><!--layout-container end--> 

<script>
$( document ).ready(function() {
  getAllTypeUsers();
});

</script>



   <div id="candidate_exists_popup" class="modal fade" style="z-index:99999!important;">
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- dialog body -->



      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">ERROR</h4>
      </div>
  
      <div class="modal-body" style="overflow-y:scroll;">
      <p>
      <b> This user is creator of following candidates. Assign these candidates to other users. </b>
      </p>
      <div id="candidate_exists_popup_body" style="height:400px !important;"></div>
      </div>
      
      <!-- dialog buttons -->
      <div class="modal-footer">

      <button type="button" data-dismiss="modal" class="btn">Cancel</button>
 
      </div>
    </div>
  </div>
</div>




<div class="modal fade" id="adduserPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<input type="hidden" id="user_id" value="">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="popupLabel"></h4>
            </div>
            <div class="modal-body">
                <form role="form" class="form-horizontal">
                  <div class="notification-bar" id="email_msg"></div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name"> Role </label>
                        <div class="col-lg-6">
                          <select id="role_id">
                          <option value="1">Admin</option>
                          <option value="2">Supervisor</option>                          
                          <option value="3">Consultant</option>                          
                          <option value="4">Assistant</option>
                          </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name"> Name :</label>
                        <div class="col-lg-6">
                            <input type="text" id="user_name" class="form-control">
                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name"> Email :</label>
                        <div class="col-lg-6">
                            <input type="text" id="email" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name"> Contact Number :</label>
                        <div class="col-lg-6">
                            <input type="text" id="contact_number" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name">Picture :</label>
                        <div class="col-lg-6">
                          <input type="file" id="profile_pic" name="profile_pic" data-url="api/pic_upload" class="file-pos">
                          <table><tr><td>
                            <img src="admin_asset/images/avatar.jpg" id="temp_pic" width="50" height="50">
                            </td><td><img src="shared_images/spinner.gif" id="user_pic_spinner" style="display:none;"></td></tr></table>
                          <input type="hidden" value="" id="pic_path">
                        </div>
                    </div>


                </form>
            </div>      
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" id="addUpdateUserButton" class="btn btn-primary"> Save </button>
                <img id="user_add_spinner" style="display:none;" src="shared_images/spinner.gif">
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="consultantsPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content" style="width:740px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">Manage Consultants</h4>
            </div>
            <div class="modal-body">
                <form role="form" class="form-horizontal">
                  <div class="notification-bar" id="consultant_msg"></div>

                  <div id="manage_consultants_container" class="row">

                  </div>

                </form>
            </div>      <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" id="addConsultantsButton" class="btn btn-primary"> Save </button>
                <img id="consultant_spinner" style="display:none;" src="shared_images/spinner.gif">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
<?php
    $user = \Session::get('user');
    $GlobalUserId = $user['id'];
?>
var globalRole = "<?php echo $role['type'];?>";
var GlobalUserId = "<?php echo $GlobalUserId;?>";

$('#profile_pic').fileupload({
  dataType: 'json',
  done: function (e, data) {
    $('#user_pic_spinner').hide();
    $('#pic_path').val(data.result.file_name);
    $('#temp_pic').attr('src',data.result.url);
  },
    send: function (e, data) {
      $('#user_pic_spinner').show();
    }            
});  
</script>
</body>
</html>