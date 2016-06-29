import {Post, POST_TYPE_PROJECT, POST_TYPE_INSTAGRAM, POST_TYPE_PRESS} from './posts';

export const LIGHTBOX_GALLERY = ".gallery-lightbox";
export const LIGHTBOX_INSTAGRAM = ".ig-lightbox";


export class LightboxService {
  type = LIGHTBOX_GALLERY;
  count = 1;
  
  title = '';
  subtitle = '';
  text = '';
  

  init() {
    $('.lightbox .close-button').click(this.hideLightbox);
    $('.lightbox .bg').click(this.hideLightbox);

    $('.go-fullscreen').click(() => {
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
  }

  showLightbox() {
    //$('.lightbox').addClass('lightbox-active');
    $(this.type).addClass('lightbox-active');
  }

  hideLightbox() {
    $('.lightbox').removeClass('lightbox-active');

    this.type = LIGHTBOX_GALLERY;
    this.count = 1;
    this.title = '';
    this.subtitle = '';
    this.text = '';
  }

  callLightbox(post) {
    this.type = LIGHTBOX_GALLERY;
    if (post.type == POST_TYPE_INSTAGRAM)
      this.type = LIGHTBOX_INSTAGRAM;

    this.title = post.title;
    this.subtitle = post.subtitle;
    this.text = post.text;

    console.log(this);
    console.log(this.type + ' .title');
    $(this.type + ' .title').html(this.title);
    $(this.type + ' .subtitle').html(this.subtitle);
    $(this.type + ' .text').html(this.text);
    if (post.images.length)
      $(this.type + ' img').attr('src', post.images[0]);

    this.showLightbox();
  }
}