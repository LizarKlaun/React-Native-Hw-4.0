import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateStackParamList } from '../types';

type Props = NativeStackScreenProps<CreateStackParamList, 'PickerScreen'>;

export const PickerScreen: React.FC<Props> = ({ navigation }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <Text style={styles.placeholderText}>Select or Capture Media</Text>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={pickImageFromGallery}>
          <Text style={styles.btnText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={takePhotoWithCamera}>
          <Text style={styles.btnText}>Camera</Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('PostDetailsScreen', { imageUri })}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  previewContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    color: '#888',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#efefef',
    borderRadius: 8,
  },
  btnText: {
    fontWeight: 'bold',
  },
  nextBtn: {
    marginHorizontal: 20,
    backgroundColor: '#0095f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});