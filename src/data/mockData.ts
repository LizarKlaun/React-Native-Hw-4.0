import { Post, Comment, User } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    authorName: 'alex_dev',
    authorAvatar: 'https://picsum.photos/id/64/100/100',
    mediaUrl: 'https://picsum.photos/id/10/600/400',
    likes: 124,
    caption: 'Great day for coding outside! ☀️ #developer #reactnative',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    authorName: 'travel_lover',
    authorAvatar: 'https://picsum.photos/id/65/100/100',
    mediaUrl: 'https://picsum.photos/id/29/600/400',
    likes: 89,
    caption: 'Mountains calling 🏔️',
    isLiked: false,
    isBookmarked: false,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', postId: '1', authorName: 'john_doe', text: 'Awesome view!' },
  { id: 'c2', postId: '1', authorName: 'katie_s', text: 'Nice setup 🔥' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'alex_dev', avatar: 'https://picsum.photos/id/64/100/100', bio: 'React Native Developer' },
  { id: 'u2', username: 'travel_lover', avatar: 'https://picsum.photos/id/65/100/100', bio: 'Exploring the world' },
  { id: 'u3', username: 'photo_art', avatar: 'https://picsum.photos/id/102/100/100', bio: 'Digital Creator' },
];

export const GRID_IMAGES = [
  'https://picsum.photos/id/101/300/300',
  'https://picsum.photos/id/102/300/300',
  'https://picsum.photos/id/103/300/300',
  'https://picsum.photos/id/104/300/300',
  'https://picsum.photos/id/106/300/300',
  'https://picsum.photos/id/107/300/300',
  'https://picsum.photos/id/108/300/300',
  'https://picsum.photos/id/109/300/300',
  'https://picsum.photos/id/110/300/300',
];