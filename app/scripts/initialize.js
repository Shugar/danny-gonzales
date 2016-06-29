import {PostsService} from './posts';
import {BubblesService} from './bubbles';
import {BubbleNodesService} from './bubbleNodes';


let screenHeight = 0;

let postSrv;
let bubbleSrv;
let bubbleNodesSrv;

let bubblesParent;


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

function filterVisible() {
  let elm = $(this);
  let top = elm.offset().top;

  let seeY1 = bubblesParent.scrollTop();
  let seeY2 = screenHeight + seeY1;

  return (top + elm.height() >= seeY1 && top <= seeY2);
}

function onScroll() {
  let scrolledBase = bubblesParent.scrollTop();

  let scrolled = (0 - (scrolledBase * .15));
  $('.bubble_type_l').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');

  scrolled = (0 - (scrolledBase * .3));
  $('.bubble_type_m').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');

  scrolled = (0 - (scrolledBase * .45));
  $('.bubble_type_s').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');
}


$(document).ready(() => {
  screenHeight = $(window).height();

  setMouseListeners();

  bubblesParent = $('.bubbles');

  postSrv = new PostsService();
  let posts = postSrv.process();

  bubbleSrv = new BubblesService(posts, bubblesParent.width());
  let bubbles = bubbleSrv.process();

  bubbleNodesSrv = new BubbleNodesService(bubbles, document.querySelector('.bubbles'));
  let bubblesNodes = bubbleNodesSrv.process();

  bubblesParent.bind('scroll', onScroll);

  /*
  $(window).on('resize', debounce(() => {
    bubblesNodes.updateNodeDim();
  }, 600, false));
  */

  //$('.footer').bind('scroll', event => event.stopImmediatePropagation());
});