import {BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './bubbles';

export const ANIMATION_DURANTION = 3000;
export const MARGIN_LEFT = 8;

export class BubbleNodesService {
  bubbles = [];
  bubbleNodes = [];
  screenHeight = 0;

  onClick = null;
  
  constructor(parent, onClick, screenHeight = 0) {
    this.parent = parent;
    this.onClick = onClick;
    this.screenHeight = screenHeight;
  }

  clearNodes() {
    for (let elm of document.querySelectorAll('.bubbles .bubble-container, .bubbles .invis')) {
      this.parent.removeChild(elm);
    }
    this.bubbleNodes = [];
  }
  
  setNodes() {
    let topMax = 0;
    
    for (let bubble of this.bubbles) {
      let elm = document.createElement('div');

      elm.className = 'bubble-container ' + bubble.type.name + ' ' + bubble.post.type;
      elm.style.left = bubble.x + 'px';
      elm.style.top = bubble.y + 'px';
      let size = bubble.size * 1.2;
      elm.style.width = size + 'px';
      elm.style.height = size + 'px';

      if (bubble.y + bubble.size > topMax)
        topMax = bubble.y + bubble.size;

      let elmBubble = document.createElement('div');
      elmBubble.style.width = bubble.size + 'px';
      elmBubble.style.height = bubble.size + 'px';
      elmBubble.style.marginLeft = MARGIN_LEFT + 'px';
      elmBubble.className = 'bubble';

      let animDur = ANIMATION_DURANTION;
      switch (bubble.type.name) {
        case BUBBLE_TYPE_XL:  animDur += 750; break;
        case BUBBLE_TYPE_M:   animDur -= 500; break;
        case BUBBLE_TYPE_S:   animDur -= 1000;break;
      }
      animDur += Math.floor(Math.random() * 200);
      elmBubble.style.animationDuration = animDur + 'ms';

      if (bubble.post.backgroundColor.length)
        elmBubble.style.backgroundColor = bubble.post.backgroundColor;
      if (bubble.post.backgroundImage.length)
        elmBubble.style.backgroundImage = 'url("' + bubble.post.backgroundImage + '")';

      elm.appendChild(elmBubble);

      let elmInner = document.createElement('div');
      elmInner.className = 'bubble-inner';
      elmBubble.appendChild(elmInner);

      let elmText = document.createElement('div');
      elmText.className = 'title';
      elmText.innerHTML = bubble.post.text;
      elmInner.appendChild(elmText);

      let elmSubtitle = document.createElement('div');
      elmSubtitle.className = 'subtitle';
      elmSubtitle.innerHTML = bubble.post.subtitle;
      elmInner.appendChild(elmSubtitle);

      this.parent.appendChild(elm);

      this.bubbleNodes.push(elm);

      $(elm).click(() => this.onClick(bubble.post));
    }

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

  updateNodeDim() {
    for (let i = 0; i < this.bubbles.length; i++) {
      let node = this.bubbleNodes[i];
      let bubble = this.bubbles[i];
      node.className = 'bubble ' + bubble.type.name;
      node.style.left = bubble.x + 'px';
      node.style.top = bubble.y + 'px';
      node.style.width = bubble.size + 'px';
      node.style.height = bubble.size + 'px';
    }
  }
  
  process(bubbles) {
    this.bubbles = bubbles;
    this.clearNodes();
    this.setNodes();
    return this.bubbleNodes;
  }
}