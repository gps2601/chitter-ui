var userId;
var sessionKey;

$(document).ready(() => {
  $.get('https://chitter-backend-api.herokuapp.com/peeps', (data) => {
    $.each(data, (index, value) => {
      $('#peepsList').append(
        `<div class="peep">
          <h3><img src="https://image.flaticon.com/icons/svg/69/69480.svg" style="max-width:20px;"> ${value.user.handle}  • ${getTimeValue(value.created_at)}</h3>
          <p>${value.body}</p>
        </div>`,
      );
    });
  });

  $("#loginSubmit").submit(function (event) {
    event.preventDefault();
    var username = $("#li_uname").val();
    var pass = $("#li_pass").val();
    console.log(username);
    console.log(pass);

    $.ajax({
      type: 'POST',
      url: 'https://chitter-backend-api.herokuapp.com/sessions',
      data: JSON.stringify({"session": {"handle": username, "password": pass}}),
      contentType: 'application/json',
      success: function (data) {
          userId = data.user_id;
          sessionKey = data.session_key;
      }
  });
  });
});
