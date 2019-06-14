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
});
