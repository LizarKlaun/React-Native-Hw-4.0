import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  mediaUrl: string;
  likes: number;
  caption: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  text: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
}

export type RootTabParamList = {
  FeedStack: undefined;
  SearchStack: undefined;
  CreateStack: undefined;
};

export type FeedStackParamList = {
  FeedScreen: undefined;
  CommentsScreen: { postId: string };
  UserProfileScreen: { userId: string; username: string; avatar: string };
};

export type SearchStackParamList = {
  SearchScreen: undefined;
  UserProfileScreen: { userId: string; username: string; avatar: string };
};

export type CreateStackParamList = {
  PickerScreen: undefined;
  PostDetailsScreen: { imageUri: string };
};

export type FeedScreenProps = NativeStackScreenProps<FeedStackParamList, 'FeedScreen'>;
export type CommentsScreenProps = NativeStackScreenProps<FeedStackParamList, 'CommentsScreen'>;
export type UserProfileScreenProps = NativeStackScreenProps<FeedStackParamList, 'UserProfileScreen'>;
export type SearchScreenProps = NativeStackScreenProps<SearchStackParamList, 'SearchScreen'>;
export type PickerScreenProps = NativeStackScreenProps<CreateStackParamList, 'PickerScreen'>;
export type PostDetailsScreenProps = NativeStackScreenProps<CreateStackParamList, 'PostDetailsScreen'>;