// Event Binding
$( document ).ready(function() {

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

  $('.default-date-picker').on('changeDate', function(ev){
      $(this).datepicker('hide');
  });

  $( "#removeCv" ).click(function() {
    removeCv();
  });

  

});

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
      data: {candidate_id:candidateId, first_name: firstName, last_name:lastName, email:email, address:address, 
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
              $('#first_name').val('')
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

function getTags()
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

      $('#tags_ul').tagit({
          availableTags: data.tags,
          // This will make Tag-it submit a single form value, as a comma-delimited field.
          singleField: true,
          singleFieldNode: $('#tags_field')
      });

      },
      error:function(){

      }
    });
}

function exportCandidates()
{
  var searchTerm = $.trim($('#search_term').val());
  if(searchTerm != '')
  {
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'export_candidates',
      data: {search_term: searchTerm},
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
  $('#search_term').val('');  
  getCandidates(1);
}

function unlockProfile()
{
  var candidateId = $('#candidate_id').val();
  $('#unlock_spinner').show();
  $('#unlock_btn').hide();
  $.ajax({
      type: 'post',
      dataType:"JSON",
      url: apiUrl + 'unlock_candidate',
      data: {candidate_id: candidateId},
      beforeSend:function(){

      },
      success:function(data){
      $('#unlock_spinner').hide()

        if(data.email != '')
        {
          $('#phone').html(data.phone);
          $('#email').html(data.email);
          $('#home_number').html(data.home_number);
          if(data.cv_url != '')
            $('#cv').html('<a target="_blank" style="text-decoration:underline;" href="'+data.cv_url+'"><i  style="text-decoration:underline;"class="fa fa-file"></i> Download CV</a> ' + ' Updated At:' + getFormatDate(data.cv_updated_at));
          else
            $('#cv').html('');

          showMsg('#unlock_msg', 'An email is sent to the origional owner.', 'green');
        }

      },
      error:function(){

      }
  });    
}

function getCandidateDetail(candidateId)
{
  $('#candidate_id').val(candidateId);
  $('#unlock_btn').hide();
  if(candidateId != '')
  {
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'candidate',
      data: {candidate_id: candidateId, access_check : "yes"},
      beforeSend:function(){

      },
      success:function(data){
        $('#cv').html('');
        $('#candidateName').html('<b>' + data.data.first_name + ' ' + data.data.last_name  +  '</b>');
        $('#lintrixk_id').html(data.data.linktrix_id);
        $('#first_name').html(data.data.first_name);
        $('#last_name').html(data.data.last_name);
        $('#last_name').html(data.data.last_name);
        $('#address').html(data.data.address);
        if(data.data.postal_code == 0)
          $('#postal_code').html('');
        else
          $('#postal_code').html(data.data.postal_code);

        if(data.data.date_of_birth == '0000-00-00')
          $('#date_of_birth').html('');
        else
          $('#date_of_birth').html(getFormatDate(data.data.date_of_birth));

        if(data.data.is_owner)
        {
          $('#home_number').html(data.data.home_number);
          $('#email').html(data.data.email);
          $('#phone').html(data.data.phone);
          if(data.data.cv_url != '')
            $('#cv').html('<a target="_blank" style="text-decoration:underline;" href="'+data.data.cv_url+'"><i  style="text-decoration:underline;"class="fa fa-file"></i> Download CV</a> ' + ' Updated At:' + getFormatDate(data.data.cv_updated_at));
        }
        else
        {
          $('#unlock_btn').show();          
          var accesshtml = 'Restricted';
          $('#email').html(accesshtml);
          $('#phone').html(accesshtml);
          $('#cv').html(accesshtml);  
          $('#home_number').html(accesshtml);
        }

        $('#nric').html(data.data.nric);
        $('#citizen').html(data.data.citizen);


        if(data.data.gender == 'male')
          $('#gender').html('Male');
        else if(data.data.gender == 'female')
          $('#gender').html('Female');

       if(data.data.marital_status == 'single')
          $('#marital_status').html('Single');
        else if(data.data.marital_status == 'married')
          $('#marital_status').html('Married');
        else if(data.data.marital_status == 'divorced')
          $('#marital_status').html('Divorced');

        $('#nationality').html(data.data.nationality);
        if(data.data.notice_period_number > 0)
          $('#notice_period').html(data.data.notice_period_number + ' ' + data.data.period_type);
        else
          $('#notice_period').html('');

        $('#race').html(data.data.race);
        $('#religion').html(data.data.religion);
        $('#remarks').html(data.data.remarks);

        $('#tags').html(data.data.tags);

        $('#highest_qualification').html(data.data.highest_qualification);

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
                      <td>'+company.basic_salary+'</td>\
                      <td>'+ getFormatDate(company.from_date)  + ' '+seperator+' ' + getFormatDate(company.to_date) + '</td>\
                      <td>' + company.position + '</td></tr>';
          });

          $('#work_body').html(companyHtml);
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
  $('#search_count').html('');
  var searchTerm = $.trim($('#search_term').val());
  var orderBy = $.trim($('#order_by').val());  
  var sortOrder = $.trim($('#sort_order').val());

  var limit = 10;
    $.ajax({
      type: 'get',
      url: apiUrl + 'candidates',
      data: { limit: limit, page:page, search_term:searchTerm, sort_order:sortOrder, order_by:orderBy},
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
              if(searchTerm != '')
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
                  deleteHtml = '<a href="javascript:void(0);" onclick="showDelPopup(\''+candidate.id+'\', \'candidate\')">Delete</a>';
                }

                if(editHtml != '' && assignHtml != '')
                  actions = editHtml+ ' | ' + assignHtml;
                else if(editHtml == '' || assignHtml == '')
                  actions = editHtml+ assignHtml;

                if(actions != '' && deleteHtml !='')
                  actions += ' | ' + deleteHtml;
                else
                  actions += deleteHtml;

                html += '<tr><td><a onclick="getCandidateDetail(\''+candidate.id+'\');" data-toggle="modal" data-target="#candidate_detail" href="javascript:void(0);">'+ candidate.first_name + ' '+  candidate.last_name+ '</a><br>'+candidate.linktrix_id+'</td>\
                            <td>'+candidate.owner+'</td>\
                            <td>'+candidate.email+'</td>\
                            <td>'+candidate.company_name+'</td>\
                            <td>'+candidate.position+'</td>\
                            <td>'+candidate.basic_salary+'</td>\
                            <td>'+actions+'</td>\
                            <tr>';

              });

            if(searchTerm != '')
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
          html = '<tr><td colspan="6" align="center">No Candidate found</td></tr>';

        $('#candidates_body').html(html);

      },
      error:function(){

      }
    });    
}

function searchCandidates(searchTerm)
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

