import {BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './bubbles';

export class ScrollMagicService {
  controller;
  scenes = [];

  artEnded = false;
  //onArtEnded = null;
  //onArtStart = null;
  
  constructor(onArtEnded, onArtStart) {
    
  }

  init() {
    this.controller = new ScrollMagic.Controller({container: $('.bubbles').get(0)});

    let timeline = new TimelineLite();
    let tweens = [
      TweenLite.to('.art-1',  1, {xPercent: -220, yPercent: 100,  ease: Power1.easeIn}),
      TweenLite.to('.art-2',  1, {xPercent: -150, yPercent: 52,   ease: Power1.easeIn}),
      TweenLite.to('.art-3',  1, {xPercent: -208, yPercent: -56,  ease: Power1.easeIn}),
      TweenLite.to('.art-4',  1, {xPercent: -218, yPercent: -80,  ease: Power1.easeIn}),
      TweenLite.to('.art-5',  1, {xPercent: -100, yPercent: -250, ease: Power1.easeIn}),
      TweenLite.to('.art-6',  1, {xPercent: 200,  yPercent: -250, ease: Power1.easeIn}),
      TweenLite.to('.art-7',  1, {xPercent: -420, yPercent: -395, ease: Power1.easeIn}),
      TweenLite.to('.art-8',  1, {xPercent: 109,  yPercent: 2,    ease: Power1.easeIn}),
      TweenLite.to('.art-9',  1, {xPercent: 350,  yPercent: 150,  ease: Power1.easeIn}),
      TweenLite.to('.art-10', 1, {xPercent: 146,  yPercent: -84,  ease: Power1.easeIn}),
      TweenLite.to('.art-11', 1, {xPercent: 245,  yPercent: 210,  ease: Power1.easeIn}),
      TweenLite.to('.art-12', 1, {xPercent: 250,  yPercent: -250, ease: Power1.easeIn}),
      TweenLite.to('.art-13', 1, {xPercent: 150,  yPercent: 129,  ease: Power1.easeIn}),
      TweenLite.to('.art-14', 1, {xPercent: 336,  yPercent: 160,  ease: Power1.easeIn})
    ];
    timeline.add(tweens);

    new ScrollMagic.Scene({
      triggerElement: ".trigger",
      triggerHook: 0,
      duration: '70%'
    })
      .setTween(timeline)
      .on('end', event => {
        if (event.scrollDirection == "FORWARD")
          this.artEnded = true;
        else if (event.scrollDirection == "REVERSE")
          this.artEnded = false;
      })
      .addTo(this.controller);

    this.update();
  }

  update() {
    $('.' + BUBBLE_TYPE_XL).each((index, bubble) => {
      let scene = new ScrollMagic.Scene({
        triggerElement: bubble,
        triggerHook: 'onEnter',
        duration: '120%'
      })
        .setTween(bubble, {y: '200', z: '0.01'})
        .addTo(this.controller);
      this.scenes.push(scene);
    });

    $('.' + BUBBLE_TYPE_M).each((index, bubble) => {
      let scene = new ScrollMagic.Scene({
        triggerElement: bubble,
        triggerHook: 'onEnter',
        duration: '120%'
      })
        .setTween(bubble, {y: '-100', z: '0.01'})
        .addTo(this.controller);
      this.scenes.push(scene);
    });

    $('.' + BUBBLE_TYPE_S).each((index, bubble) => {
      let scene = new ScrollMagic.Scene({
        triggerElement: bubble,
        triggerHook: 'onEnter',
        duration: '120%'
      })
        .setTween(bubble, {y: '-200', z: '0.01'})
        .addTo(this.controller);
      this.scenes.push(scene);
    });


    $('body .footer + div').css({'visibility': 'hidden'});
    $('.bubbles .invis + div').css({'visibility': 'hidden'});
  }

  clear() {
    for (let scene of this.scenes) {
      scene.remove();
    }
  }
}
