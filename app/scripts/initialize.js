import {setPosts, setBubbles, setNodes} from './posts';

function setMouseListeners() {
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
    $('.art').addClass('animations-active');
    $('.bubbles').addClass('bubbles-active').delay(500).queue(() => {
      $(this).addClass('bubbles-overflow');
    });
  });
}

let bubbleElms = [];

$(document).ready(() => {
  setMouseListeners();

  setPosts();
  setBubbles($('.bubbles').width());
  setNodes(document.querySelector('.bubbles'));

});
