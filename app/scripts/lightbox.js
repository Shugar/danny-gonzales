import {Post, POST_TYPE_PROJECT, POST_TYPE_INSTAGRAM, POST_TYPE_PRESS} from './posts';

export const LIGHTBOX_GALLERY = ".gallery-lightbox";
export const LIGHTBOX_INSTAGRAM = ".ig-lightbox";


export class LightboxService {
  type = LIGHTBOX_GALLERY;
  current = 0;

  title = '';
  subtitle = '';
  text = '';
  images = [];

  constructor() {
    this.initListeners();
  }

  initListeners() {
    $('.lightbox .close-button').click(this.hideLightbox);
    $('.lightbox .bg').click(this.hideLightbox);

    $('.lightbox .go-fullscreen').click(() => {
      let el = document.body;
      let requestMethod =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;

      if (requestMethod) {
        requestMethod.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    });

    $('.lightbox').bind('mousewheel', event => event.stopPropagation());

    $('.lightbox .slide-prev').click(() => this.onPrev());
    $('.lightbox .slide-next').click(() => this.onNext());

    let swipe = new Hammer(
      $('.lightbox .image').get(0),
      {direction: Hammer.DIRECTION_HORIZONTAL}
    );
    swipe.on('swipeleft', () => this.onPrev());
    swipe.on('swiperight', () => this.onNext());
  }

  showLightbox() {
    $(this.type).addClass('lightbox-active');
  }

  hideLightbox() {
    $('.lightbox').removeClass('lightbox-active');

    this.type = LIGHTBOX_GALLERY;
    this.images = [];
    this.current = 0;
    this.title = '';
    this.subtitle = '';
    this.text = '';
  }

  onPrev() {
    if (this.current > 0)
      this.current--;
    else
      this.current = this.images.length - 1;
    this.updateImage();
  }

  onNext() {
    if (this.current < this.images.length - 1)
      this.current++;
    else
      this.current = 0;
    this.updateImage();
  }

  updateImage() {
    $(this.type + ' img').attr('src', this.images[this.current]);
    let cur = this.current + 1;
    $('.lightbox .count').html(cur + ' / ' + this.images.length);
  }

  callLightbox(post) {
    if (post.type == POST_TYPE_INSTAGRAM)
      this.type = LIGHTBOX_INSTAGRAM;
    else
      this.type = LIGHTBOX_GALLERY;
    
    this.images = post.images;

    this.title = post.title;
    this.subtitle = post.subtitle;
    this.text = post.text;

    $(this.type + ' .title').html(this.title);
    $(this.type + ' .subtitle').html(this.subtitle);
    $(this.type + ' .text').html(this.text);

    if (this.images.length > 0) {
      this.updateImage();
      if (this.images.length == 1) {
        $('.lightbox .count').hide();
        $('.lightbox .slide-prev').hide();
        $('.lightbox .slide-next').hide();
      } else {
        $('.lightbox .count').show();
        $('.lightbox .slide-prev').show();
        $('.lightbox .slide-next').show();
      }
    }

    this.showLightbox();
  }
}