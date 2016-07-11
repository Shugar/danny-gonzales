import {PostsService, POST_TYPE_PROJECT, POST_TYPE_INSTAGRAM, POST_TYPE_PRESS} from './posts';
import {BubblesService} from './bubbles';
import {BubbleNodesService} from './bubbleNodes';
import {LightboxService} from './lightbox';
import {ScrollMagicService} from './ScrollMagicSrv';
import {debounce, throttle} from './utils';


const PARALLAX_WIDTH = 0.1;
const PARALLAX_HEIGHT = 0.1;

const ARTS_NUM = 14;

let postSrv;
let posts = [];

let bubbleSrv;
let bubbleNodesSrv;
let lightboxSrv;
let scrollMagicSrv;

let type = null;

let bubblesParent;

let navIsShow = false;

let firstScroll = false;


function setNavListeners() {
  let navHide = () => {
    navIsShow = false;
    $('.nav').removeClass('nav-active');
    $('.nav-toggle').removeClass('toggle-active');
  };
  $('.nav-close').click(navHide);
  $('html, body').click(navHide);

  let navShow = () => {
    navIsShow = true;
    $('.nav').addClass('nav-active');
    $('.nav-toggle').addClass('toggle-active');
  };
  let navSwitch = () => {
    if (navIsShow)
      navHide();
    else
      navShow();
  };
  $('.nav-toggle').click(navSwitch);

  $('.nav, .nav-toggle').click(event => event.stopPropagation());


  let filterPostsClick = type => {
    navHide();
    onFilterPosts(type);
  };

  $('.footer .logo').click(event => {
    event.stopPropagation();
    filterPostsClick();
  });

  $('.nav .home-link')    .click(() => filterPostsClick(type = null));
  $('.nav .projects-link').click(() => filterPostsClick(type = POST_TYPE_PROJECT));
  $('.nav .press-link')   .click(() => filterPostsClick(type = POST_TYPE_PRESS));
  $('.nav .gallery-link') .click(() => filterPostsClick(type = POST_TYPE_INSTAGRAM));
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


function setOthersListeneres() {
  //on 'F' goto fullscreen
  document.addEventListener("keydown", event => {
    $('.push-f').hide();

    let el = document.body;
    let requestMethod =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen;

    if (event.which === 70) {
      if (requestMethod) {
        requestMethod.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  });

  $(document).bind('mousewheel', () => {
    if (!firstScroll)
      $('.push-f').addClass('push-f-disabled');
    firstScroll = true;

    /*
    clearTimeout(timer);
    if (!document.body.classList.contains('disable-hover'))
      document.body.classList.add('disable-hover');

    timer = setTimeout(() => document.body.classList.remove('disable-hover'), 500);
    */
  });

  $(document).click(() => {
    if (document.body.scrollTop == 0)
      TweenLite.to(document.body, 1, {scrollTo: {y: $(window).height()}});
  });
}

function onFilterPosts(type, scroll = true) {
  scrollMagicSrv.clear();

  posts = postSrv.getFilteredPosts(type);
  bubbleSrv.width = bubblesParent.width();
  let bubbles = bubbleSrv.process(posts);
  bubbleNodesSrv.process(bubbles);
  if (scroll)
    TweenLite.to(document.body, 1, {scrollTo: {y: $(window).height()}});

  firstScroll = false;

  scrollMagicSrv.update();
}

function onResize() {
  $('.arts').css({
    width: $(window).width() + 'px',
    height: $(window).height() + 'px'
  });

  onFilterPosts(type, false);
}

let timeout = 0;
let scrollStart = false;
function onScroll() {
  if (!scrollStart)
    onScrollStart();
  clearTimeout(timeout);
  timeout = setTimeout(onScrollEnd, 120);
}
function onScrollStart() {
  scrollStart = true;
  $('.bubbles .bubble').css('animation-play-state', 'paused');
}
function onScrollEnd() {
  scrollStart = false;
  $('.bubbles .bubble').css('animation-play-state', 'running');
}

let parallaxX = 0;
let parallaxY = 0;
function onMouseMove(event) {
  let x = Math.min(1, Math.max(0, event.clientX / $(window).width()));
  let y = Math.min(1, Math.max(0, event.clientY / $(window).height()));

  parallaxX = - (x - 0.5) * $(window).width() * PARALLAX_WIDTH;
  parallaxY = - (y - 0.5) * $(window).height() * PARALLAX_HEIGHT;
}

function onAnimationFrame() {
  $('.art').css('transform', 'translate3d(' + parallaxX + 'px, ' + parallaxY + 'px, 0)');

  if (!scrollMagicSrv.artEnded)
    requestAnimationFrame(onAnimationFrame);
}



$(document).ready(() => {
  setNavListeners();
  setBioLightbox();
  setOthersListeneres();

  bubblesParent = $('.bubbles');

  lightboxSrv = new LightboxService();

  postSrv = new PostsService();
  posts = postSrv.process();

  bubbleSrv = new BubblesService($(window).height(), bubblesParent.width());
  bubbleSrv.process(posts);

  let bubbleClick = post => {
    lightboxSrv.callLightbox(post);
  };

  bubbleNodesSrv = new BubbleNodesService(bubblesParent.get(0), bubbleClick, $(window).height());
  bubbleNodesSrv.process(bubbleSrv.bubbles);

  scrollMagicSrv = new ScrollMagicService();
  scrollMagicSrv.init();

  $('.arts').css({
    width: $(window).width() + 'px',
    height: $(window).height() + 'px'
  });

  $(window).on('resize', debounce(() => {
    onResize();
  }, 500, false));

  $(window).on('scroll', throttle(() => {
    onScroll();
  }, 100));

  $(window).on('mousemove', onMouseMove);
  requestAnimationFrame(onAnimationFrame);
});
