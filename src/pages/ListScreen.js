import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('checklistItems');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    await saveData(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Edit', { itemId: item.id })}
      >
        <Icon name="edit" size={18} color="#F2B33D" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Icon name="delete" size={18} color="#D53237" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BCheck</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.botoesHome}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => {navigation.goBack();}}>
         <Icon name="undo" size={20} color="#D53237" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
         <Icon name="add" size={30} color="#028074" />
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
  },
  botoesHome:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoVoltar:{
    marginRight: "83%",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#E2DBD5',
    position: "relative",
    background: "linear-gradient(178.1deg, #028044 17.21%, #025A4D 74.66%)",
    bottom: 16,
    right: 16,
    width: "111.5%",
    textAlign:'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottom: 'solid 1px #BEB4A8',
    paddingBottom: 5,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  editButton: {
    marginLeft: 8,
  },
});

export default ListScreen;
