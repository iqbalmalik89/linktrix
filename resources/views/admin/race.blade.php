<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')
<script src="admin_asset/js/modules/race.js"></script>
</head>
<body>
<div class="modal fade" id="RacePopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<input type="hidden" id="race_id" value="" name="race_id">
    <div class="modal-dialog">
        <div class="modal-content" style="width:740px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="race_label">Add Race</h4>
            </div>
            <div class="modal-body">
                <div class="notification-bar" id="race_msg" style="display:none;"></div>

                <form role="form" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name"> Race :</label>
                        <div class="col-lg-6">
                            <input type="text" onkeyup="$(this).removeClass('error-class');" id="race" class="form-control">
                        </div>
                    </div>
                </form>
            </div>      <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" id="saveRace" class="btn btn-primary"> Save </button>

            </div>
        </div>
    </div>
</div>

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

              <h1>Manage Race <a type="button" data-toggle="modal" data-target="#RacePopup" id="showRacePopup" href="javascript:void(0);" class="btn btn-primary">Add Race</a> 
              <img src="shared_images/spinner.gif" style="display:none;" id="backupspinner">
                </h1>
          <div class="notification-bar" id="backup_msg"></div>

            <div class="tab-container">
              <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#admin">Races</a></li>
              </ul>
              <div class="tab-content">

                <div id="admin" class="tab-pane active cont" style="height:100%;">


                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style="width:20%;">Id</th>
                        <th style="width:60%;">Race</th>
                        <th style="width:20%;">Actions</th>                        
                      </tr>
                    </thead>
                    <tbody id="racebody">
     
                    </tbody>
                  </table>

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
  getAllRaces();
});

</script>

</body>
</html>