import {BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S} from './bubbles';

export const POST_TYPE_PROJECT    = 'POST_TYPE_PROJECT';
export const POST_TYPE_INSTAGRAM  = 'POST_TYPE_INSTAGRAM';
export const POST_TYPE_PRESS      = 'POST_TYPE_PRESS';
export const POST_TYPE_VIDEO      = 'POST_TYPE_VIDEO';

const postTypes = [POST_TYPE_PROJECT, POST_TYPE_INSTAGRAM, POST_TYPE_PRESS, POST_TYPE_VIDEO];
const postSizes = [BUBBLE_TYPE_XL, BUBBLE_TYPE_L, BUBBLE_TYPE_M, BUBBLE_TYPE_S];


export class Post {
  type = POST_TYPE_PROJECT;
  size = BUBBLE_TYPE_L;
  text = '';
  subtitle = '';
  backgroundColor = '';
  backgroundImage = '';
  video = {};

  images = [];
}

export class PostsService {
  posts = [];

  setPosts() {
    $('.bubble-container').each((index, elm) => {
      let post = new Post();
      for (let i = 0; i < elm.classList.length; i++) {
        let cls = elm.classList.item(i);
        if (postTypes.indexOf(cls) != -1)
          post.type = cls;
        else if (postSizes.indexOf(cls) != -1)
          post.size = cls;
      }

      let bubbleStyles = $(elm).find('.bubble').get(0).style;
      post.backgroundColor = bubbleStyles.backgroundColor;
      post.backgroundImage = bubbleStyles.backgroundImage;

      post.title    = $(elm).find('.title').text();
      post.subtitle = $(elm).find('.subtitle').text();
      post.text     = $(elm).find('.content-text').text();

      $(elm).find('.content-image img').each((index, elm) => {
        post.images.push(elm.getAttribute('data-src') || elm.getAttribute('src'));
      });
  
      let iframe = $(elm).find('.iframe');
      post.video.src = iframe.attr('src');
      post.video.width = iframe.attr('width');
      post.video.height = iframe.attr('height');
      post.video.frameborder = iframe.attr('frameborder');
      post.video.webkitallowfullscreen = iframe.attr('webkitallowfullscreen');
      post.video.mozallowfullscreen = iframe.attr('mozallowfullscreen');
      post.video.allowfullscreen = iframe.attr('allowfullscreen');

      this.posts.push(post);
    });
  }

  process() {
    this.setPosts();
    return this.posts;
  }

  getFilteredPosts(type) {
    let res = [];
    for (let post of this.posts) {
      if (!type || post.type == type)
        res.push(post);
    }
    return res;
  }
}
