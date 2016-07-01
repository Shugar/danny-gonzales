import {Post} from './posts';

export const BUBBLE_TYPE_XL = "bubble_type_xl";
export const BUBBLE_TYPE_L  = "bubble_type_l";
export const BUBBLE_TYPE_M  = "bubble_type_m";
export const BUBBLE_TYPE_S  = "bubble_type_s";

export class BubbleType {
  constructor(name = BUBBLE_TYPE_L, size = 253) {
    this.name = name;
    this.size = size;
  }
}

export class Bubble {
  constructor() {
    this.post = new Post();
    this.type = new BubbleType();
    this.size = 0;
    this.x = 0;
    this.y = 0;
  }
}

export class BubblesService {
  bubbleTypes = [
    new BubbleType(BUBBLE_TYPE_XL,  350),
    new BubbleType(BUBBLE_TYPE_L,   253),
    new BubbleType(BUBBLE_TYPE_M,   185),
    new BubbleType(BUBBLE_TYPE_S,   150)
  ];

  static checkIntersection(bubble1, bubble2) {
    let a1 = bubble1.x + bubble1.size/2 - (bubble2.x + bubble2.size/2);
    let a2 = bubble1.y + bubble1.size/2 - (bubble2.y + bubble2.size/2);
    let distance = Math.sqrt(a1 * a1 + a2 * a2);
    return (distance > (bubble1.size + bubble2.size) / 1.7);
  }

  posts = [];
  bubbles = [];
  height = 1;
  width = 1;
  screenHeight = 1;

  constructor(screenHeight, width) {
    this.screenHeight = screenHeight;
    this.width = width;
  }
  
  setBubbles(grow = 1) {
    this.bubbles = [];
    
    let coeff = 1100 / this.width;
    this.height = this.screenHeight + Math.round(coeff * Math.sqrt(this.posts.length) * 30 * grow);

    for (let i = 0; i < this.posts.length; i++) {
      let bubble = new Bubble();
      bubble.post = this.posts[i];
      let ind = Math.floor(Math.random() * this.bubbleTypes.length);
      bubble.type = this.bubbleTypes[ind];
      bubble.size = bubble.type.size;
      //bubble.size = Math.floor(bubble.type.size * (coeff > 1 ? 1 : 1/coeff));

      let attempt = 0;
      let check = true;
      do {
        bubble.x = Math.floor(Math.random() * (this.width - bubble.size));
        bubble.y = this.screenHeight + Math.floor(Math.random() * (this.height - bubble.size));
        check = true;
        for (let j = 0; j < i; j++) {
          check = check && BubblesService.checkIntersection(bubble, this.bubbles[j]);
        }

        attempt++;
        if (attempt / this.posts.length > 30) {
          this.bubbles = [];
          this.setBubbles(grow * 1.07);
          return;
        }
        
      } while (!check);

      this.bubbles[i] = bubble;
    }
  }
  
  process(posts) {
    this.posts = posts;
    this.setBubbles();
    return this.bubbles;
  }
}