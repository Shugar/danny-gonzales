
import {BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './bubbles';

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
    for (let elm of document.querySelectorAll('.bubbles .bubble')) {
      this.parent.removeChild(elm);
    }
    this.bubbleNodes = [];
  }
  
  setNodes() {
    let topMax = 0;
    
    for (let bubble of this.bubbles) {
      let elm = document.createElement('div');
      elm.className = 'bubble ' + bubble.type.name;
      elm.style.left = bubble.x + 'px';
      elm.style.top = bubble.y + 'px';
      elm.style.width = bubble.size + 'px';
      elm.style.height = bubble.size + 'px';

      if (bubble.y + bubble.size > topMax)
        topMax = bubble.y + bubble.size;

      if (bubble.post.backgroundColor.length)
        elm.style.backgroundColor = bubble.post.backgroundColor;
      if (bubble.post.backgroundImage.length)
        elm.style.backgroundImage = 'url("' + bubble.post.backgroundImage + '")';

      let elmInner = document.createElement('div');
      elmInner.className = 'bubble-inner';
      elm.appendChild(elmInner);

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
    elm.style.position = 'absolute';
    elm.style.left = 0;
    elm.style.top = topMax + 'px';
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