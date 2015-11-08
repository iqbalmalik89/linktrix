// Event Binding
$( document ).ready(function() {

  $( "#showRacePopup" ).click(function() {
    $('#race, #race_id').val('');
  });

  $( "#saveRace" ).click(function() {
    addUpdateRace();
  });

});



function addUpdateRace()
{
  var race = $.trim($('#race').val());
  var race_id = $.trim($('#race_id').val());
  if(race_id == '' || race_id == 0)
  {
    var method = 'POST';
  }
  else
  {
    var method = 'PUT';
  }

  if(race =='')
  {
    $('#race').addClass('error-class');
    $('#race').focus();
  }
  else
  {
    $.ajax({
      type: method,
      url: apiUrl + 'races',
      data: {race_id:race_id ,race: race},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        if(data.status == 'success')
        {
          getAllRaces();
          $('#RacePopup').modal('hide');  
        }
        else
        {
          showMsg('#race_msg', 'This race already exists in database', 'red');          
        }

      },
      error:function(){

      }
    });    
  }

}

function deleteRace(raceId)
{
    $.ajax({
      type: 'delete',
      url: apiUrl + 'races/' + raceId,
      data: {},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        getAllRaces();
      },
      error:function(){

      }
    });        
}

function getRace(raceId)
{
    $('#race_id').val(raceId);
    $.ajax({
      type: 'get',
      url: apiUrl + 'races/' + raceId,
      data: {},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        $('#race_id').val(data.data.id);
        $('#race').val(data.data.race);
      },
      error:function(){

      }
    });      
}

function getAllRaces()
{
    $.ajax({
      type: 'get',
      url: apiUrl + 'races',
      data: {},
      dataType:"JSON", 
      beforeSend:function(){

      },
      success:function(data){
        var html = '';

        if(data.status == 'success')
        {
          $(data.data).each(function(index, race) {
            html += '<tr><td>'+race.id+'</td><td>'+race.race+'</td><td><a href="javascript:void(0);" data-toggle="modal" data-target="#RacePopup" onclick="getRace(\''+race.id+'\')">Edit</a> | <a href="javascript:void(0);" onclick="deleteRace(\''+race.id+'\')">Delete</a></td>\
            </tr>';
          });          
        }

        if(html == '')
        {
            html += '<tr><td style="text-align:center;  " colspan="3"> No Races Found </td></tr>';
        }
        $('#racebody').html(html);
      },
      error:function(){
            html = '<tr><td colspane="3"> No Races Found </td></tr>';
            $('#racebody').html(html);

      }
    });      
}
