//=================Posts==============

export const POST_TYPE_PROJECT    = 'POST_TYPE_PROJECT';
export const POST_TYPE_INSTAGRAM  = 'POST_TYPE_INSTAGRAM';
export const POST_TYPE_PRESS      = 'POST_TYPE_PRESS';

export let posts = [];
export const postNum = 20;

export class Post {
  constructor() {
    this.type = POST_TYPE_PROJECT;
    this.text = '';
    this.subtitle = '';
    this.background = '';
  }
}

export function setPosts() {
  for (let i = 0; i < postNum; i++) {
    let post = new Post();
    posts.push(post);
  }

  let post = new Post();
  post.text = 'Junk Food Clothing';
  post.subtitle = 'Venice Beach, CA';
  post.background = 'url("../images/photo-2.png")';
  posts[0] = post;
  posts[2] = post;
  posts[13] = post;
  posts[19] = post;

  post = new Post();
  post.type = POST_TYPE_PRESS;
  post.text = 'Alternative Apparel Makes A Splash on Abbott Kinney';
  post.subtitle = '- Refinery 29';
  post.background = '#0E172F';
  posts[4] = post;
  posts[8] = post;
  posts[12] = post;
  posts[15] = post;

  post = new Post();
  post.background = 'url("../images/photo-4.png")';
  posts[1] = post;
  posts[5] = post;
  posts[10] = post;
  posts[12] = post;

  post = new Post();
  post.type = POST_TYPE_PRESS;
  post.text = 'Wise Sons Jewish Deli Outpost at the CJM';
  post.subtitle = 'San Francisco';
  post.background = '#26386F';
  posts[3] = post;
  posts[7] = post;
  posts[14] = post;
  posts[18] = post;

  post = new Post();
  post.type = POST_TYPE_INSTAGRAM;
  post.background = 'url("../images/photo-1.png")';
  posts[6] = post;
  posts[9] = post;
  posts[11] = post;
  posts[12] = post;
}

//====================Bubbles===========

export const sizes = [
  350,
  300,
  250,
  200,
  160
];

export let bubbles = [];

export class Bubble {
  constructor() {
    this.post = new Post();
    this.size = 0;
    this.x = 0;
    this.y = 0;
  }
}

export function checkIntersection(bubble1, bubble2) {
  let a1 = bubble1.x + bubble1.size/2 - (bubble2.x + bubble2.size/2);
  let a2 = bubble1.y + bubble1.size/2 - (bubble2.y + bubble2.size/2);
  let distance = Math.sqrt(a1 * a1 + a2 * a2);
  return (distance > (bubble1.size + bubble2.size) / 2.3);
}

export function setBubbles(width) {
  let containerWidth = width;
  let coeff = 1000 / width;
  let containerHeight = coeff * postNum * 110;

  for (let i = 1; i <= postNum; i++) {
    let bubble = new Bubble();
    bubble.post = posts[i - 1];
    let ind = Math.floor(Math.random() * sizes.length);
    bubble.size = Math.floor(sizes[ind] * (coeff > 1 ? 1 : 1/coeff));

    let check = true;
    do {
      bubble.x = Math.floor(Math.random() * (containerWidth - bubble.size));
      bubble.y = Math.floor(Math.random() * (containerHeight - bubble.size));
      check = true;
      for (let j = 0; j < i - 1; j++) {
        check = check && checkIntersection(bubble, bubbles[j]);
      }
    } while (!check);
    
    bubbles.push(bubble);
  }
  
  return bubbles;
}

//==============DOM Nodes============
export let bubbleNodes = [];

export function setNodes(parent) {
  for (let bubble of bubbles) {
    let elm = document.createElement('div');
    elm.className = 'bubble';
    elm.style.left = bubble.x + 'px';
    elm.style.top = bubble.y + 'px';
    elm.style.width = bubble.size + 'px';
    elm.style.height = bubble.size + 'px';

    elm.style.background = bubble.post.background;

    let elmText = document.createElement('div');
    elmText.className = 'title';
    elmText.innerHTML = bubble.post.text;
    elm.appendChild(elmText);

    let elmSubtitle = document.createElement('div');
    elmText.className = 'subtitle';
    elmText.innerHTML = bubble.post.subtitle;
    elm.appendChild(elmSubtitle);

    parent.appendChild(elm);
    bubbleNodes.push(elm);
  }
}
