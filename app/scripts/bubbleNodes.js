
import {BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './bubbles';

export class BubbleNodesService {
  bubbles = [];
  bubbleNodes = [];

  onClick = null;
  
  constructor(parent, onClick) {
    this.parent = parent;
    this.onClick = onClick;
  }

  clearNodes() {
    for (let elm of document.querySelectorAll('.bubbles .bubble')) {
      this.parent.removeChild(elm);
    }
    this.bubbleNodes = [];
  }
  
  setNodes() {
    for (let bubble of this.bubbles) {
      let elm = document.createElement('div');
      elm.className = 'bubble ' + bubble.type.name;
      elm.style.left = bubble.x + 'px';
      elm.style.top = bubble.y + 'px';
      elm.style.width = bubble.size + 'px';
      elm.style.height = bubble.size + 'px';

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