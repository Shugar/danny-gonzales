import {PostsService, POST_TYPE_PROJECT, POST_TYPE_INSTAGRAM, POST_TYPE_PRESS} from './posts';
import {BubblesService} from './bubbles';
import {BubbleNodesService} from './bubbleNodes';
import {LightboxService} from './lightbox';
import {ScrollMagicService} from './ScrollMagicSrv';
import {debounce} from './utils';


let screenHeight = 0;

let postSrv;
let bubbleSrv;
let bubbleNodesSrv;
let lightboxSrv;
let scrollMagicSrv;

let bubblesParent;

let navIsShow = false;

let contentClicked = false;
document.addEventListener("keydown", (event) => {
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

  $('.footer .logo')      .click(() => filterPostsClick());
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

function onFilterPosts(type) {
  scrollMagicSrv.clear();

  let posts = postSrv.getFilteredPosts(type);
  let bubbles = bubbleSrv.process(posts);
  bubbleNodesSrv.process(bubbles);
  bubblesParent.get(0).scrollTop = screenHeight;

  scrollMagicSrv.update();
}

$(document).ready(() => {
  screenHeight = $(window).height();

  setNavListeners();
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

  bubbleNodesSrv = new BubbleNodesService(bubblesParent.get(0), bubbleClick, screenHeight);
  bubbleNodesSrv.process(bubbles);

  scrollMagicSrv = new ScrollMagicService();
  scrollMagicSrv.init();

  $('.art').css({
    width: $(window).width() + 'px',
    height: $(window).height() + 'px'
  });

  $(window).on('resize', debounce(() => {
    $('.art').css({
      width: $(window).width() + 'px',
      height: $(window).height() + 'px'
    })
  }, 600, false));
});


/*
let body = document.body;
let timer;
window.addEventListener('scroll', () => {
  clearTimeout(timer);
  if (!body.classList.contains('disable-hover'))
    body.classList.add('disable-hover');

  timer = setTimeout(() => body.classList.remove('disable-hover'), 500);
}, false);
*/
