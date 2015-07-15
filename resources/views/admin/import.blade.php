<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')
<script src="admin_asset/js/modules/candidate.js"></script>
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

              <h1>Import Candidates  
 
               </h1>
          <div class="notification-bar" id="user_msg"></div>

<div class="tab-container">
              <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#candidates">Import Candidate</a></li>
              </ul>
              <div class="tab-content">

                <div class="tab-pane active cont" style="height:100%;">

                  <div class="notification-bar" id="csv_msg"></div>

                  <form role="form" class="form-horizontal">

                     <div class="form-group">
                        <label class="col-lg-2 control-label">Upload CSV file</label>
                        <div class="col-lg-6">
                        <table width="400">
                        <tr>
                        <td style="width:100px;"><input type="file" id="csv" name="csv" data-url="api/csv_upload" class="file-pos" style="width:80px;border:0px;"></td>
                        <td><span id="file_name"></span></td>
                        </tr>
                        </table>
                        <img src="shared_images/spinner.gif" style="position:absolute;left:43%;top:53%;display:none;" id="upload_spinner">
                        <input type="hidden" value="" id="csv_path">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                        <img src="shared_images/spinner.gif" style="position:absolute;left:31%;top:68%;display:none;" id="import_spinner">
                            <button class="btn btn-default" type="button" onclick="location.reload();">Cancel</button>
                            <button class="btn btn-primary" onclick="importFile();" type="button" id="update_profile_button">Import</button>
                        </div>
                    </div>

                  </form>

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
  getCandidates();

$('#cv').change(function() {
        var filename = $('#cv').val();
        $('#file_name').html(filename);
    });
});


$('#csv').fileupload({
  dataType: 'json',
  done: function (e, data) {
    console.log(e)
    $('#csv_path').val(data.result.file_name);
    $('#upload_spinner').hide();
    $('#file_name').html(data.result.real_file_name);
  },
  send: function (e, data) {
    $('#upload_spinner').show();
  }          
});

</script>

</body>
</html>