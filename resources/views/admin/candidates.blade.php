<!DOCTYPE html>
<html>
<head>
<title>{{$page_title}}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
  @include('admin.partials.asset')
<script src="admin_asset/js/modules/candidate.js"></script>
<style type="text/css">
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
</style>
</head>
<body>
<!--layout-container start-->
<div id="layout-container"> 
  <!--Left navbar start-->
  @include('admin.partials.left')  

<div class="modal fade" id="assignCandidatePopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<input type="hidden" id="candidate_id" value="">
<input type="hidden" id="sort_order" value="asc">
<input type="hidden" id="order_by" value="basic_salary">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="popupLabel">Assign Candidate to Users</h4>
            </div>
            <div class="modal-body">
                <form role="form" class="form-horizontal">

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name">Admin :</label>
                        <div class="col-lg-6">

                          <select id="role1" name="role1[]" class="selectpicker" multiple data-live-search="true">

                          </select>

                        </div>
                    </div>




                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name">Supervisors :</label>
                        <div class="col-lg-6">

                          <select id="role2" name="role2[]" class="selectpicker" multiple data-live-search="true">

                          </select>

                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name">Consultants :</label>
                        <div class="col-lg-6">

                          <select id="role3" name="role3[]" class="selectpicker" multiple data-live-search="true">

                          </select>

                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name">Assistants :</label>
                        <div class="col-lg-6">

                          <select  id="role4" name="role4[]" class="selectpicker" multiple data-live-search="true">

                          </select>

                        </div>
                    </div>                    

                </form>
            </div>      <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                <button type="button" onclick="addCandidateOwner();" class="btn btn-primary">Save </button>

            </div>
        </div>
    </div>
</div>



<div class="modal fade" id="candidate_detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width:60%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title"><span id="candidateName"></span> <a onclick="unlockProfile();" href="javascript:void(0);" id="unlock_btn" style="display:none;" class="btn btn-primary"> Unlock Profile </a> 
              <img src="shared_images/spinner.gif" style="display:none;" id="unlock_spinner">

                </h4>
                LINKTRIX ID: <span id="lintrixk_id"></span>

            </div>
            <div class="modal-body">
          <div class="notification-bar" id="unlock_msg"></div>

                
                <h4>Personal Information</h4>
                <hr style="margin-top:3px; margin-bottom:3px;">
                  
                  <table class="table detail_table">

                  <tr class="txtcolor">
                    <th>First Name</th>
                    <td id="first_name"></td>                          
                    <th>Last Name</th>
                    <td id="last_name"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Address</th>
                    <td id="address" colspan="3"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Postal Code</th>
                    <td id="postal_code"></td>                          
                    <th>Tel</th>
                    <td id="phone"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Date Of Birth</th>
                    <td id="date_of_birth"></td>                          
                    <th>Email</th>
                    <td id="email"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>NRIC</th>
                    <td id="nric"></td>                          
                    <th>Home Number</th>
                    <td id="home_number"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Gender</th>
                    <td id="gender"></td>                          
                    <th>Marital Status</th>
                    <td id="marital_status"></td>                                                    
                  </tr>


                  <tr class="txtcolor">
                    <th>Nationality</th>
                    <td id="nationality"></td>  
                    <th>Citizen</th>
                    <td id="citizen"></td>                                                                                                
                  </tr>

                  <tr class="txtcolor">
                    <th>Race</th>
                    <td id="race"></td>                          
                    <th>Religion</th>
                    <td id="religion"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Highest Qualification</th>
                    <td id="highest_qualification"></td>                          
                    <th>Notice Period</th>
                    <td id="notice_period"></td>                                                    
                  </tr>
                  <tr>
                    <th>CV</th>
                    <td colspan="3" id="cv"></td>
                    <td>
                  <tr class="txtcolor">
                    <th>Remarks</th>
                    <td id="remarks" colspan="3"></td>                          
                  </tr>

                  <tr class="txtcolor">
                    <th>Tags</th>
                    <td id="tags" colspan="3"></td>                          
                  </tr>

                  </table>

                <h4>Work Experience</h4>
                <hr style="margin-top:3px; margin-bottom:3px;">

                  <table class="table detail_table">

                    <thead>
                      <th><b>SNo</b></th>                      
                      <th><b>Company</b></th>
                      <th><b>Salary</b></th>
                      <th><b>From - To</b></th>                    
                      <th><b>Postion</b></th>
                    </thead>

                    <tbody id="work_body">
                      
                    </tbody>

                  </table>



            </div>

            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

            </div>
        </div>
    </div>
</div>
  
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

           <form method="get" action="api/export_download" id="search_form">     
              <h1>Candidates <a href="add-candidate" class="btn btn-primary">Add Candidate</a>  

              <i onclick="resetSearch()" id="reset" class="fa fa-times" style="position:absolute;left:942px; top:107px;display:none; cursor:pointer;"></i>

              <input id="search_term" name="search_term" onkeyup="searchCandidates(this.value);" type="text" placeholder="Search Candidates" style="margin-left:200px;height:40px; width:500px;">
              <img src="shared_images/spinner.gif" style="display:none;" id="search_spinner">

              <span id="search_count" style="font-size:15px;"></span>

<!-- <button type="button" data-toggle="modal" data-target="#assignCandidatePopup" id="assignCandidateButton" class="btn btn-primary">Assign Candidate</button>   -->
               </h1>
               <span style="float:right; margin-right:584px; display:none;" id="sort_span">
               Sort By: 
                <a id="asc" onclick="fillSort('asc','yes');" style="display:none;" href="javascript:void(0);">Lowest Salary</a>
                <a id="desc" onclick="fillSort('desc','yes');" href="javascript:void(0);">Highest Salary</a>
               </span>
                         </form>
          <div class="notification-bar" id="user_msg"></div>

<div class="tab-container">
              <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#candidates">Candidates</a></li>
              </ul>
              <div class="tab-content">

                <div id="candidates" class="tab-pane active cont" style="height:100%;">

                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th width="180">Name</th>
                        <th width="180">Owner</th>                        
                        <th width="180">Email</th>
                        <th>Company</th>
                        <th>Job Title</th>
                        <th>Salary</th>                        
                        <th width="150">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="candidates_body">
     
                    </tbody>
                  </table>
                  <div id="candidates_pagination" align="center"></div>
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

var globalRoleType = "<?php echo $role['type'];?>";

$( document ).ready(function() {
  getCandidates();
});

</script>

</body>
</html>