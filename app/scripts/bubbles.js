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
    return (distance > (bubble1.size + bubble2.size) / 2.3);
  }

  posts = [];
  bubbles = [];
  
  constructor(posts, width) {
    this.posts = posts;
    this.width = width;
  }
  
  setBubbles() {
    let containerWidth = this.width;
    let coeff = 1300 / this.width;
    let containerHeight = coeff * this.posts.length * 140;

    for (let i = 1; i <= this.posts.length; i++) {
      let bubble = new Bubble();
      bubble.post = this.posts[i - 1];
      let ind = Math.floor(Math.random() * this.bubbleTypes.length);
      bubble.type = this.bubbleTypes[ind];
      bubble.size = bubble.type.size;
      //bubble.size = Math.floor(bubble.type.size * (coeff > 1 ? 1 : 1/coeff));

      let check = true;
      do {
        bubble.x = Math.floor(Math.random() * (containerWidth - bubble.size));
        bubble.y = Math.floor(Math.random() * (containerHeight - bubble.size));
        check = true;
        for (let j = 0; j < i - 1; j++) {
          check = check && BubblesService.checkIntersection(bubble, this.bubbles[j]);
        }
      } while (!check);

      this.bubbles[i - 1] = bubble;
    }
  }
  
  process() {
    this.setBubbles();

    return this.bubbles;
  }
}