import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import {
  RootTabParamList,
  FeedStackParamList,
  SearchStackParamList,
  CreateStackParamList,
  Post,
} from '../types';
import { INITIAL_POSTS } from '../data/mockData';

import { FeedScreen } from '../screens/FeedScreen';
import { CommentsScreen } from '../screens/CommentsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { PickerScreen } from '../screens/PickerScreen';
import { PostDetailsScreen } from '../screens/PostDetailsScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const CreateStack = createNativeStackNavigator<CreateStackParamList>();

export const RootNavigator = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const FeedStackNavigator = () => (
    <FeedStack.Navigator>
      <FeedStack.Screen name="FeedScreen" options={{ title: 'Feed' }}>
        {(props) => <FeedScreen {...props} posts={posts} setPosts={setPosts} />}
      </FeedStack.Screen>
      <FeedStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{ title: 'Comments' }}
      />
      <FeedStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </FeedStack.Navigator>
  );

  const SearchStackNavigator = () => (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: 'Search & Explore' }}
      />
      <SearchStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </SearchStack.Navigator>
  );

  const CreateStackNavigator = () => (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name="PickerScreen"
        component={PickerScreen}
        options={{ title: 'New Post' }}
      />
      <CreateStack.Screen name="PostDetailsScreen" options={{ title: 'Details' }}>
        {(props) => <PostDetailsScreen {...props} setPosts={setPosts} />}
      </CreateStack.Screen>
    </CreateStack.Navigator>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'FeedStack') iconName = 'home-outline';
          else if (route.name === 'SearchStack') iconName = 'search-outline';
          else if (route.name === 'CreateStack') iconName = 'add-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="FeedStack" component={FeedStackNavigator} options={{ title: 'Feed' }} />
      <Tab.Screen name="SearchStack" component={SearchStackNavigator} options={{ title: 'Search' }} />
      <Tab.Screen name="CreateStack" component={CreateStackNavigator} options={{ title: 'Create' }} />
    </Tab.Navigator>
  );
};