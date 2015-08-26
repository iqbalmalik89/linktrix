<div class="modal fade" id="candidate_detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width:65%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title"><span id="lbl_candidateName"></span> <a onclick="unlockProfile();" href="javascript:void(0);" id="lbl_unlock_btn" style="display:none;" class="btn btn-primary"> Unlock Profile </a> 
              <img src="shared_images/spinner.gif" style="display:none;" id="lbl_unlock_spinner">

                </h4>
                <b>ID</b>: <span id="lbl_lintrixk_id"></span>
                <span style="float:right;margin-right:15px;" id="lbl_date_span"></span>
            </div>
            <div class="modal-body">
          <div class="notification-bar" id="lbl_unlock_msg"></div>

                <h4>Creator</h4>
                <hr style="margin-top:3px; margin-bottom:3px;">

                  <table class="">

                  <tr class="txtcolor">
                    <td id="lbl_creater_image" style="width:80px;"></td>  
                    <td id="lbl_creator_name"></td>
                  </tr>

                  </table>
                
                <h4>Personal Information</h4>
                <hr style="margin-top:3px; margin-bottom:3px;">
                  
                  <table class="table detail_table">

                  <tr class="txtcolor">
                    <th>First Name</th>
                    <td id="lbl_first_name"></td>                          
                    <th>Last Name</th>
                    <td id="lbl_last_name"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Address</th>
                    <td id="lbl_address" colspan="3"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Postal Code</th>
                    <td id="lbl_postal_code"></td>                          
                    <th>Tel</th>

                    <td style="width:292px;">
                      <table id="phone_sharing">

                      </table>
                    </td>
<!--                     <td id="lbl_phone"></td>                                                     -->


                  </tr>

                  <tr class="txtcolor">
                    <th>Date Of Birth</th>
                    <td id="lbl_date_of_birth"></td>                          
                    <th>Email</th>
                    <td id="lbl_email"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>NRIC</th>
                    <td id="lbl_nric"></td>                          
                    <th>Home Number</th>
                    <td id="lbl_home_number"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Gender</th>
                    <td id="lbl_gender"></td>                          
                    <th>Marital Status</th>
                    <td id="lbl_marital_status"></td>                                                    
                  </tr>


                  <tr class="txtcolor">
                    <th>Nationality</th>
                    <td id="lbl_nationality"></td>  
                    <th>Citizen</th>
                    <td id="lbl_citizen"></td>                                                                                                
                  </tr>

                  <tr class="txtcolor">
                    <th>Race</th>
                    <td id="lbl_race"></td>                          
                    <th>Religion</th>
                    <td id="lbl_religion"></td>                                                    
                  </tr>

                  <tr class="txtcolor">
                    <th>Highest Qualification</th>
                    <td id="lbl_highest_qualification"></td>                          
                    <th>Notice Period</th>
                    <td id="lbl_notice_period"></td>                                                    
                  </tr>
                  <tr>
                    <th>CV</th>
<!--                     <td colspan="3" id="lbl_cv"></td> -->
                    <td colspan="3">
                      <table id="cv_sharing">

                      </table>
                    </td>
                    <td>

                  <tr class="txtcolor">
                    <th>Tags</th>
                    <td id="lbl_tags" colspan="3"></td>                          
                  </tr>

                  <tr class="txtcolor">
                    <th>Remarks</th>
                    <td id="lbl_remarks" colspan="3"></td>                          
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

                    <tbody id="lbl_work_body">
                      
                    </tbody>

                  </table>



            </div>

            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

            </div>
        </div>
    </div>
</div>