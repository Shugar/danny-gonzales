import {PostsService, POST_TYPE_PROJECT, POST_TYPE_INSTAGRAM, POST_TYPE_PRESS} from './posts';
import {BubblesService} from './bubbles';
import {BubbleNodesService} from './bubbleNodes';
import {LightboxService} from './lightbox';


let screenHeight = 0;

let lightboxSrv;

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

  let filterPostsClick = type => {
    navHide();
    onFilterPosts(type);
  };

  $('.nav .home-link')    .click(() => filterPostsClick());
  $('.nav .projects-link').click(() => filterPostsClick(POST_TYPE_PROJECT));
  $('.nav .press-link')   .click(() => filterPostsClick(POST_TYPE_PRESS));
  $('.nav .gallery-link') .click(() => filterPostsClick(POST_TYPE_INSTAGRAM));
}

function setBioLightbox() {
  let bioLightboxShow = () => {
    $('.nav').removeClass('nav-active');
    $('.nav-toggle').removeClass('toggle-active');
    $('.bio-lightbox').addClass('lightbox-active')
  };

  let bioLightboxHide = () => {
    $('.bio-lightbox').removeClass('lightbox-active');
  };

  $('.nav .bio-link').click(bioLightboxShow);
  $('.bio-lightbox .close-button').click(bioLightboxHide);
}

function filterVisible() {
  let elm = $(this);
  let top = elm.offset().top;

  let seeY1 = bubblesParent.scrollTop();
  let seeY2 = screenHeight + seeY1;

  top += seeY1;

  return top + elm.height() >= seeY1 && top <= seeY2;
}

function onScroll() {
  let scrolledBase = bubblesParent.scrollTop();

  let scrolled = scrolledBase * .1;
  $('.bubble_type_xl').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');

  scrolled = (0 - (scrolledBase * .1));
  $('.bubble_type_m').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');

  scrolled = (0 - (scrolledBase * .2));
  $('.bubble_type_s').filter(filterVisible).css('transform', 'translate3d(0, ' + scrolled + 'px, 0)');
}

function scrollMagicInit() {
  window.controller = new ScrollMagic.Controller();

  let scene = new ScrollMagic.Scene({
    triggerElement: "body",
    triggerHook: 'onLeave'
  })
    .setTween('.footer', 0.5, {backgroundColor: "green", scale: 2.5})
    //.addIndicators({name: "1 (duration: 0)"})
    .addTo(window.controller);
}

function onFilterPosts(type) {
  let posts = postSrv.getFilteredPosts(type);
  let bubbles = bubbleSrv.process(posts);
  bubbleNodesSrv.process(bubbles);
}

$(document).ready(() => {
  screenHeight = $(window).height();

  setMouseListeners();
  setBioLightbox();
  //scrollMagicInit();

  bubblesParent = $('.bubbles');

  lightboxSrv = new LightboxService();

  postSrv = new PostsService();
  let posts = postSrv.process();

  bubbleSrv = new BubblesService(bubblesParent.width());
  let bubbles = bubbleSrv.process(posts);

  let bubbleClick = post => {
    lightboxSrv.callLightbox(post);
  };

  bubbleNodesSrv = new BubbleNodesService(document.querySelector('.bubbles'), bubbleClick);
  bubbleNodesSrv.process(bubbles);

  bubblesParent.bind('scroll', onScroll);

  /*
  $(window).on('resize', debounce(() => {
    bubblesNodes.updateNodeDim();
  }, 600, false));
  */
});
