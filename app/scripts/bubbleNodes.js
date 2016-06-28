
import {BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './bubbles';

export class BubbleNodesService {
  bubbles = [];
  bubbleNodes = [];

  parentXL;
  parentL;
  parentM;
  parentS;
  
  constructor(bubbles, parent) {
    this.bubbles = bubbles;
    this.parent = parent;
  }
  
  setParents() {
    /*
    this.parentXL = document.createElement('div');
    this.parentXL.className = 'bubbles-xl';
    this.parentXL.style.position = 'absolute';
    this.parentXL.style.top = 0;
    this.parent.appendChild(this.parentXL);

    this.parentL = document.createElement('div');
    this.parentL.className = 'bubbles-l';
    this.parentL.style.position = 'absolute';
    this.parentL.style.top = 0;
    this.parent.appendChild(this.parentL);

    this.parentM = document.createElement('div');
    this.parentM.className = 'bubbles-m';
    this.parentM.style.position = 'absolute';
    this.parentM.style.top = 0;
    this.parent.appendChild(this.parentM);

    this.parentS = document.createElement('div');
    this.parentS.className = 'bubbles-s';
    this.parentS.style.position = 'absolute';
    this.parentS.style.top = 0;
    this.parent.appendChild(this.parentS);
    */

    this.parentXL = this.parentL = this.parentM = this.parentS = this.parent;
  }

  setNodes() {
    for (let bubble of this.bubbles) {
      let elm = document.createElement('div');
      elm.className = 'bubble ' + bubble.type.name;
      //elm.style.left = bubble.x + 'px';
      //elm.style.top = bubble.y + 'px';
      elm.style.width = bubble.size + 'px';
      elm.style.height = bubble.size + 'px';

      elm.style.background = bubble.post.background;
      elm.style.backgroundSize = 'contain';

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

      switch (bubble.type.name) {
        case BUBBLE_TYPE_XL:
          this.parentXL.appendChild(elm);
          break;
        case BUBBLE_TYPE_L:
          this.parentL.appendChild(elm);
          break;
        case BUBBLE_TYPE_M:
          this.parentM.appendChild(elm);
          break;
        case BUBBLE_TYPE_S:
          this.parentS.appendChild(elm);
          break;
      }

      this.bubbleNodes.push(elm);
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
  
  process() {
    this.setParents();
    this.setNodes();

    $('.bubbles').masonry({
      // options
      itemSelector: '.bubble',
      columnWidth: 200
    });

    return this.bubbleNodes;
  }
}