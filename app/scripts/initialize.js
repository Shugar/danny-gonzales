import {PostsService, POST_TYPE_PROJECT, POST_TYPE_INSTAGRAM, POST_TYPE_PRESS} from './posts';
import {BubblesService} from './bubbles';
import {BubbleNodesService} from './bubbleNodes';
import {LightboxService} from './lightbox';
import {ScrollMagicService} from './ScrollMagicSrv';
import {debounce, throttle} from './utils';


const PARALLAX_GLOBAL = 0.05;
const PARALLAX_LOCAL = 0.2;

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

let firstScroll = true;


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


  let filterPostsClick = newType => {
    if (type == newType || (!type && !newType))
      return;
    
    type = newType;
    navHide();
    onFilterPosts(type);
  };

  $('.footer .logo').click(event => {
    event.stopPropagation();
    filterPostsClick(null);
  });

  $('.nav .home-link')    .click(() => filterPostsClick(null));
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

  $(document).click(() => {
    if (bubblesParent.get(0).scrollTop == 0)
      TweenLite.to(bubblesParent, 1, {scrollTo: {y: $(window).height()}});
  });

  $(window).on('resize', debounce(() => {
    onResize();
  }, 500, false));

  $(window).on('mousewheel', throttle(() => {
    onScroll();
  }, 100));

  $(window).on('mousemove', onMouseMove);
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
  if (bubblesParent.get(0).scrollTop == 0) {
    firstScroll = true;
    bubblesParent.css('z-index', -1);
  }
  if (firstScroll) {
    $('.push-f').addClass('push-f-disabled');
    bubblesParent.css('z-index', 0);
    firstScroll = false;
  }
  if (!scrollStart)
    onScrollStart();
  clearTimeout(timeout);
  timeout = setTimeout(onScrollEnd, 120);
}
function onScrollStart() {
  scrollStart = true;
  $('.bubbles .bubble').css('animation-play-state', 'paused');
  //if (!document.body.classList.contains('disable-hover'))
    //document.body.classList.add('disable-hover');
}
function onScrollEnd() {
  scrollStart = false;
  $('.bubbles .bubble').css('animation-play-state', 'running');
  //document.body.classList.remove('disable-hover');
}

function onMouseMove(event) {
  if (scrollMagicSrv.artEnded)
    return;

  let currentElm = document.elementFromPoint(event.clientX, event.clientY);
  //let match = currentElm.className.match(/\d+/);
  //if (match) {
    //match[0];

  let x = Math.min(1, Math.max(0, event.clientX / $(window).width()));
  let y = Math.min(1, Math.max(0, event.clientY / $(window).height()));

  $('.art').each((index, elm) => {
    if (currentElm == elm) {
      let jqElm = $(currentElm);
      let x1 = event.pageX - jqElm.offset().left;
      let y1 = event.pageY - jqElm.offset().top;

      x1 = Math.min(1, Math.max(0, x1 / jqElm.width()));
      y1 = Math.min(1, Math.max(0, y1 / jqElm.height()));

      TweenLite.to(elm, 1, {
          x: -(x - 0.5) * $(window).width() * PARALLAX_GLOBAL   + (x1 - 0.5) * jqElm.width() * PARALLAX_LOCAL,
          y: -(y - 0.5) * $(window).height() * PARALLAX_GLOBAL  + (y1 - 0.5) * jqElm.height() * PARALLAX_LOCAL,
          z: 0.01
        }
      );
    } else {
      TweenLite.to(elm, 1, {
          x: -(x - 0.5) * $(window).width() * PARALLAX_GLOBAL,
          y: -(y - 0.5) * $(window).height() * PARALLAX_GLOBAL,
          z: 0.01
        }
      );
    }
  });
}


$(document).ready(() => {
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

  setNavListeners();
  setBioLightbox();
  setOthersListeneres();
});
