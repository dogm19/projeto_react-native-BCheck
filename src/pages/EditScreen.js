import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditScreen = ({ route, navigation }) => {
  const [text, setText] = useState('');
  const itemId = route.params.itemId;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('checklistItems');
      if (storedItems !== null) {
        const items = JSON.parse(storedItems);
        const item = items.find((item) => item.id === itemId);
        if (item) {
          setText(item.text);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async () => {
    if (text.trim() !== '') {
      try {
        const storedItems = await AsyncStorage.getItem('checklistItems');
        if (storedItems !== null) {
          const items = JSON.parse(storedItems);
          const updatedItems = items.map((item) => {
            if (item.id === itemId) {
              return { id: item.id, text: text.trim() };
            }
            return item;
          });
          await AsyncStorage.setItem('checklistItems', JSON.stringify(updatedItems));
          navigation.goBack();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
            source={require("../assets/logo.png")}
            style={{ width: "100%" , height:'50%', marginRight: 15}}
            resizeMode="contain"
          />
        </View>
      <TextInput
        style={styles.input}
        placeholder="Digite um item"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <View style={styles.botoesHome}>
      <TouchableOpacity style={styles.updateButton} onPress={updateItem}>
        <Icon name="save" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton02} onPress={() => {navigation.goBack();}}>
          <Icon name="close" size={30} color="#D53237" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E2DBD5',
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
   botoesHome:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  updateButton: {
    justifyContent: 'center',
    height: 40,
    marginRight: 60,
  },
  addButton02: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});

export default EditScreen;
