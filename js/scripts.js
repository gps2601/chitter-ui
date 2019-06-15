let userId;
let sessionKey;

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

  $('#loginSubmit').submit((event) => {
    event.preventDefault();
    const username = $('#li_uname').val();
    const pass = $('#li_pass').val();

    $.ajax({
      type: 'POST',
      url: 'https://chitter-backend-api.herokuapp.com/sessions',
      data: JSON.stringify({ session: { handle: username, password: pass } }),
      contentType: 'application/json',
      success(data) {
        userId = data.user_id;
        sessionKey = data.session_key;
        $('#loginStuff').hide();
        $('#loggedInStuffText').text(`You're logged in as user ${userId}`);
        $('#loggedInStuff').show();
      },
    });
  });
});
