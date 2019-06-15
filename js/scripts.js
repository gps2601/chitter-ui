let userId;
let sessionKey;

function loadTweets() {
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
}

$(document).ready(() => {
  loadTweets();

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
        $('#tweetbox').show();
      },
    });
  });

  $('#signupSubmit').submit((event) => {
    event.preventDefault();
    const username = $('#su_uname').val();
    const pass = $('#su_pass').val();

    $.ajax({
      type: 'POST',
      url: 'https://chitter-backend-api.herokuapp.com/users',
      data: JSON.stringify({ user: { handle: username, password: pass } }),
      contentType: 'application/json',
      success() {
        $('.dropdown.open .dropdown-toggle').dropdown('toggle');
      },
    });
  });

  $('#tweetbox_button').click((event) => {
    event.preventDefault();
    const peepText = $('#tweetbox_text').val();

    $.ajax({
      type: 'POST',
      url: 'https://chitter-backend-api.herokuapp.com/peeps',
      headers: {
        Authorization: `Token token=${sessionKey}`,
      },
      data: JSON.stringify({ peep: { user_id: userId, body: peepText } }),
      contentType: 'application/json',
      success() {
        $( "#peepsList" ).empty();
        loadTweets();
      },
    });
  });
});
