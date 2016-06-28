export const POST_TYPE_PROJECT    = 'POST_TYPE_PROJECT';
export const POST_TYPE_INSTAGRAM  = 'POST_TYPE_INSTAGRAM';
export const POST_TYPE_PRESS      = 'POST_TYPE_PRESS';


export class Post {
  constructor() {
    this.type = POST_TYPE_PROJECT;
    this.text = '';
    this.subtitle = '';
    this.background = '';
  }
}

export class PostsService {
  posts = [];
  postNum = 20;

  setPosts() {
    for (let i = 0; i < this.postNum; i++) {
      let post = new Post();
      this.posts.push(post);
    }

    let post = new Post();
    post.text = 'Junk Food Clothing';
    post.subtitle = 'Venice Beach, CA';
    post.background = 'url("../images/photo-2.png") center center no-repeat';
    this.posts[0] = post;
    this.posts[2] = post;
    this.posts[13] = post;
    this.posts[19] = post;

    post = new Post();
    post.type = POST_TYPE_PRESS;
    post.text = 'Alternative Apparel Makes A Splash on Abbott Kinney';
    post.subtitle = '— REFINERY 29';
    post.background = '#0E172F';
    this.posts[4] = post;
    this.posts[8] = post;
    this.posts[12] = post;
    this.posts[15] = post;

    post = new Post();
    post.background = 'url("../images/photo-4.png") center center no-repeat';
    this.posts[1] = post;
    this.posts[5] = post;
    this.posts[10] = post;
    this.posts[12] = post;

    post = new Post();
    post.type = POST_TYPE_PRESS;
    post.text = 'Wise Sons Jewish Deli Outpost at the CJM';
    post.subtitle = '— SAN FRANCISCO EATE';
    post.background = '#26386F';
    this.posts[3] = post;
    this.posts[7] = post;
    this.posts[14] = post;
    this.posts[18] = post;

    post = new Post();
    post.type = POST_TYPE_INSTAGRAM;
    post.background = 'url("../images/photo-1.png") center center no-repeat';
    this.posts[6] = post;
    this.posts[9] = post;
    this.posts[11] = post;
    this.posts[12] = post;
  }
  
  process() {
    this.setPosts();
    return this.posts;
  }
}