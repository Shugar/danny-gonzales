export let posts = [];
export const postNum = 20;

export const containerWidth = 1000;
export let containerHeight = postNum * 100;

export class Post {
  constructor() {
    this.text = 'This is text post!';
  }
}

export function fillPosts() {
  for (let i = 0; i < postNum; i++) {
    let post = new Post();
    posts.push(post);
  }
}

export let bubbles = [];
const baseRadius = 180;

export class Bubble {
  constructor() {
    this.post = new Post();
    this.radius = baseRadius;
    this.x = 0;
    this.y = 0;
  }
}

export function checkBounds(bubble) {
  return (
    bubble.x - bubble.radius > 0 &&
    bubble.y - bubble.radius > 0 &&
    bubble.x + bubble.radius < containerWidth &&
    bubble.y + bubble.radius < containerHeight
  );
}

export function checkIntersection(bubble1, bubble2) {
  let distance = Math.sqrt(Math.pow((bubble1.x - bubble2.x), 2) + Math.pow((bubble1.y - bubble2.y), 2));
  return (distance > bubble1.radius + bubble2.radius);
}

export function setBubbles() {
  const c = 1.5;

  let area0 = baseRadius * baseRadius * Math.PI;

  for (let i = 1; i <= postNum; i++) {
    let area = area0 * Math.pow(i, -c);
    
    let bubble = new Bubble();
    bubble.post = posts[i - 1];
    bubble.radius = Math.round(Math.sqrt(area / Math.PI));

    let check = false;
    do {
      bubble.x = Math.floor(Math.random() * containerWidth);
      bubble.y = Math.floor(Math.random() * containerHeight);
      check = checkBounds(bubble);
      for (let j = 0; j < i - 1; j++) {
        check = check && checkIntersection(bubble, bubbles[j]);
      }
    } while (!check);
    
    bubbles.push(bubble);
  }
}