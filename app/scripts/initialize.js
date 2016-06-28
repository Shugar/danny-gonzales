import {setPosts, setBubbles, setNodes, updateNodeDim,
  BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './posts';

function debounce(func, threshold, execAsap) {
  var timeout;

  return function debounced () {
    var obj = this, args = arguments;
    function delayed () {
      if (!execAsap)
        func.apply(obj, args);
      timeout = null;
    };

    if (timeout)
      clearTimeout(timeout);
    else if (execAsap)
      func.apply(obj, args);

    timeout = setTimeout(delayed, threshold || 100);
  };
}

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

$(document).ready(() => {
  setMouseListeners();

  setPosts();
  setBubbles($('.bubbles').width());
  setNodes(document.querySelector('.bubbles'));

  $(window).on('resize', debounce(() => {
    //setBubbles($('.bubbles').width());
    //updateNodeDim();
  }, 250, false));


  $('.bubbles').bind('scroll', () => {
    return;
    
    let scrolled = $('.bubbles').scrollTop();
    
    let offset = - scrolled * .25;
    $(BUBBLE_TYPE_XL).css('top', (0 - (scrolled * .25)) + 'px');
    $(BUBBLE_TYPE_L).css('top', (0 - (scrolled * .5)) + 'px');
    $(BUBBLE_TYPE_M).css('top', (0 - (scrolled * .75)) + 'px');
    //$(BUBBLE_TYPE_S).css('top', (0 - (scrolled * .9)) + 'px');
  });

});