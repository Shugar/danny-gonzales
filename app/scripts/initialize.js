import {fillPosts, setBubbles, bubbles} from './posts';

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

  fillPosts();
  setBubbles();

  let parentElem = document.querySelector('.bubbles');

  for (let bubble of bubbles) {
    let elm = document.createElement('div');
    elm.className = 'bubble';
    elm.style.left = bubble.x - bubble.radius;
    elm.style.top = bubble.y - bubble.radius;
    elm.style.width = bubble.radius * 2;
    elm.style.height = bubble.radius * 2;

    parentElem.appendChild(elm);
    bubbleElms.push(elm);
  }

});