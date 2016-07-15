import {Post} from './posts';

export const BUBBLE_TYPE_XL = "bubble_type_xl";
export const BUBBLE_TYPE_L  = "bubble_type_l";
export const BUBBLE_TYPE_M  = "bubble_type_m";
export const BUBBLE_TYPE_S  = "bubble_type_s";

const AVAIL_WIDTH = 0.9;
const UPPER_RESERVE = 1.3;


export class Bubble {
  post = new Post();
  size = 0;
  x = 0;
  y = 0;
}

export class BubblesService {
  static getSize(type) {
    switch (type) {
      case(BUBBLE_TYPE_XL): return 350;
      case(BUBBLE_TYPE_L):  return 253;
      case(BUBBLE_TYPE_M):  return 185;
      case(BUBBLE_TYPE_S):  return 150;
    }
  }

  static checkIntersection(bubble1, bubble2) {
    let a1 = bubble1.x + bubble1.size/2 - (bubble2.x + bubble2.size/2);
    let a2 = bubble1.y + bubble1.size/2 - (bubble2.y + bubble2.size/2);
    let distance = Math.sqrt(a1 * a1 + a2 * a2);
    return (distance > (bubble1.size + bubble2.size) / 2);
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
    
    let coeff = 1200 / this.width;
    coeff = coeff < 1  ?  1  :  coeff > 1.3 ? 1.3 : coeff;
    let reserve = UPPER_RESERVE * this.screenHeight;
    this.height = reserve + Math.round(Math.sqrt(this.posts.length) * grow);

    for (let i = 0; i < this.posts.length; i++) {
      let bubble = new Bubble();
      bubble.post = this.posts[i];
      bubble.size = BubblesService.getSize(bubble.post.size);
      bubble.size = Math.floor(bubble.size / coeff);

      let attempt = 0;
      let check = true;
      do {
        let availWidth = this.width * AVAIL_WIDTH - bubble.size;
        bubble.x = Math.floor(this.width / 2 + (Math.random() * availWidth - availWidth / 2) - bubble.size / 2);
        bubble.y = reserve + Math.floor(Math.random() * (this.height - bubble.size));
        check = true;
        for (let j = 0; j < i; j++) {
          check = check && BubblesService.checkIntersection(bubble, this.bubbles[j]);
        }

        attempt++;
        if (attempt / this.posts.length > 30) {
          this.bubbles = [];
          this.setBubbles(grow + 3);
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