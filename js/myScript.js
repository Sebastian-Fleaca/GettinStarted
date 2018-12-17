$(document).ready(function() {
  $("#getSubmission").click(function(){
    $.ajax({
      url: "http://localhost:3000/submissions",
      type: "GET",
      //data: data,
      success: function(result){
        console.log(result);
        $("#subs").html(result);
      },
      error: function(error){
        $('#subs').html(error);
        console.log(error);
      }
    });
  });
});