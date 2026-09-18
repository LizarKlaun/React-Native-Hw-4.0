import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- НАЧАЛЬНЫЕ ДАННЫЕ (MOCK DATA) ---
const INITIAL_POSTS = [
  {
    id: '1',
    author: 'Alex Developer',
    avatar: 'https://picsum.photos/id/1005/100/100',
    media: 'https://picsum.photos/id/1018/600/400',
    likes: 124,
    isLiked: false,
    isBookmarked: false,
    caption: 'Красивый вид на горы! #nature #travel',
    comments: [
      { id: 'c1', author: 'Anna', text: 'Супер кадр!' },
      { id: 'c2', author: 'John', text: 'Где это снято?' },
    ],
  },
  {
    id: '2',
    author: 'Design Pro',
    avatar: 'https://picsum.photos/id/1027/100/100',
    media: 'https://picsum.photos/id/1025/600/400',
    likes: 89,
    isLiked: false,
    isBookmarked: false,
    caption: 'Утренний кофе и работа над проектом ☕',
    comments: [],
  },
];

// --- ГЛОБАЛЬНЫЙ КОНТЕКСТ СОСТОЯНИЯ ---
const AppContext = React.createContext();

// ==========================================
// 1. FEED STACK (Лента и Комментарии)
// ==========================================

function FeedScreen({ navigation }) {
  const { posts, setPosts } = React.useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleBookmark = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            {/* Аватар и имя */}
            <TouchableOpacity
              style={styles.postHeader}
              onPress={() =>
                navigation.navigate('SearchTab', {
                  screen: 'UserProfile',
                  params: { username: item.author, avatar: item.avatar },
                })
              }
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.authorName}>{item.author}</Text>
            </TouchableOpacity>

            {/* Медиаконтент */}
            <Image source={{ uri: item.media }} style={styles.postImage} />

            {/* Панель действий */}
            <View style={styles.actionsRow}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => toggleLike(item.id)}
                  style={styles.actionBtn}
                >
                  <Text style={{ fontSize: 18 }}>
                    {item.isLiked ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Comments', { postId: item.id })
                  }
                  style={styles.actionBtn}
                >
                  <Text style={{ fontSize: 18 }}>💬</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                <Text style={{ fontSize: 18 }}>
                  {item.isBookmarked ? '🔖' : '🏷️'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Лайки и подпись */}
            <View style={styles.postDetails}>
              <Text style={styles.likesText}>{item.likes} отметок "Нравится"</Text>
              <Text style={styles.captionText}>
                <Text style={styles.authorName}>{item.author} </Text>
                {item.caption}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function CommentsScreen({ route }) {
  const { postId } = route.params;
  const { posts, setPosts } = React.useContext(AppContext);
  const [commentText, setCommentText] = useState('');

  const currentPost = posts.find((p) => p.id === postId);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      author: 'Вы',
      text: commentText.trim(),
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      )
    );
    setCommentText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={currentPost?.comments || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <Text style={styles.authorName}>{item.author}: </Text>
            <Text style={{ fontSize: 16 }}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Комментариев пока нет</Text>
        }
      />
      <View style={styles.inputForm}>
        <TextInput
          style={styles.inputTitle}
          placeholder="Оставить комментарий..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
          <Text style={styles.addButtonText}>Отправить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const FeedStack = createNativeStackNavigator();
function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ title: 'Лента' }}
      />
      <FeedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: 'Комментарии' }}
      />
    </FeedStack.Navigator>
  );
}

// ==========================================
// 2. SEARCH STACK (Поиск, Сетка, Профиль)
// ==========================================

function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const GRID_ITEMS = [
    'https://picsum.photos/id/10/300/300',
    'https://picsum.photos/id/20/300/300',
    'https://picsum.photos/id/30/300/300',
    'https://picsum.photos/id/40/300/300',
    'https://picsum.photos/id/50/300/300',
    'https://picsum.photos/id/60/300/300',
    'https://picsum.photos/id/70/300/300',
    'https://picsum.photos/id/80/300/300',
    'https://picsum.photos/id/90/300/300',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск пользователей..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {searchQuery.length > 0 ? (
        <TouchableOpacity
          style={styles.userSearchItem}
          onPress={() =>
            navigation.navigate('UserProfile', {
              username: searchQuery,
              avatar: 'https://picsum.photos/id/1025/100/100',
            })
          }
        >
          <Text style={styles.authorName}>👤 {searchQuery}</Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={GRID_ITEMS}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.gridImage} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function UserProfileScreen({ route }) {
  const { username, avatar } = route.params || {
    username: 'Пользователь',
    avatar: 'https://picsum.photos/id/1025/100/100',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: avatar }} style={styles.profileAvatar} />
        <Text style={styles.profileTitle}>{username}</Text>
      </View>
      <Text style={styles.sectionTitle}>Публикации пользователя:</Text>
      <View style={styles.gridContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/id/1018/300/300' }}
          style={styles.gridImage}
        />
        <Image
          source={{ uri: 'https://picsum.photos/id/1025/300/300' }}
          style={styles.gridImage}
        />
      </View>
    </SafeAreaView>
  );
}

const SearchStack = createNativeStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Поиск' }}
      />
      <SearchStack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={({ route }) => ({ title: route.params?.username || 'Профиль' })}
      />
    </SearchStack.Navigator>
  );
}

// ==========================================
// 3. CREATE STACK (Выбор медиа и Описание)
// ==========================================

function PickerScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(
    'https://picsum.photos/id/1069/600/400'
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerHeader}>
        <TouchableOpacity
          style={styles.modeBtn}
          onPress={() => setSelectedImage('https://picsum.photos/id/1069/600/400')}
        >
          <Text style={styles.modeText}>Галерея</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modeBtn}
          onPress={() => setSelectedImage('https://picsum.photos/id/1084/600/400')}
        >
          <Text style={styles.modeText}>Камера</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewContainer}>
        <Text style={styles.sectionTitle}>Предпросмотр:</Text>
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('PostDetails', { mediaUri: selectedImage })
        }
      >
        <Text style={styles.addButtonText}>Далее</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function PostDetailsScreen({ route, navigation }) {
  const { mediaUri } = route.params;
  const { setPosts } = React.useContext(AppContext);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const handlePublish = () => {
    if (!caption.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      author: 'Вы (Текущий юзер)',
      avatar: 'https://picsum.photos/id/1005/100/100',
      media: mediaUri,
      likes: 0,
      isLiked: false,
      isBookmarked: false,
      caption: `${caption} ${location ? '📍 ' + location : ''}`,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);

    // Возврат на ленту
    navigation.getParent()?.navigate('FeedTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 16 }}>
        <Image source={{ uri: mediaUri }} style={styles.smallPreview} />
        <TextInput
          style={styles.inputArea}
          placeholder="Напишите описание (caption)..."
          multiline
          value={caption}
          onChangeText={setCaption}
        />
        <TextInput
          style={styles.inputTitle}
          placeholder="Добавить геопозицию / хештеги"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
          <Text style={styles.addButtonText}>Опубликовать</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const CreateStack = createNativeStackNavigator();
function CreateStackScreen() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name="Picker"
        component={PickerScreen}
        options={{ title: 'Создание публикации' }}
      />
      <CreateStack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
        options={{ title: 'Описание публикации' }}
      />
    </CreateStack.Navigator>
  );
}

// ==========================================
// ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ (ТАБЫ)
// ==========================================

const Tab = createBottomTabNavigator();

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  return (
    <AppContext.Provider value={{ posts, setPosts }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="FeedTab"
            component={FeedStackScreen}
            options={{ title: 'Лента', tabBarIcon: () => <Text>🏠</Text> }}
          />
          <Tab.Screen
            name="SearchTab"
            component={SearchStackScreen}
            options={{ title: 'Поиск', tabBarIcon: () => <Text>🔍</Text> }}
          />
          <Tab.Screen
            name="CreateTab"
            component={CreateStackScreen}
            options={{ title: 'Создать', tabBarIcon: () => <Text>➕</Text> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

// ==========================================
// СТИЛИ
// ==========================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  postCard: { marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  authorName: { fontWeight: 'bold', fontSize: 15 },
  postImage: { width: '100%', height: 250 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  actionBtn: { marginRight: 15 },
  postDetails: { paddingHorizontal: 10, paddingBottom: 10 },
  likesText: { fontWeight: 'bold', marginBottom: 4 },
  captionText: { fontSize: 14 },
  commentRow: { padding: 12, borderBottomWidth: 1, borderColor: '#EEE' },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#888' },
  inputForm: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#EEE' },
  inputTitle: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonText: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
  },
  gridImage: { width: '33.33%', height: 120, borderWidth: 1, borderColor: '#FFF' },
  userSearchItem: { padding: 15, borderBottomWidth: 1, borderColor: '#EEE' },
  profileHeader: { alignItems: 'center', padding: 20 },
  profileAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  profileTitle: { fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', margin: 10 },
  gridContainer: { flexDirection: 'row' },
  pickerHeader: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  modeBtn: { padding: 10, backgroundColor: '#EEE', borderRadius: 8 },
  modeText: { fontWeight: 'bold' },
  previewContainer: { alignItems: 'center', marginVertical: 10 },
  previewImage: { width: 300, height: 200, borderRadius: 8 },
  nextButton: {
    backgroundColor: '#198754',
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  smallPreview: { width: 100, height: 100, borderRadius: 8, alignSelf: 'center', marginBottom: 15 },
  inputArea: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    height: 80,
    marginBottom: 10,
  },
  publishBtn: {
    backgroundColor: '#0D6EFD',
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },
});