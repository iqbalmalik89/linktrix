// Event Binding
$( document ).ready(function() {


$('.basic_salary').on('keypress', function(ev) {
    var keyCode = window.event ? ev.keyCode : ev.which;
    //codes for 0-9
    if (keyCode < 48 || keyCode > 57 || keyCode == 44) {
        
        //codes for backspace, delete, enter
        if (keyCode != 0 && keyCode != 44 && keyCode != 8 && keyCode != 13 && !ev.ctrlKey) {

            ev.preventDefault();
        }
    }
});


$('#search_form').on('keyup keypress', function(e) {
  var code = e.keyCode || e.which;
  if (code == 13) { 
    e.preventDefault();
    return false;
  }
});
  $( "#addCandidateButton" ).click(function() {
    addUpdateCandidate();
  });


  $('.default-date-picker').datepicker({
      autoclose:true,
      format:"dd/mm/yyyy"
     });

  // $('.default-date-picker').on('changeDate', function(ev){
  //     $(this).datepicker('hide');
  // });

  $( "#removeCv" ).click(function() {
    removeCv();
  });

});

function UndeleteRequest(candidate_id)
{
    $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'undelete_request',
      data: {candidate_id:candidate_id},
      beforeSend:function(){

      },
      success:function(data){

        if(data.status == 'success')
        {
          showMsg('#candidate_msg', 'Candidate restore request sent to admin', 'green');          
        }
        else
        {
          showMsg('#candidate_msg', 'Some problem occured to send request.', 'red');          
        }      

      },
      error:function(){

      }
    });  
}

function checkDuplicateCheck(email)
{
  var candidateId = $('#candidate_id').val();
  var consultantId = $('#consultant_id').val();

    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'check_duplicate_check',
      data: {email:email, candidate_id:candidateId, consultant_id:consultantId},
      beforeSend:function(){

      },
      success:function(data){

        if(data.status == 'success')
        {

        }
        else if(data.status == 'same_owner')
        {
          showMsg('#candidate_msg', 'This user already own the candidate.', 'red');
        }        
        else if(data.status == 'deleted')
        {
          $('#undelete_request').modal('show');  
          $('#undel_btn').attr('onclick', 'UndeleteRequest(\''+data.candidate_id+'\')')
        }        
        else if(data.status == 'error')
        {
          showMsg('#candidate_msg', data.message, 'red');          
        }
        else if(data.status == 'duplicate')
        {
          // $('#duplicate_msg').html('Do you want to share the candidate\'s information? <a class="btn btn-primary">Share Information</a>');
          // $('#duplicate_span').fadeIn();
          getCandidateDetail(data.data.id);
          $('#candidate_detail').modal('show');  


        }

      },
      error:function(){

      }
    });  
}

function getJobTitle()
{

    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'job_title',
      data: { },
      beforeSend:function(){

      },
      success:function(data){

      var sampleTags = data.job_titles;

        $('#job_title_ul').tagit({
            availableTags: data.job_titles,
            // This will make Tag-it submit a single form value, as a comma-delimited field.
            singleField: true,
            singleFieldNode: $('#search_job_title'),
            allowSpaces: true,
            placeholderText:"Enter Job Title",            
            afterTagAdded: function(evt, ui) {
              if (!ui.duringInitialization) {
                  searchCandidates();
                  //addEvent('afterTagAdded: ' + eventTags.tagit('tagLabel', ui.tag));
              }
            },
            afterTagRemoved: function(evt, ui) {
              searchCandidates(); 
              //addEvent('afterTagRemoved: ' + eventTags.tagit('tagLabel', ui.tag));
            },

        });        





       // $('#tags_ul .ui-widget-content').attr('placeholder', 'Enter Tag');
       // $('#job_title_ul  .ui-widget-content').attr('placeholder', 'Enter Job Title');

      },
      error:function(){

      }
    });  
}
function removeCv()
{
  $('#cv').show();
  $('#cv_path').val('');
  $('#cv_name').hide().html('');
  $('#removeCv').hide();  
}

function fillSort(sort, search)
{

  $('#sort_span').show();
  if(sort == 'asc')
  {
    $('#sort_order').val('asc');
    $('#desc').show();
    $('#asc').hide();    
  }
  else
  {
    $('#sort_order').val('desc');
    $('#desc').hide();
    $('#asc').show();    
  }

  if(search == 'yes')
  {
    getCandidates(1);
  }

}

function togglwCustomRace(type)
{
  var race = $('#race').val();
  if (type == 1) {
    if(race == 'Other')
    {
      $('#race').selectpicker('hide');
      $('.custom_race').show().focus();      
    }

  } else {
    $('#race').selectpicker('show');
    $('.custom_race').hide().focus();    
    $('#race').prop('selectedIndex',0);
    $('#race').selectpicker('refresh');
  }
}

function addUpdateCandidate()
{
  // Mandatory
  var candidateId = $.trim($('#candidate_id').val());
  if($('#consultant_id').length > 0)
    var consultantId = $.trim($('#consultant_id').val());  
  else
    consultantId = 0;
  var firstName = $.trim($('#first_name').val());
  var lastName = $.trim($('#last_name').val());
  var email = $.trim($('#email').val());
  var cv_path = $.trim($('#cv_path').val());

  // Optional
  var address = $.trim($('#address').val());
  var postalCode = $.trim($('#postal_code').val());
  var phone = $.trim($('#phone').val());
  var dateOfBirth = $.trim($('#date_of_birth').val());
  var nric = $.trim($('#nric').val());
  var citizen = $.trim($('#citizen').val());
  var gender = $('input[name="gender"]:checked').val();
  var maritalStatus = $('input[name="marital_status"]:checked').val();
  var nationality = $.trim($('#nationality').val());
  var noticePeriodNumber = $.trim($('#notice_period_number').val());
  var periodType = $.trim($('#period_type').val());
  var customRace = $.trim($('#custom_race').val());
  var race = $.trim($('#race').val());
  var religion = $.trim($('#religion').val());
  var tags = $.trim($('#tags_field').val());
  var highestQualification = $.trim($('#highest_qualification').val());
  var remarks = $.trim($('#remarks').val());
  var company1 = $.trim($('#company1').val());
  var position1 = $.trim($('#position1').val());
  var homeNumber = $.trim($('#home_number').val());


  if(race == 'Other')
  {
    race = customRace;
  }

  var companyNames = [];
  var fromDates = [];
  var toDates = [];
  var basicSalary = [];
  var positions = [];

  $( ".company_name" ).each(function( index ) {
    companyNames.push($.trim($( this ).val()));
  });

  $( ".position" ).each(function( index ) {
    positions.push($.trim($( this ).val()));
  });

  $( ".basic_salary" ).each(function( index ) {
    basicSalary.push($.trim($( this ).val()));
  });

  $( ".from_date" ).each(function( index ) {
    fromDates.push($.trim($( this ).val()));
  });

  $( ".to_date" ).each(function( index ) {
    toDates.push($.trim($( this ).val()));
  });

  var check = true;

  if(firstName == '')
  {
    $('#first_name').addClass('error-class').focus();
    check = false;
  }

  if(lastName == '')
  {
    $('#last_name').addClass('error-class');
    if(check)
      $('#last_name').focus();
    check = false;
  }

  if(email == '')
  {
    $('#email').addClass('error-class');
    if(check)
      $('#email').focus();
    check = false;
  }

  if(company1 == '')
  {
    $('#company1').addClass('error-class');
    if(check)
      $('#company1').focus();
    check = false;
  }

  if(position1 == '')
  {
    $('#position1').addClass('error-class');
    if(check)
      $('#position1').focus();
    check = false;
  }

  if(check)
  {
    $.ajax({
      type: 'POST',
      url: apiUrl + 'candidate',
      data: {consultant_id: consultantId, candidate_id:candidateId, first_name: firstName, last_name:lastName, email:email, address:address, 
        postal_code:postalCode, phone:phone, date_of_birth:dateOfBirth, nric:nric, citizen:citizen, gender:gender,
         marital_status:maritalStatus, nationality:nationality, notice_period_number: noticePeriodNumber,
         period_type:periodType, race:race, custom_race:customRace, religion:religion, company_names:companyNames,
          from_dates:fromDates, to_dates:toDates, basic_salary:basicSalary,positions:positions, tags:tags, cv_path:cv_path,
          remarks:remarks, highest_qualification: highestQualification, home_number:homeNumber},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        scroll();
        if(data.status == 'success')
        {
          $('#candidate_id').val(data.candidate_id);
          showMsg('#candidate_msg', data.message, 'green');

           setTimeout(function(){
              $('#first_name').val('');
              window.location = 'candidates';
            }, 3000);      


        }
        else
        {
          showMsg('#candidate_msg', data.message, 'red');                    
        }

      },
      error:function(){

      }
    });    
  }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function importFile()
{
    var path = $.trim($('#csv_path').val());
    if(path != '')
    {
      $('#import_spinner').show();
      $.ajax({
        type: 'GET',
        dataType:"JSON",
        url: apiUrl + 'import_csv',
        data: {csv_path:path},
        beforeSend:function(){

        },
        success:function(data){
          $('#import_spinner').hide();
          if(data.status == 'success')
          {
            showMsg('#csv_msg', 'CSV imported successfully', 'green');
            $('#csv_path').val('');
          }
          else
          {
            showMsg('#csv_msg', 'CSV not imported successfully', 'red');          
          }

        },
        error:function(){
          $('#import_spinner').hide();
        }
      });      
    }
    else
    {
      showMsg('#csv_msg', 'Please upload CSV file', 'red');      
    }
}

function getTags(mode)
{
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'tags',
      data: { },
      beforeSend:function(){

      },
      success:function(data){

      var sampleTags = data.tags;

      if(mode == '')
      {
        $('#tags_ul').tagit({
            availableTags: data.tags,
             allowSpaces: true,   
            placeholderText:"Enter Tags",
            // This will make Tag-it submit a single form value, as a comma-delimited field.
            singleField: true,
            singleFieldNode: $('#tags_field')
        });
      }
      else
      {
        $('#tags_ul').tagit({
            availableTags: data.tags,
            allowSpaces: true,            
            // This will make Tag-it submit a single form value, as a comma-delimited field.
            singleField: true,
            placeholderText:"Enter Tags",
            singleFieldNode: $('#tags_field'),
            afterTagAdded: function(evt, ui) {
              if (!ui.duringInitialization) {
                  searchCandidates();
                  //addEvent('afterTagAdded: ' + eventTags.tagit('tagLabel', ui.tag));
              }
            },
            afterTagRemoved: function(evt, ui) {
              searchCandidates(); 
              //addEvent('afterTagRemoved: ' + eventTags.tagit('tagLabel', ui.tag));
            },

        });        
      }






     //  $('.ui-widget-content').attr('placeholder', 'Enter Tags');
      },
      error:function(){

      }
    });
}

function exportCandidates()
{
  var searchName = $.trim($('#search_name').val());
  var searchJobTitle = $.trim($('#search_job_title').val());
  var searchTags = $.trim($('#tags_field').val());


  if(searchTerm != '')
  {
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'export_candidates',
      data: {search_name: searchName, search_job_title:searchJobTitle, search_tags:searchTags},
      beforeSend:function(){

      },
      success:function(data){
        if(data.file != '')
        {
          window.location = 'api/export_download?file=' + data.file;
        }
        else
        {

        }
      },
      error:function(){

      }
    });    
  }
}

function resetSearch()
{
  $('#reset').fadeOut('fast');
  $('#search_count, #sort_span').html('');
  $('.search_term, #tags_field, #search_job_title').val('');
  $('#search_consultant_id').val("");
  $('#search_consultant_id').selectpicker('refresh');
  $("#tags_ul, #job_title_ul").tagit("removeAll");  
  getCandidates(1);
}

function unlockProfile()
{
  var candidateId = $('#candidate_id').val();
  var consultantId = $('#consultant_id').val();

  $('#unlock_spinner').show();
  $('#unlock_btn').hide();
  $.ajax({
      type: 'post',
      dataType:"JSON",
      url: apiUrl + 'unlock_candidate',
      data: {candidate_id: candidateId, consultant_id:consultantId},
      beforeSend:function(){

      },
      success:function(data){
      $('#unlock_spinner').hide()

        if(data.status == 'success')
        {
          if(data.data.email != '')
          {
            // var sharing
            // $('#lbl_phone').html(data.data.phone);
            // $('#lbl_email').html(data.data.email);
            // $('#lbl_home_number').html(data.data.home_number);
            // if(data.data.cv_url != '')
            //   $('#lbl_cv').html('<a target="_blank" style="text-decoration:underline;" href="'+data.data.cv_url+'"><i  style="text-decoration:underline;"class="fa fa-save"></i> Download CV</a> ' + ' Updated At:' + getFormatDate(data.data.cv_updated_at));
            // else
            //   $('#lbl_cv').html('');
            getCandidateDetail(candidateId, 'no');
            showMsg('#lbl_unlock_msg', 'An email is sent to the origional owner.', 'green');
            $('#lbl_unlock_btn').hide();
          }          
        }
        else
        {
            showMsg('#lbl_unlock_msg', 'The selected user si the owner of this candidate..', 'red');          
        }


      },
      error:function(){

      }
  });    
}

function previewCv(url)
{
  // $('#candidate_detail').modal('hide');
  // $('#cv_preview').modal('show');  


}

function showAddPhone()
{
  var add_phone_btn = $('#add_phone_btn').text();
  if(add_phone_btn == 'Add Phone'){
    $('#sharing_phone_number, #sharing_phone_save').fadeIn();
    $('#add_phone_btn').text('Cancel')
  }
  else
  {
    $('#sharing_phone_number, #sharing_phone_save').hide();
    $('#add_phone_btn').text('Add Phone')

  }
}

$('#candidate_detail').on('hidden.bs.modal', function() { 
  console.log('s')
});

function clearUnlockPopup()
{
  $('#candidate_id').val('');
}

function shareSecInfo(id, type)
{
  var candidateId = $('#candidate_id').val();
  var consultantId = $('#consultant_id').val();  
  $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'sec_info_sharing',
      data: {candidate_id: candidateId, sharing_id: id, type:type, consultant_id:consultantId},
      beforeSend:function(){

      },
      success:function(data){

        if(data.status == 'success')
        {
          getCandidateDetail(candidateId);
          if(type == 'phone')
            showMsg('#candidate_msg', 'Phone number shared successfully', 'green');
          else
            showMsg('#candidate_msg', 'CV shared successfully', 'green');            
        }

      },
      error:function(){

      }
  });      
}

function sharePrimaryInfo(candidateId, dataType)
{
  var consultantId = $('#consultant_id').val();
  $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'primary_sharing',
      data: {candidate_id: candidateId, data_type: dataType, consultant_id:consultantId},
      beforeSend:function(){

      },
      success:function(data){

        if(data.status == 'success')
        {
          getCandidateDetail(candidateId);
          showMsg('#candidate_msg', 'Phone number saved successfully', 'green');                      
        }

      },
      error:function(){

      }
  });      
}

function saveSharing(type)
{
  var candidateId = $('#candidate_id').val();
  var consultantId = $('#consultant_id').val();  
  var cvPath = $('#cv_path').val();  
  var sharingPhoneNumber = $.trim($('#sharing_phone_number').val());
  $('#sharing_phone_number').removeClass('error-class');

    $.ajax({
        type: 'POST',
        dataType:"JSON",
        url: apiUrl + 'sharing_save',
        data: {candidate_id: candidateId, phone: sharingPhoneNumber, type:type, cv_path:cvPath, consultant_id:consultantId},
        beforeSend:function(){

        },
        success:function(data){

          if(data.status == 'success')
          {
            getCandidateDetail(candidateId);
            if(type == 'phone')
             showMsg('#candidate_msg', 'Phone number saved successfully', 'green');                      
            if(type == 'cv')
             showMsg('#candidate_msg', 'CV uploaded successfully', 'green');                                 
          }

        },
        error:function(){

        }
    });
}


function getCandidateDetail(candidateId, access)
{
  access = typeof access !== 'undefined' ? access : 'yes';
  $('#email_submit').hide();
  $('#candidate_id').val(candidateId);
  var consultantId = $('#consultant_id').val();

  $('#unlock_btn').hide();
  if(candidateId != '')
  {
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'candidate',
      data: {candidate_id: candidateId, access_check : access, consultant_id:consultantId},
      beforeSend:function(){

      },
      success:function(data){
        $('#lbl_cv').html('');
        $('#lbl_candidateName').html('<b>' + data.data.first_name + ' ' + data.data.last_name  +  '</b>');
        var dateString = '<b>Profile Created</b>: '+getFormatDate(data.data.created_at);
        if(data.data.updated_at != '')
          dateString += ' | <b>Last Updated</b>: ' + getFormatDate(data.data.updated_at);

        $('#lbl_date_span').html(dateString);
        $('#lbl_lintrixk_id').html(data.data.linktrix_id);
        $('#lbl_creator_name').html(data.data.owner);
        $('#lbl_creater_image').html('<img style="width:50px;height:50px;" class="img-circle" src="'+data.data.owner_image+'">');        
        $('#lbl_first_name').html(data.data.first_name);
        $('#lbl_last_name').html(data.data.last_name);
        $('#lbl_address').html(data.data.address);
        if(data.data.postal_code == 0)
          $('#lbl_postal_code').html('');
        else
          $('#lbl_postal_code').html(data.data.postal_code);

        if(data.data.date_of_birth == '0000-00-00')
          $('#lbl_date_of_birth').html('');
        else
          $('#lbl_date_of_birth').html(getFormatDate(data.data.date_of_birth));

        var sharingPhones = 0;
        var sharingCv = 0;    
        var sharingCvHtml = '';
        var sharingPhoneHtml = '';
        var sharePhone = '';
        var shareCv = '';

        if(data.data.phone != '')
        {
          if(data.data.phone_access)
          {
            sharePhone = '';
          }
          else
          {
            sharePhone = '<a style="padding:0px 4px;" class="btn btn-primary sharebtn" onclick="sharePrimaryInfo(\''+ candidateId +'\', \'phone\');" href="javascript:void(0);">Share</a>';
          }

          sharingPhoneHtml += '<tr><td style="color:#000;width:100px;">'+ data.data.owner +'</td><td>' + data.data.phone + sharePhone + ' </td></tr>';
        }

        if(data.data.cv_path != '')
        {
          if(data.data.cv_access)
          {
            shareCv = '';
          }
          else
          {
            shareCv = '<a style="padding:0px 4px;" class="btn btn-primary sharebtn" onclick="sharePrimaryInfo(\''+ candidateId +'\', \'cv\');" href="javascript:void(0);">Share</a>';
          }

          if(data.data.cv_url == 'Restricted' || data.data.cv_url == '')
          {
            sharingCvHtml += '<tr><td style="color:#000;width:100px;">'+ data.data.owner +'</td><td> ' + shareCv + ' </td></tr>';
          }
          else
          {
            sharingCvHtml += '<tr><td style="color:#000;width:100px;">'+ data.data.owner +'</td><td>' + '<a target="_blank" href="https://docs.google.com/viewer?url='+data.data.cv_url+'"><i class="fa fa-eye"></i> Preview </a> | <a target="_blank" href="'+data.data.cv_url+'"><i class="fa fa-save"></i> Download </a> ' + ' Updated At:' + getFormatDate(data.data.cv_updated_at) +' </td></tr>';
          }
        }

        if(!data.data.email_access)
        {
          $('#email_submit').show();
          $('#email_submit').attr('onclick', 'sharePrimaryInfo(\''+ candidateId +'\', \'email\');');
        }

        $(data.data.candidate_sharing).each(function(index, candidate_share) {
          if(candidate_share != '')
          {
            if(candidate_share.field_type == 'phone')
            {
              if(candidate_share.owner == '0')
                sharePhone = '<a style="padding:0px 4px;" class="btn btn-primary sharebtn" onclick="shareSecInfo('+candidate_share.id+', \'phone\');" href="javascript:void(0);">Share</a>';
              else
                sharePhone = '';

              sharingPhoneHtml += '<tr><td style="color:#000;width:100px;">'+ candidate_share.user_name +'</td><td>' +candidate_share.data_field +  sharePhone + ' </td></tr>';
              sharingPhones++;

            }


            if(candidate_share.field_type == 'cv')
            {
              if(candidate_share.owner == '0')
                shareCv = '<a style="padding:0px 4px;" class="btn btn-primary sharebtn" onclick="shareSecInfo(\''+ candidate_share.id +'\', \'cv\');" href="javascript:void(0);">Share</a>';
              else
                shareCv = '<a target="_blank" href="https://docs.google.com/viewer?url='+candidate_share.cv_url+'"><i class="fa fa-eye"></i> Preview </a> | <a target="_blank" href="'+candidate_share.cv_url+'"><i class="fa fa-save"></i> Download </a> ';

              sharingCvHtml += '<tr><td style="color:#000;width:100px;">'+ candidate_share.user_name +'</td><td>'  +  shareCv + ' </td></tr>';
              sharingCv++;

            }            
          }
        });

        if(data.data.is_owner)
        {
          $('#lbl_home_number').html(data.data.home_number);
          $('#lbl_email').html(data.data.email);
          $('#lbl_phone').html(data.data.phone);
          // if(data.data.cv_url != '')
          //   $('#lbl_cv').html('<a target="_blank" href="https://docs.google.com/viewer?url='+data.data.cv_url+'"><i class="fa fa-eye"></i> Preview </a> | <a target="_blank" href="'+data.data.cv_url+'"><i class="fa fa-save"></i> Download </a> ' + ' Updated At:' + getFormatDate(data.data.cv_updated_at));
          $('#lbl_unlock_btn').hide();          
        }
        else
        {
          // show add phone number
          if(sharingPhones < 2 && data.data.is_owner === false)
          {
            sharingPhoneHtml += '<tr><td colspan="2"><input type="text" style="display:none;" id="sharing_phone_number"><a style="display:none;" id="sharing_phone_save" href="javascript:void(0);" class="btn btn-primary" onclick="saveSharing(\'phone\');">Save</a>  <a onclick="showAddPhone();" id="add_phone_btn" href="javascript:void(0);">Add Phone</a></td></tr>';
          }

          // show add phone number
          if(sharingCv < 1 && data.data.is_owner === false)
          {
            sharingCvHtml += '<tr><td colspan="2"><input type="file" id="cv" name="cv" data-url="api/cv_upload" class="file-pos"><span id="cv_name"></span>\
                  <input type="hidden" value="" id="cv_path"><a style="display:block;width:100px;" id="sharing_cv_save" href="javascript:void(0);" class="btn btn-primary" onclick="saveSharing(\'cv\');">Save</a></td></tr>';
          }

          $('#lbl_unlock_btn').show();

          $('#lbl_unlock_btn').show();
          var accesshtml = ''; //Restricted
          $('#lbl_email').html(data.data.email);
          $('#lbl_phone').html(data.data.phone);
          $('#lbl_cv').html(data.data.cv_url);
          $('#lbl_home_number').html(data.data.home_number);
        }

        $('#phone_sharing').html(sharingPhoneHtml);
        $('#cv_sharing').html(sharingCvHtml);

        // initialize loader
        $('#cv').fileupload({
          dataType: 'json',
          done: function (e, data) {
            $('#cv_path').val(data.result.file_name);
            $('#cv').hide();
            $('#cv_name').show().html('<a target="_blank" href="api/cv_download?cv_path='+data.result.file_name+'">'+data.result.real_file_name+'</a>');
//            $('#removeCv').show();
          }
        });        



        $('#lbl_nric').html(data.data.nric);
        $('#lbl_citizen').html(data.data.citizen);


        if(data.data.gender == 'male')
          $('#lbl_gender').html('Male');
        else if(data.data.gender == 'female')
          $('#lbl_gender').html('Female');

       if(data.data.marital_status == 'single')
          $('#lbl_marital_status').html('Single');
        else if(data.data.marital_status == 'married')
          $('#lbl_marital_status').html('Married');
        else if(data.data.marital_status == 'divorced')
          $('#lbl_marital_status').html('Divorced');

        $('#lbl_nationality').html(data.data.nationality);
        if(data.data.notice_period_number > 0)
          $('#lbl_notice_period').html(data.data.notice_period_number + ' ' + data.data.period_type);
        else
          $('#lbl_notice_period').html('');

        $('#lbl_race').html(data.data.race);
        $('#lbl_religion').html(data.data.religion);
        $('#lbl_remarks').html(data.data.remarks);

        $('#lbl_tags').html(data.data.tags);

        $('#lbl_highest_qualification').html(data.data.highest_qualification);

        // if(data.data.cv_path != '' && data.data.cv_path != null)
        // {
        //   $('#cv_path').val(data.data.cv_path);
        //   $('#cv').hide();
        //   $('#cv_name').show().html('<a target="_blank" href="api/cv_download?cv_path='+data.data.cv_path+'">View CV</a>');
        //   $('#removeCv').show();          
        // }

        // populate company
        var companyHtml = '';
          $(data.data.companies).each(function(index, company) {
            var seperator = '';
            if(company.from_date != '' && company.to_date != '')
              seperator = '-';

            companyHtml += '<tr class="txtcolor"><td>'+ (index + 1) +'</td>\
                      <td>'+company.company_name+'</td>\
                      <td>'+numberWithCommas(company.basic_salary)+'</td>\
                      <td>'+ getFormatDate(company.from_date)  + ' '+seperator+' ' + getFormatDate(company.to_date) + '</td>\
                      <td>' + company.position + '</td></tr>';
          });

          $('#lbl_work_body').html(companyHtml);
      },
      error:function(){

      }
    });    
  }  

}

function deleteCandidate(candidateId)
{
  $.ajax({
      type: 'DELETE',
      dataType:"JSON",
      url: apiUrl + 'candidate',
      data: {candidate_id: candidateId},
      beforeSend:function(){

      },
      success:function(data){

        getCandidates(1);
        // if(data.status == 'success')
        // {
        //   $('#assignCandidatePopup').modal('hide');
        // }
      },
      error:function(){

      }
  });  
}

function getCandidates(page)
{
  var searchMode = $('input[name="search_mode"]:checked').val();

  $('#search_count').html('');

  var searchConsultantId = $.trim($('#search_consultant_id').val());
  var searchName = $.trim($('#search_name').val());
  var searchJobTitle = $.trim($('#search_job_title').val());
  var searchTags = $.trim($('#tags_field').val());
  var search = false;

  if(searchName != '' || searchJobTitle != '' || searchTags != '' || searchConsultantId != '')
    var search = true;

  var orderBy = $.trim($('#order_by').val());  
  var sortOrder = $.trim($('#sort_order').val());

  var limit = 10;
    $.ajax({
      type: 'get',
      url: apiUrl + 'candidates',
      data: {search_mode:searchMode,  limit: limit, page:page, search_name:searchName, search_job_title :searchJobTitle, search_tags: searchTags, sort_order:sortOrder, order_by:orderBy, search_consultant_id:searchConsultantId},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        var html = '';
        $('#search_spinner').hide();        
        if(typeof data.data.data != "undefined")
        {
          if(data.data.data.length)
          {
              if(search != '')
              {                
                $('#search_count').html(data.data.data.length + ' records found <button type="submit" class="btn btn-primary"><i class="fa fa-download"></i> Export Candidates</button>');
              }
              else
              {
                var totalPages = Math.ceil(data.data.pagination.total / limit);
              }


              $(data.data.data).each(function(index, candidate) {
                var editHtml = '';
                var assignHtml = '';
                var actions = '';
                var deleteHtml = '';
                var actions = '';
                var undeleteHtml = '';

                if(candidate.is_owner == true)
                {
                  editHtml = '<a href="add-candidate?candidate_id='+candidate.id+'">Edit</a>';
                }

                if(globalRoleType == 'admin')
                {
                  assignHtml = '<a onclick="getCandidateOwner(\''+candidate.id+'\')" data-toggle="modal" data-target="#assignCandidatePopup" href="javascript:void(0);">Assign to User</a>';
                }

                if(globalRoleType == 'admin' || candidate.is_owner)
                {
                  var deleteStr = 'Delete';

                  if(globalRoleType == 'admin')
                  {
                    if(candidate.deleted == '1')
                    {
                      deleteStr = 'Hard Delete';
                      undeleteHtml = ' <br> <a href="javascript:void(0);" onclick="showDelPopup(\''+candidate.id+'\', \'undelete\')">Undelete</a>';                      
                    }
                  }

                  deleteHtml = '<a href="javascript:void(0);" onclick="showDelPopup(\''+candidate.id+'\', \'candidate\')">'+deleteStr+'</a>';
                }

                if(editHtml != '' && assignHtml != '')
                  actions = editHtml+ ' <br> ' + assignHtml;
                else if(editHtml == '' || assignHtml == '')
                  actions = editHtml+ assignHtml;

                if(actions != '' && deleteHtml !='')
                  actions += ' <br> ' + deleteHtml;
                else
                  actions += deleteHtml;
                actions += undeleteHtml;


                html += '<tr><td><a onclick="getCandidateDetail(\''+candidate.id+'\');" data-toggle="modal" data-target="#candidate_detail" href="javascript:void(0);">'+ candidate.first_name + ' '+  candidate.last_name+ '</a><br>'+candidate.linktrix_id+'</td>\
                            <td>'+candidate.owner+'</td>\
                            <td>'+candidate.email+'</td>\
                            <td>'+candidate.company_name+'</td>\
                            <td>'+candidate.position+'</td>\
                            <td>'+numberWithCommas(candidate.basic_salary)+'</td>\
                            <td>'+actions+'</td>\
                            <tr>';

              });

            if(search != '')
            {
             $('#candidates_pagination').hide('');
            }
            else
            {
             $('#candidates_pagination').show();
              $('#candidates_pagination').twbsPagination({
                totalPages: totalPages,
                visiblePages: 7,
                onPageClick: function (event, page) {
                  getCandidates(page);
                }
              });              
            }
          
          }


        }

        if(html == '')
          html = '<tr><td colspan="7" align="center">No Candidate found</td></tr>';

        $('#candidates_body').html(html);

      },
      error:function(){

      }
    });    
}

function undeleteCandidate(id)
{
  $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'undelete_candidate',
      data: {candidate_id: id},
      beforeSend:function(){

      },
      success:function(data){

        getCandidates(1);
        if(data.status == 'success')
        {
          showMsg('#user_msg', 'User undeleted successfully', 'green');          
        }
        else
        {
          showMsg('#user_msg', 'Some problem occured while undeleting this candidate.', 'red');          
        }

      },
      error:function(){

      }
  });    
}

function searchCandidates()
{
    fillSort('asc');  
    $('#search_spinner, #reset').show();
    getCandidates(1);
}

function getCandidate(candidateId)
{
  if(candidateId != '')
  {
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'candidate',
      data: {candidate_id: candidateId},
      beforeSend:function(){

      },
      success:function(data){
        cvUpdateAt = '';
        $('#candidate_id').val(data.data.id);
        $('#consultant_id').val(data.data.creator_id);        
//        $('#consultant_id').selectpicker('refresh');
        getConsultant(data.data.id);
        $('#first_name').val(data.data.first_name);
        $('#last_name').val(data.data.last_name);
        $('#last_name').val(data.data.last_name);
        $('#address').val(data.data.address);
        $('#postal_code').val(data.data.postal_code);
        $('#phone').val(data.data.phone);

        if(data.data.date_of_birth != '0000-00-00')
          $('#date_of_birth').val(getFormatDate(data.data.date_of_birth));

        $('#email').val(data.data.email);
        $('#nric').val(data.data.nric);
        $('#citizen').val(data.data.citizen);
        $('#home_number').val(data.data.home_number);

        if(data.data.gender == 'male')
          $('#male').prop('checked', true);
        else if(data.data.gender == 'female')
          $('#female').prop('checked', true);

       if(data.data.marital_status == 'single')
          $('#single').prop('checked', true);
        else if(data.data.marital_status == 'married')
          $('#married').prop('checked', true);
        else if(data.data.marital_status == 'divorced')
          $('#divorced').prop('checked', true);

        $('#nationality').selectpicker('val', data.data.nationality);
        $('#notice_period_number').val(data.data.notice_period_number);
        $('#period_type').val(data.data.period_type);        

        $('#race').selectpicker('val', data.data.race);
        $('#religion').selectpicker('val', data.data.religion);
        $('#tags_field').val(data.data.tags);

        $('#highest_qualification').val(data.data.highest_qualification);
        $('#remarks').val(data.data.remarks);
        if(data.data.cv_path != '' && data.data.cv_path != null)
        {
          $('#cv_path').val(data.data.cv_path);
          $('#cv').hide();
          if(data.data.cv_updated_at != null)
            $('#cv_update').html(' (Update At: ' + getFormatDate(data.data.cv_updated_at) + ')')

          $('#cv_name').show().html('<a target="_blank" href="../storage/app/cv/'+data.data.cv_path+'">View CV</a>');
          $('#removeCv').show();          
        }


        // Reintilize tags
        getTags();        


        // populate company
          $(data.data.companies).each(function(index, company) {
            $('.company_name:eq( '+index+' )').val(company.company_name);
            $('.basic_salary:eq( '+index+' )').val(company.basic_salary);
            $('.from_date:eq( '+index+' )').val(getFormatDate(company.from_date));
            $('.to_date:eq( '+index+' )').val(getFormatDate(company.to_date));
            $('.position:eq( '+index+' )').val(company.position);            
          });
      },
      error:function(){

      }
    });    
  }
}

function getCandidateOwner(candidate_id)
{
  getConsultant(candidate_id);
  getOwner(candidate_id, 1);
  getOwner(candidate_id, 2);
  getOwner(candidate_id, 3);
  getOwner(candidate_id, 4);  
}

function getOwner(candidate_id, type)
{
  $('#candidate_id').val(candidate_id);
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'candidate_owner',
      data: {candidate_id: candidate_id, role_id:type},
      beforeSend:function(){

      },
      success:function(data){
          var html = '';
          $(data.data).each(function(index, user) {
              var selected = '';
              if(user.selected)
                selected = 'selected="selected"'
              html += '<option value="'+user.id+'" '+selected+'>'+user.name+'</option>'
          });

          $('#role' + type).html(html);
          $('#role' + type).selectpicker('refresh');
      },
      error:function(){

      }
    });
}

function changeCreator()
{
  var candidateId = $('#candidate_id').val();
  var consultantId = $('#consultant_id').val();    
    $.ajax({
      type: 'post',
      url: apiUrl + 'change_creator',
      data: {candidate_id: candidateId, creator_id:consultantId},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          $('#assignCandidatePopup').modal('hide');
        }
      },
      error:function(){

      }
    });    

}

function getConsultant(candidateId)
{
    $.ajax({
      type: 'get',
      url: apiUrl + 'allusers',
      data: {candidate_id: candidateId},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(candidateId == '')
          var html = '<option value="">--Select Candidate Holder--</option>';
        else 
          var html = ''; 

        var adminhtml = '';
        var supervisorhtml = '';
        var consultanthtml = '';
        var assistanthtml = '';

        if(typeof data.users != "undefined")
        {
          if(data.users.length)
          {
              $(data.users).each(function(index, user) {

                if(data.creater_id == user.id)
                  var selected = 'selected="selected"';
                else
                  var selected = '';
                if(user.role_id == 1)
                  adminhtml += '<option '+selected+' value="'+user.id+'">'+user.name+'</option>';

                if(user.role_id == 2)
                  supervisorhtml += '<option '+selected+' value="'+user.id+'">'+user.name+'</option>';

                if(user.role_id == 3)
                  consultanthtml += '<option '+selected+' value="'+user.id+'">'+user.name+'</option>';                

                if(user.role_id == 4)
                  assistanthtml += '<option '+selected+' value="'+user.id+'">'+user.name+'</option>';
              });
          }
        }

        if(adminhtml != '')
          adminhtml = '<optgroup label="Admin">' + adminhtml + '</optgroup>';
        if(supervisorhtml != '')
          supervisorhtml = '<optgroup label="Supervisor">' + supervisorhtml + '</optgroup>';
        if(consultanthtml != '')
          consultanthtml = '<optgroup label="Consultant">' + consultanthtml + '</optgroup>';
        if(assistanthtml != '')
          assistanthtml = '<optgroup label="Assistant">' + assistanthtml + '</optgroup>';

        html += adminhtml + supervisorhtml + consultanthtml + assistanthtml;

        $('#consultant_id, #search_consultant_id').html(html);


        $('#consultant_id, #search_consultant_id').selectpicker('refresh');
      },
      error:function(){

      }
    });    
}

function addCandidateOwner()
{
  var candidateId = $('#candidate_id').val();
  var admin = []; 
  $('#role1 :selected').each(function(i, selected){ 
    admin[i] = $(selected).val(); 
  });

  var supervisor = []; 
  $('#role2 :selected').each(function(i, selected){ 
    supervisor[i] = $(selected).val(); 
  });

  var consultant = []; 
  $('#role3 :selected').each(function(i, selected){ 
    consultant[i] = $(selected).val(); 
  });

  var assistant = []; 
  $('#role4 :selected').each(function(i, selected){ 
    assistant[i] = $(selected).val(); 
  });


    $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'candidate_owner',
      data: {candidate_id: candidateId, admin:admin, supervisor:supervisor, consultant:consultant, supervisor:supervisor, assistant:assistant},
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          $('#assignCandidatePopup').modal('hide');
        }
      },
      error:function(){

      }
    });





}

