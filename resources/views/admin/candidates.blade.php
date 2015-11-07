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

#job_title_ul, #tags_ul, .tagit-new, .ui-widget-content ,.ui-helper-hidden-accessible 
{
  background-color: #fff !important;
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
                <h4 class="modal-title" id="popupLabel">Reassign</h4>
            </div>
            <div class="modal-body">
                <form role="form" class="form-horizontal">

                <h4>Assign Candidate Holder</h4>
                <hr>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="recipient-name">User :</label>
                        <div class="col-lg-6">

                          <select id="consultant_id" name="consultant_id" class="selectpicker" data-live-search="true">

                          </select>

                        </div>
                    </div>

            <div class="modal-footer">
                <img style="display:none;" id="add_creator_spinner" src="shared_images/spinner.gif">
                <button type="button" onclick="changeCreator();" class="btn btn-primary">Save </button>
            </div>






                <h4>Add Ownership</h4>
                <hr>
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
            </div>      
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" onclick="addCandidateOwner();" class="btn btn-primary">Save </button>
                <img style="display:none;" id="add_owner_spinner" src="shared_images/spinner.gif">
            </div>
        </div>
    </div>
</div>



  @include('admin.partials.candidate_detail')

  
<div class="modal fade" id="cv_preview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width:60%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">
                </h4>
            </div>
            <div class="modal-body" id="preview_body">

              <iframe src="" id="preview_iframe"></iframe>
              

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
              <h1>Candidates  
              <span style="font-size:14px;margin-left:20px;">

                    Join with: 
                    <label>
                      <input type="radio" onclick="searchCandidates();" name="search_mode" checked="" id="or_search" value="AND">
                      AND  </label>


                    <label>
                      <input type="radio" onclick="searchCandidates();" name="search_mode" id="and_search" value="OR">
                      OR </label>

                    <a href="javascript:void(0);" onclick="resetSearch()" id="reset" style="display:none; margin-left:10px;">Reset Search</a>

              </span>
               </h1> 





              <table>
              <tr>
                <td>
                  <select id="search_consultant_id" name="search_consultant_id" onchange="searchCandidates();"  class="selectpicker" data-live-search="true"></select>
                </td>


                <td>
                  
                <input id="search_name" name="search_name" class="search_term" onkeyup="searchCandidates();" type="text" placeholder="Name" style="margin-left:6px;height:40px; width:160px;">
                </td>
                <td>
                 <ul style="border:1px solid #ccc !important;width:290px !important; height:39px;margin-top:10px;" style="" id="job_title_ul"></ul>                
                </td>
               
                <td>
<!--                 <input id="search_job_title" name="search_job_title" class="search_term" onkeyup="searchCandidates();" type="text" placeholder="Job Title" style="height:40px; width:150px;">
 -->
                <ul style="border:1px solid #ccc !important;width:290px !important; height:38px;margin-top:10px;" style="" id="tags_ul"></ul>


                </td>
                <td>
  <!--               <input id="search_tags" name="search_tags" class="search_term" onkeyup="searchCandidates();" type="text" placeholder="Tags" style="height:40px; width:400px;"> -->
                <input name="tags_field" id="tags_field" value="" type="hidden">
                <input name="search_job_title" id="search_job_title" value="" type="hidden">

                <img src="shared_images/spinner.gif" style="display:none;" id="search_spinner">
                <span id="search_count" style="font-size:15px;"></span>

                </td>
              </tr>
              </table>




<!-- <button type="button" data-toggle="modal" data-target="#assignCandidatePopup" id="assignCandidateButton" class="btn btn-primary">Assign Candidate</button>   -->
<!--                </h1> -->
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
<a href="add-candidate" class="btn btn-primary">Add Candidate</a>

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
  getTags('search');
  getJobTitle();  
  getConsultant('');  
  getCandidates();
});

</script>

</body>
</html>