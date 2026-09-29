import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { SearchScreenProps, User } from '../types';
import { MOCK_USERS, GRID_IMAGES } from '../data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TILE_SIZE = SCREEN_WIDTH / 3;

export const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const [query, setQuery] = useState('');

  const filteredUsers = MOCK_USERS.filter((user: User) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const isSearching = query.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {isSearching ? (
        <FlatList
          key="user-list"
          data={filteredUsers}
          keyExtractor={(item: User) => item.id}
          renderItem={({ item }: { item: User }) => (
            <TouchableOpacity
              style={styles.userRow}
              onPress={() =>
                navigation.navigate('UserProfileScreen', {
                  userId: item.id,
                  username: item.username,
                  avatar: item.avatar,
                })
              }
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.bio}>{item.bio}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          key="media-grid-3"
          data={GRID_IMAGES}
          keyExtractor={(_: string, index: number) => index.toString()}
          numColumns={3}
          renderItem={({ item }: { item: string }) => (
            <Image source={{ uri: item }} style={styles.tile} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#efefef',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  bio: {
    color: '#666',
    fontSize: 12,
  },
});