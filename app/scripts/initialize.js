import {Post, PostsService} from './posts';
import {BubbleType, Bubble, BubblesService} from './bubbles';
import {BubbleNodesService} from './bubbleNodes';

function debounce(func, threshold, execAsap) {
  let timeout;

  return function debounced () {
    let obj = this, args = arguments;
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

let postSrv;
let bubbleSrv;
let bubbleNodesSrv;

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

  let parent = $('.bubbles');

  postSrv = new PostsService();
  let posts = postSrv.process();

  bubbleSrv = new BubblesService(posts, parent.width());
  let bubbles = bubbleSrv.process();

  bubbleNodesSrv = new BubbleNodesService(bubbles, document.querySelector('.bubbles'));
  let bubblesNodes = bubbleNodesSrv.process();

  /*
  $(window).on('resize', debounce(() => {
    bubblesNodes.updateNodeDim();
  }, 600, false));
  */

  let lastScroll = 0;

  let screenHeight = $(window).height();

  let filterVisible = function() {
    let elm = $(this);
    let top = elm.offset().top;

    let seeY1 = parent.scrollTop();
    let seeY2 = screenHeight + seeY1;

    return (top + elm.height() >= seeY1 && top <= seeY2);
  };

  parent.bind('scroll', () => {
    let scrolledBase = parent.scrollTop();
    let scrollDiff = scrolledBase - lastScroll;
    lastScroll = scrolledBase;

    let scrolled = (0 - (scrolledBase * .2));
    $('.bubble_type_l').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');

    scrolled = (0 - (scrolledBase * .4));
    $('.bubble_type_m').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');

    scrolled = (0 - (scrolledBase * .6));
    $('.bubble_type_s').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');
  });

  //$('.footer').bind('scroll', event => event.stopImmediatePropagation());
});