$(document).ready(() => {
  $('.nav-toggle').click(() => {
    $('.nav').addClass('nav-active');
    $('.nav-toggle').addClass('toggle-active');
  });

  $('.nav-close').click(() => {
    $('.nav').removeClass('nav-active');
    $('.nav-toggle').removeClass('toggle-active');
  });

  $('html, body').click(() => {
    $('.nav').removeClass('nav-active');
    $('.nav-toggle').removeClass('toggle-active');
  });

  $('.nav, .nav-toggle').click(event => {
    event.stopPropagation();
  });

  $(document).bind('mousewheel', () => {
    $('.arts').addClass('animations-active');
    $('.bubbles').addClass('bubbles-active').delay(500).queue(() => {
      $(this).addClass('bubbles-overflow');
    });
  });
});
  