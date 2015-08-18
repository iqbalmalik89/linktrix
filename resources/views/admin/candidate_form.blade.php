<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')
<script src="admin_asset/js/modules/candidate.js"></script>
<style type="text/css">

  .control-label
  {
    font-weight: 500 !important;
  }

th
{
  font-weight: 500 !important;  
}

.detail_table th, td
{
 border-top:#fff 0px solid !important; 
}

.txtcolor td
{
  color:#428bca;
}

#job_title_ul, #tags_ul, .tagit-new, .ui-widget-content ,.ui-helper-hidden-accessible 
{
  background-color: #fff !important;
}


</style>
<script type="text/javascript">
window.onbeforeunload = function(e) {
  var candidateId = document.getElementById('candidate_id').value;
  var firstName = document.getElementById('first_name').value;  
  if(firstName != "")
  {
    return 'You haven\'t posted your data yet. Do you want to leave without finishing?';
  }

};  
</script>
</head>
<body>
<!--layout-container start-->
<div id="layout-container"> 
  <!--Left navbar start-->
  @include('admin.partials.left')  

  @include('admin.partials.candidate_detail')


  
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


        <div class="col-md-12"> 
            <!--box-info start-->
            <div class="box-info">
              <h3>Basic Information</h3>
              <hr>
              <!--form-horizontal row-border start-->
              <form action="" class="form-horizontal row-border">
              <input type="hidden" id="candidate_id" name="candidate_id" value="">
              <input name="tags" id="tags_field" value="" type="hidden" disabled="true">

              <div class="notification-bar" id="candidate_msg"></div>


    <div class="alert alert-info" role="alert" id="duplicate_span" style="display:none;">
      <strong>Duplicate Check:</strong> <span id="duplicate_msg"></span>
    </div>



              <?php
              if($user['role']['type'] == 'assistant')
              {
              ?>
                <div class="form-group">


                  <label class="col-sm-1 control-label">Consultant</label>
                  <div class="col-sm-2">
                  <select class="selectpicker" data-live-search="true" id="consultant_id">
                  </select>
                  </div>


                </div>              
              <?php
              }
              ?>



              <!--form-group start-->
              <div class="form-group">

               <label class="col-sm-1 control-label">Email*</label>
                <div class="col-sm-4">
                  <input type="text" id="email" name="email" onblur="checkDuplicateCheck(this.value);" class="form-control">
                </div>

                <label class="col-sm-1 control-label">First Name*</label>
                <div class="col-sm-2">
                  <input type="text" id="first_name" name="first_name" class="form-control">
                </div>

                <label class="col-sm-2 control-label" style="width:9%;">Last Name*</label>
                <div class="col-sm-2">
                  <input type="text" class="form-control" id="last_name" name="last_name">
                </div>


              </div>

              <div class="form-group">
                <label class="col-sm-1 control-label">Address</label>
                <div class="col-sm-7" style="width:59.3%;">
                  <input type="text" id="address" name="address" class="form-control">
                </div>

                <label class="col-sm-2 control-label" style="width:9%;">Postal Code</label>
                <div class="col-sm-2">
                 <input type="text" id="postal_code" name="postal_code" class="form-control">
                </div>


              </div>


              <!--form-group end--> 

              <div class="form-group">
                <label class="col-sm-1 control-label">Tel (HP)</label>
                <div class="col-sm-2">
                  <input type="text" id="phone" name="phone" class="form-control">
                </div>

                <label class="col-sm-2 control-label">Home Number</label>
                <div class="col-sm-2">
                  <input type="text" placeholder="" id="home_number" class="form-control">
                </div>

                <label class="col-sm-1 control-label">Date Of Birth</label>
                <div class="col-sm-2">
                  <input type="text" placeholder="dd/mm/yyyy" id="date_of_birth" style="cursor:pointer; background-color: #FFFFFF" class="form-control datepicker form-control-inline input-medium default-date-picker">
                </div>

 
              </div>




              <div class="form-group">
                <label class="col-sm-1 control-label">NRIC no</label>
                <div class="col-sm-2">
                  <input type="text" id="nric" name="nric" class="form-control">
                </div>

                <label class="col-sm-2 control-label">Citizenship</label>
                <div class="col-sm-2">
                  <input type="text" id="citizen" name="citizen" class="form-control">
                </div>

                <label class="col-sm-1 control-label">Gender</label>
                <div class="col-sm-2">
                    <label class="radio-inline">
                      <input type="radio" name="gender" id="male" value="male">
                      Male </label>
                    <label class="radio-inline">
                      <input type="radio" name="gender" id="female" value="female">
                      Female </label>
                </div>
              </div>





             <div class="form-group">
                <label class="col-sm-2 control-label"  style="width:10%; ">Marital Status</label>
                  <div class="col-sm-3">
                    <label class="radio-inline">
                      <input type="radio" id="single" value="single" name="marital_status"> 
                      Single </label>
                    <label class="radio-inline">
                      <input type="radio" id="married" value="married" name="marital_status">
                      Married </label>
                    <label class="radio-inline">
                      <input type="radio" id="divorced" value="divorced" name="marital_status">
                      Divorced </label>
                </div>

                <label class="col-sm-1 control-label">Nationality</label>
                <div class="col-sm-2">
                  <select  class="selectpicker form-control" data-live-search="true" id="nationality" name="nationality">
                    <option value=""></option>
                    @foreach (Utility::getNationality() as $nationality)
                      <option value="{{$nationality}}">{{$nationality}}</option>
                     @endforeach                    
                  </select>
                </div>

                <label class="col-sm-2 control-label" style="width:10%;">Notice Period</label>
                <div class="col-sm-1">
                  <input type="text" id="notice_period_number" class="form-control" maxlength="3">

                </div>

                  <select class="form-control" style="width:100px;" id="period_type" name="period_type">
                  <option value=""></option>                  
                  <option value="day">Days</option>
                  <option value="week">Weeks</option>                  
                  <option value="month">Months</option>                  
                  </select>


              </div>


             <div class="form-group">
                <label class="col-sm-1 control-label">Race</label>
                <div class="col-sm-2" style="width:26.5%;">
                  <select class="selectpicker form-control" data-live-search="true" id="race" name="race" onchange="togglwCustomRace(1)">
                    <option value=""></option>
                    @foreach (Utility::getRace() as $race)
                      <option value="{{$race}}">{{$race}}</option>
                     @endforeach
                    </select>

                    <div class="input-group custom_race" style="display:none;">
                    <input type="text" class="form-control" id="custom_race" name="custom_race" value="">
                      <span style="cursor:pointer;" onclick="togglwCustomRace(0);" class="input-group-addon">X</span>                      
                    </div>


                </div>

                <label class="col-sm-1 control-label">Religion</label>
                <div class="col-sm-2">
                  <select class="selectpicker form-control" data-live-search="true"  id="religion" name="religion">
                    <option value=""></option>                  
                    @foreach (Utility::getReligions() as $religion)
                      <option value="{{$religion}}">{{$religion}}</option>
                     @endforeach                    

                  </select>
                </div>


                <label class="col-sm-2 control-label">Highest Qualification</label>
                <div class="col-sm-2">

                    <input type="text" class="form-control" id="highest_qualification" name="highest_qualification">

                </div>

              </div>


             <div class="form-group">
                <label class="col-sm-1 control-label">Tags</label>
                <div class="col-sm-10" style="width:85.7%;">
                                <ul id="tags_ul"></ul>

                </div>




              </div>

                   
              <h3>Work Experience (Latest on top)</h3>
              <hr>


                <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Basic Salary</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="text" id="company1" class="company_name form-control" placeholder="Enter company name"><i style="font-size:6px;top:52%;left:19.7%;position:absolute;" class="fa fa-asterisk"></i></td>
                     <td><input type="text" class="basic_salary form-control" placeholder="Enter basic"></td>
                     <td><input type="text" placeholder="dd/mm/yyyy" style="cursor:pointer; background-color: #FFFFFF" class="form-control datepicker from_date form-control-inline input-medium default-date-picker"></td>
                     <td><input type="text" placeholder="dd/mm/yyyy" style="cursor:pointer; background-color: #FFFFFF" class="form-control datepicker to_date form-control-inline input-medium default-date-picker"></td>
                     <td><input type="text" id="position1" class="position form-control" placeholder="Enter position"><i style="font-size:6px;top:52%;left:97.7%;position:absolute;" class="fa fa-asterisk"></i></td>
                  </tr>
                  <tr>
                    <td><input type="text" class="company_name form-control" placeholder="Enter company name"></td>
                     <td><input type="text" class="basic_salary form-control" placeholder="Enter basic"></td>
                     <td><input type="text" placeholder="dd/mm/yyyy" style="cursor:pointer; background-color: #FFFFFF" class="form-control datepicker from_date form-control-inline input-medium default-date-picker"></td>
                     <td><input type="text" placeholder="dd/mm/yyyy" style="cursor:pointer; background-color: #FFFFFF" class="form-control datepicker to_date form-control-inline input-medium default-date-picker"></td>
                     <td><input type="text" class="position form-control" placeholder="Enter position"></td>
                  </tr>
                  <tr>
                    <td><input type="text" class="company_name form-control" placeholder="Enter company name"></td>
                     <td><input type="text" class="basic_salary form-control" placeholder="Enter basic"></td>
                     <td><input type="text" placeholder="dd/mm/yyyy" style="cursor:pointer; background-color: #FFFFFF" class="form-control datepicker from_date form-control-inline input-medium default-date-picker"></td>
                     <td><input type="text" placeholder="dd/mm/yyyy" style="cursor:pointer; background-color: #FFFFFF" class="form-control datepicker to_date form-control-inline input-medium default-date-picker"></td>
                     <td><input type="text" class="position form-control" placeholder="Enter position"></td>
                  </tr>
                </tbody>
              </table>

              <hr>
              <h3>Remarks</h3>

              <div class="form-group">

                <div class="col-sm-12">
                  <textarea id="remarks" class="form-control"></textarea>


                </div>
              </div>              


              <hr>
              <h3>CV  <span style="font-size:14px;" id="cv_update"></span></h3>
              <div class="form-group">
                <label class="col-sm-1 control-label">Upload CV</label>
                <div class="col-sm-4">
                  <input type="file" id="cv" name="cv" data-url="api/cv_upload" class="file-pos">
                  <input type="hidden" value="" id="cv_path">
                  <span id="cv_name" style="display:block; float:left; margin-top:8px;"></span>
                  <a href="javascript:void(0);" id="removeCv" style="display:none; float:right;margin-top:8px"><i class="fa fa-trash"></i>Remove</a>
                </div>

              </div>



              <hr>

              <div class="form-group">
                <label class="col-sm-1 control-label"></label>
                <div class="col-sm-2" style="float:right;">
                    <a class="btn-primary btn" id="addCandidateButton">Submit</a>
                    <a class="btn-default btn" href="candidates">Cancel</a>
                </div>
              </div>




              </form>
              <!--form-horizontal row-border end--> 
              <!--row start-->

              <!--row end--> 
            </div>
            <!--box-info end--> 
          </div>              
            </div>
          </div>
          
        </div><!--row end-->

        

      </div><!--scrollable wrapper end--> 
    </div><!--margin-container end--> 
  </div><!--main end--> 
</div><!--layout-container end--> 
<script type="text/javascript">


  $( document ).ready(function() {
    getConsultant('');
    <?php if(!empty($_GET['candidate_id'])){ ?>
      getCandidate("<?php echo $_GET['candidate_id']; ?>");
    <?php } else {?>
      getTags();
      <?php } ?>



  $('#cv').fileupload({
    dataType: 'json',
    done: function (e, data) {
      $('#cv_path').val(data.result.file_name);
      $('#cv').hide();
      $('#cv_name').show().html('<a target="_blank" href="api/cv_download?cv_path='+data.result.file_name+'">'+data.result.real_file_name+'</a>');
      $('#removeCv').show();
    }
  });


  });
</script>


</body>
</html>