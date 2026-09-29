import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateStackParamList, Post } from '../types';

interface Props extends NativeStackScreenProps<CreateStackParamList, 'PostDetailsScreen'> {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const PostDetailsScreen: React.FC<Props> = ({ route, navigation, setPosts }) => {
  const { imageUri } = route.params;
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const handlePublish = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      authorName: 'current_user',
      authorAvatar: 'https://picsum.photos/id/64/100/100',
      mediaUrl: imageUri,
      likes: 0,
      caption: `${caption} ${location ? `— at ${location}` : ''}`,
      isLiked: false,
      isBookmarked: false,
    };

    setPosts((prev) => [newPost, ...prev]);

    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('FeedStack');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: imageUri }} style={styles.thumbnail} />
        <TextInput
          style={styles.captionInput}
          placeholder="Write a caption..."
          multiline
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Add location or hashtags"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
        <Text style={styles.publishText}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  captionInput: {
    flex: 1,
    height: 80,
    textAlignVertical: 'top',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 20,
  },
  publishBtn: {
    backgroundColor: '#0095f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});