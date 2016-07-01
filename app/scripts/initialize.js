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
    //$('.art').addClass('animations-active');
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
  let controller = new ScrollMagic.Controller({container: ".bubbles"});

  let timeline = new TimelineLite();
  let tweens = [
    TweenLite.to('.art-1',  1, {xPercent: -100, yPercent: 200 }),
    TweenLite.to('.art-2',  1, {xPercent: -150, yPercent: 52 }),
    TweenLite.to('.art-3',  1, {xPercent: -208, yPercent: -44 }),
    TweenLite.to('.art-4',  1, {xPercent: -218, yPercent: -80 }),
    TweenLite.to('.art-5a', 1, {xPercent: -100, yPercent: -250 }),
    TweenLite.to('.art-5b', 1, {xPercent: -100, yPercent: -250 }),
    TweenLite.to('.art-6',  1, {xPercent: -342, yPercent: 395 }),
    TweenLite.to('.art-7',  1, {xPercent: 108.8,yPercent: 2 }),
    TweenLite.to('.art-8',  1, {xPercent: 50,   yPercent: -310 }),
    TweenLite.to('.art-9',  1, {xPercent: 146,  yPercent: -84 }),
    TweenLite.to('.art-10', 1, {xPercent: 235,  yPercent: 210 }),
    TweenLite.to('.art-11', 1, {xPercent: 250,  yPercent: -250 }),
    TweenLite.to('.art-12', 1, {xPercent: 150,  yPercent: 129 }),
    TweenLite.to('.art-13', 1, {xPercent: 336,  yPercent: 160 })

  ];
  timeline
    .add(tweens);

  let scene = new ScrollMagic.Scene({
    triggerElement: ".trigger",
    triggerHook: 0,
    duration: 300
  })
    .setTween(timeline)
    .addIndicators({name: "1"})
    .addTo(controller);
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

  bubblesParent = $('.bubbles');

  lightboxSrv = new LightboxService();

  postSrv = new PostsService();
  let posts = postSrv.process();

  bubbleSrv = new BubblesService(screenHeight, bubblesParent.width());
  let bubbles = bubbleSrv.process(posts);

  let bubbleClick = post => {
    lightboxSrv.callLightbox(post);
  };

  bubbleNodesSrv = new BubbleNodesService(document.querySelector('.bubbles'), bubbleClick);
  bubbleNodesSrv.process(bubbles);

  //bubblesParent.bind('scroll', onScroll);

  scrollMagicInit();

  $('.art').css({
    width: $(window).width() + 'px',
    height: $(window).height() + 'px'
  })

  $(window).on('resize', debounce(() => {
    $('.art').css({
      width: $(window).width() + 'px',
      height: $(window).height() + 'px'
    })

  }, 600, false));

});
