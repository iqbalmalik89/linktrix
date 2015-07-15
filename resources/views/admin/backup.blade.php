<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')
<script src="admin_asset/js/modules/backup.js"></script>
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

              <h1>Backup Your Data <a type="button" id="createBackupPopupButton" class="btn btn-primary">Create Backup</a> 
              <img src="shared_images/spinner.gif" style="display:none;" id="backupspinner">
                </h1>
          <div class="notification-bar" id="backup_msg"></div>

            <div class="tab-container">
              <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#admin">Past Backups</a></li>
              </ul>
              <div class="tab-content">

                <div id="admin" class="tab-pane active cont" style="height:100%;">


                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Backup</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Archive</th>
                      </tr>
                    </thead>
                    <tbody id="backup">
     
                    </tbody>
                  </table>
                  <div id="pagination" align="center"></div>
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
  getAllBackups(1);
});

</script>


<script type="text/javascript">
$('#profile_pic').fileupload({
  dataType: 'json',
  done: function (e, data) {
    $('#pic_path').val(data.result.file_name);
    $('#temp_pic').attr('src',data.result.url);
  }
});  
</script>
</body>
</html>