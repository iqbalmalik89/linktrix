// Event Binding
$( document ).ready(function() {
  $( "#addUserPopupButton" ).click(function() {
    showAddUserPopup(0);
  });

  $( "#addUpdateUserButton" ).click(function() {
    addUpdateUser();
  });

  $( "#addConsultantsButton" ).click(function() {
    addSupervisorConsultants();
  });
});

function addSupervisorConsultants()
{
  var userId = $('#user_id').val();
  var consultantIds = [];
  $('.supervisor_ids:checkbox:checked').each(function (index, user) {
    consultantIds.push(user.value);
  });

  if(consultantIds.length > 0)
  {
    $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'supervisor_consultants',
      data: { user_id: userId, consultants:consultantIds},
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          $('#user_id').val('');
          $('#consultantsPopup').modal('hide');
        }
        else
        {
          showMsg('#consultant_msg', data.message, 'red');
        }
      },
      error:function(){

      }
    });
  }
  else
  {
    showMsg('#consultant_msg', 'Please select at least one consultant', 'red');
  }

}

function resetAddUserForm()
{
  $('#role_id option:first-child').attr("selected", "selected");
  $('body input').removeClass('error-class');
  $('#user_name, #email, #user_id, #pic_path, #email, #contact_number').val('');
  $('#temp_pic').attr('src', 'admin_asset/images/avatar.jpg');
}

function getUser(userId)
{
  if(userId > 0)
  {
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'user',
      data: { user_id: userId},
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          $('#user_id').val(userId);
          $('#role_id').val(data.data.role_id);
          $('#user_name').val(data.data.name);
          $('#email').val(data.data.email);
          $('#contact_number').val(data.data.contact_number);
          $('#pic_path').val(data.data.pic);
          $('#temp_pic').attr("src", data.data.url)   
        }
      },
      error:function(){

      }
    });

  }

}

function showAddUserPopup(userId)
{
  resetAddUserForm();
  if(userId > 0)
  {
    getUser(userId);
    $('#user_id').val(userId);  
    $('#popupLabel').html('Update User');
  }
  else
  {
    $('#popupLabel').html('Add User');
  }


}

function getSupervisorConsultants(userId, edit)
{
  if(edit)
    $('#addConsultantsButton').show();
  else
    $('#addConsultantsButton').hide();

  $('#user_id').val(userId);
  if(userId > 0)
  {
    $.ajax({
      type: 'GET',
      dataType:"JSON",
      url: apiUrl + 'get_consultants',
      data: { user_id: userId, edit:edit},
      beforeSend:function(){

      },
      success:function(data){
        var html = '';
        if(data.status == 'success')
        {
          $(data.data).each(function(index, user) {
            var checked = '';
            var checkbox = '';

            if(user.is_consultant)
              checked = "checked='checked'";

            if(edit)
              checkbox = '<input '+checked+' class="supervisor_ids" value="'+user.id+'" type="checkbox" style="margin-right:10px;">';

            html += '<div class="col-lg-3">\
                <div class="panel">'+checkbox+'<img class="img-circle" style="width:70px;height:70px;" src="'+user.url+'">\
                  <div class="panel-body">'+user.name+'</div>\
                </div>\
              </div>';
          });

        }
        else
        {
          html = '<span style="margin-left:200px;">No consultant associated with this supervisor.</span>';
        }

        $('#manage_consultants_container').html(html);
      },
      error:function(){

      }
    });    
  }  
}

function changeUserStatus(userId, status)
{
  if(userId > 0)
  {
    $.ajax({
      type: 'post',
      dataType:"JSON",
      url: apiUrl + 'user_status',
      data: { user_id: userId, status:status},
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          var msg = '';
          if(status)
            msg = 'User enabled successfully.';
          else
            msg = 'User disabled successfully';

          showMsg('#user_msg', msg, 'green');
          getAllTypeUsers();
        }
        else
        {
          showMsg('#user_msg', data.message, 'red');
        }
      },
      error:function(){

      }
    });    
  }
}

function getUsers(page, roleId)
{
  var limit = 10;
    $.ajax({
      type: 'get',
      url: apiUrl + 'users',
      data: { limit: limit, page:page, role_id: roleId},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        var html = '';

        if(typeof data.data != "undefined")
        {
          if(data.data.length)
          {
              var totalPages = Math.ceil(data.pagination.total / limit);

              $(data.data).each(function(index, user) {
                var editHtml = '';
                var status = '1';
                var ban = 'Enable';
                var manageConsultants = '';
                var viewConsultants = '';
                if(user.role_id == 2)
                {
                  manageConsultants = '<a data-toggle="modal" data-target="#consultantsPopup" href="javascript:void(0);" onclick="getSupervisorConsultants('+user.id+', 1);">Manage Consultants</a> | ';
//                  if(GlobalUserId == user.id)
                   viewConsultants = '<a style="float:right;" data-toggle="modal" data-target="#consultantsPopup" href="javascript:void(0);" onclick="getSupervisorConsultants('+user.id+', 0);">View Consultants</a>';
                }

                if(globalRole == 'admin')
                {
                  if(user.status == 0)
                  {
                    ban = 'Enable';
                    status = 1;
                  }
                  else
                  {
                    status = 0;
                    ban = 'Disable';
                  }
                  $('.action_links').show();
                  editHtml = '<td>' + manageConsultants + '<a href="javascript:void(0);" data-toggle="modal" data-target="#adduserPopup"  onclick="showAddUserPopup('+user.id+')">Edit</a> | <a href="javascript:void(0);" onclick="showDelPopup('+user.id+', \'user\')">Delete</a> | <a href="javascript:void(0);" onclick="changeUserStatus('+user.id+', '+status+')">'+ ban + ' </a></td>';
                }

                if(globalRole == 'admin')
                {
                  if(user.id == 1)
                    editHtml = '<td>Super Admin</td>';                  
                }


                html += '<tr><td><img class="img-circle" width="50" height="50" src="'+user.url+'"> ' + user.name + viewConsultants + ' </td>\
                            <td>'+user.email+'</td>\
                            <td>'+user.contact_number+'</td>\
                            '+ editHtml +'\
                            <tr>';
              });

            $('#pagination' + roleId).twbsPagination({
              totalPages: totalPages,
              visiblePages: 7,
              onPageClick: function (event, page) {
                getUsers(page, roleId);
              }
            });          
          }


        }

        if(html == '')
          html = '<tr><td colspan="4" align="center">No users found</td></tr>';

        $('#body' + roleId).html(html);

      },
      error:function(){

      }
    });    
}

function getAllTypeUsers()
{
  getUsers(1, 1)
  getUsers(1, 2)  
  getUsers(1, 3)
  getUsers(1, 4)  
}

function deleteUser(userId)
{
  if(userId > 0)
  {
    $.ajax({
      type: 'DELETE',
      dataType:"JSON",
      url: apiUrl + 'user',
      data: { user_id: userId},
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          showMsg('#user_msg', data.message, 'green');
          getAllTypeUsers();
        }
        else
        {
          showMsg('#user_msg', data.message, 'red');
        }
      },
      error:function(){

      }
    });    
  }
}

function addUpdateUser()
{
  $('body input').removeClass('error-class');
  var name = $.trim($('#user_name').val());  
  var roleId = $.trim($('#role_id').val());    
  var userId = $.trim($('#user_id').val());    
  var email = $.trim($('#email').val());    
  var contactNumber = $.trim($('#contact_number').val());      
  var picPath = $.trim($('#pic_path').val());      
  var check = true;
  
  if(name == '')
  {
    $('#user_name').addClass('error-class').focus();
    check = false;
  }

  if(email == '')
  {
    $('#email').addClass('error-class').focus();
    check = false;
  }

  if(contactNumber == '')
  {
    $('#contact_number').addClass('error-class').focus();
    check = false;
  }

  if(check)
  {
    $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'user',
      data: { user_id: userId, email: email, name:name, contact_number:contactNumber, pic_path: picPath, role_id : roleId },
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          $('#adduserPopup').modal('hide');          
          getAllTypeUsers();
        }
        else
        {
          showMsg('#email_msg', data.message, 'red');
        }
      },
      error:function(){

      }
    });

  }



}