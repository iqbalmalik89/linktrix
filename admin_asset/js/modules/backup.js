// Event Binding
$( document ).ready(function() {
  $( "#createBackupPopupButton" ).click(function() {
    createBackup();
  });

});

function createBackup()
{
    $('#backupspinner').show();
    $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'backup',
      data: {},
      beforeSend:function(){

      },
      success:function(data){
        $('#backupspinner').hide();        
        if(data.status == 'success')
        {
          showMsg('#backup_msg', data.message, 'green');
          getAllBackups(1);
        }
        else
        {
          showMsg('#backup_msg', data.message, 'red');
        }
      },
      error:function(){

      }
    });

}

function changeBackupStatus(id, status)
{

    $.ajax({
      type: 'POST',
      dataType:"JSON",
      url: apiUrl + 'backup_status',
      data: {id:id, status:status},
      beforeSend:function(){

      },
      success:function(data){

        if(data.status == 'success')
        {
          showMsg('#backup_msg', data.message, 'green');
          getAllBackups(1)
        }
        else
        {
          showMsg('#backup_msg', data.message, 'red');
        }
      },
      error:function(){

      }
    });

}


function getAllBackups(page)
{
  var limit = 10;
    $.ajax({
      type: 'post',
      url: apiUrl + 'backups',
      data: { limit: limit, page:page},
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

              $(data.data).each(function(index, backup) {

                html += '<tr><td><a target="_blank" href="api/downloadbackup?file='+backup.path+'">'+backup.path+'</a></td>\
                            <td>'+backup.created_by_name+'</td>\
                            <td>'+getFormatDate(backup.date_created)+'</td>\
                            <td><a onclick="changeBackupStatus('+backup.id+', 0);" href="javascript:void(0);">Archive</a></td>\
                            <tr>';
              });

            $('#pagination').twbsPagination({
              totalPages: totalPages,
              visiblePages: 7,
              onPageClick: function (event, page) {
                getBackups(page);
              }
            });          
          }


        }

        if(html == '')
          html = '<tr><td colspan="4" align="center">No Backup found</td></tr>';

        $('#backup').html(html);

      },
      error:function(){

      }
    });    
}

