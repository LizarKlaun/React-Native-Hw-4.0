import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeedStackParamList, Comment } from '../types';
import { MOCK_COMMENTS } from '../data/mockData';

type Props = NativeStackScreenProps<FeedStackParamList, 'CommentsScreen'>;

export const CommentsScreen: React.FC<Props> = ({ route }) => {
  const { postId } = route.params;
  const [comments, setComments] = useState<Comment[]>(
    MOCK_COMMENTS.filter((c) => c.postId === postId)
  );
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      authorName: 'current_user',
      text: text.trim(),
    };
    setComments((prev) => [...prev, newComment]);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.author}>{item.authorName}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commentItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendText: {
    color: '#0095f6',
    fontWeight: 'bold',
  },
});