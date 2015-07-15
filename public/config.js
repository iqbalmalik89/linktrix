var server = window.location.hostname;

var apiUrl = "";
if (server == 'localhost' || server == '127.0.0.1') {
    apiUrl = location.protocol + "//" + server + "/linktrix/public/api/";
} else {
    apiUrl = location.protocol + "//"+server+"/linktrix/public/api/";
}

function showMsg(id, msg, type)
{
	$(id).html(msg).addClass(type).slideDown('fast').delay(2500).slideUp(1000,function(){$(id).removeClass(type)});	
}

function scroll()
{
  var body = $("html, body");
  body.animate({scrollTop:0}, '500', 'swing', function() { 

  });
}

function getFormatDate(date)
{
  if(date != '' && date != '0000-00-00 00:00:00'  && date != '0000-00-00' && (typeof date != "undefined") && date != null)
  {
    var date_parts = date.split(" ");
    date = date_parts[0];

    var changedFormat = 'dd/mm/yy';

    var formattedDate = $.datepicker.formatDate(changedFormat, new Date(date));
    if(typeof date_parts[1] != "undefined")
      formattedDate += " " + date_parts[1];
    return formattedDate;   
  }
  else
  {
    return '';
  }
}

function showDelPopup(id, module)
{
  $("#confirm").on("show", function() {    // wire up the OK button to dismiss the modal when shown
        $("#confirm a.btn").on("click", function(e) {
            $("#confirm").modal('hide');     // dismiss the dialog
        });
    });
    
    $("#confirm").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
        $("#confirm").remove();
    });
    
    $("#confirm").modal({                    // wire up the actual modal functionality and show the dialog
      "backdrop"  : "static",
      "keyboard"  : true,
      "show"      : true                     // ensure the modal is shown immediately
    });

    if(module == 'user')
  		$('#confirm #delete').attr('onclick', 'deleteUser('+id+')')
    else if(module == 'candidate')
      $('#confirm #delete').attr('onclick', 'deleteCandidate(\''+id+'\')')




}