$(document).ready(() => {
  let navShow = () => {
    $('.nav').addClass('nav-active');
    $('.nav-toggle').addClass('toggle-active');
  };
  $('.nav-toggle').click(navShow);

  let navHide = () => {
    $('.nav').removeClass('nav-active');
    $('.nav-toggle').removeClass('toggle-active');
  };
  $('.nav-close').click(navHide);
  $('html, body').click(navHide);

  $('.nav, .nav-toggle').click(event => event.stopPropagation());

  $(document).bind('mousewheel', () => {
    $('.arts').addClass('animations-active');
    $('.bubbles').addClass('bubbles-active').delay(500).queue(() => {
      $(this).addClass('bubbles-overflow');
    });
  });
});