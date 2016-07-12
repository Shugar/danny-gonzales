import {BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './bubbles';

export const ANIMATION_DURANTION = 3000;
export const MARGIN_LEFT = 8;

export class BubbleNodesService {
  bubbles = [];
  screenHeight = 0;

  onClick = null;

  constructor(parent, onClick, screenHeight = 0) {
    this.parent = parent;
    this.onClick = onClick;
    this.screenHeight = screenHeight;
  }

  setNodes() {
    let topMax = 0;

    $('.bubble-container').each((index, elm) => {
      let bubble = this.bubbles[index];

      elm.style.left = bubble.x + 'px';
      elm.style.top = bubble.y + 'px';
      let size = bubble.size * 1.2;
      elm.style.width = size + 'px';
      elm.style.height = size + 'px';

      if (bubble.y + bubble.size > topMax)
        topMax = bubble.y + bubble.size;

      let elmBubble = $(elm).find('.bubble').get(0);
      elmBubble.style.width = bubble.size + 'px';
      elmBubble.style.height = bubble.size + 'px';
      elmBubble.style.marginLeft = MARGIN_LEFT + 'px';

      let animDur = ANIMATION_DURANTION;
      switch (bubble.post.size) {
        case BUBBLE_TYPE_XL:  animDur += 750; break;
        case BUBBLE_TYPE_M:   animDur -= 500; break;
        case BUBBLE_TYPE_S:   animDur -= 1000;break;
      }
      animDur += Math.floor(Math.random() * 200);
      elmBubble.style.animationDuration = animDur + 'ms';

      if (bubble.post.backgroundColor.length)
        elmBubble.style.backgroundColor = bubble.post.backgroundColor;
      if (bubble.post.backgroundImage.length)
        elmBubble.style.backgroundImage = bubble.post.backgroundImage;

      $(elm).click(() => this.onClick(bubble.post));
    });

    //to add bottom reserve
    topMax += this.screenHeight / 2;
    let elm = document.createElement('div');
    elm.className = 'invis';
    //elm.style.position = 'absolute';
    //elm.style.left = 0;
    elm.style.height = topMax + 'px';
    elm.innerHTML = 'invis!';
    elm.style.visibility = 'hidden';
    this.parent.appendChild(elm);
  }

  process(bubbles) {
    this.bubbles = bubbles;
    this.setNodes();
  }
}
