import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  onCommentPress: (postId: string) => void;
  onUserPress: (userId: string, username: string, avatar: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onBookmark,
  onCommentPress,
  onUserPress,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => onUserPress(post.id, post.authorName, post.authorAvatar)}
      >
        <Image source={{ uri: post.authorAvatar }} style={styles.avatar} />
        <Text style={styles.authorName}>{post.authorName}</Text>
      </TouchableOpacity>

      <Image source={{ uri: post.mediaUrl }} style={styles.media} />

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => onLike(post.id)}>
            <Ionicons
              name={post.isLiked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.isLiked ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onCommentPress(post.id)} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => onBookmark(post.id)}>
          <Ionicons
            name={post.isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.likesText}>{post.likes} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.captionAuthor}>{post.authorName} </Text>
          {post.caption}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  media: {
    width: '100%',
    height: 300,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 15,
  },
  details: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  likesText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
  },
  captionAuthor: {
    fontWeight: 'bold',
  },
});