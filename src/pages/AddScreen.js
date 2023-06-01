import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddScreen = ({ navigation }) => {
  const [text, setText] = useState('');

  const addItem = async () => {
    if (text.trim() !== '') {
      const newItem = {
        id: Date.now().toString(),
        text: text.trim(),
      };
      try {
        const storedItems = await AsyncStorage.getItem('checklistItems');
        let updatedItems = [];
        if (storedItems !== null) {
          updatedItems = JSON.parse(storedItems);
        }
        updatedItems.push(newItem);
        await AsyncStorage.setItem('checklistItems', JSON.stringify(updatedItems));
        navigation.goBack();
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
        style=
        {styles.input}
        placeholder="Digite um item"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <View style={styles.botoesHome}>
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Icon name="done" size={30} color="#028074" />
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
  addButton: {
    alignItems: 'center',
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

export default AddScreen;
