// pages/UserPanel.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserPanel({ route }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const username = route.params.username;
      const userTasks = await AsyncStorage.getItem(`${username}_tasks`);
      setTasks(userTasks ? JSON.parse(userTasks) : []);
    };
    loadTasks();
  }, []);

  return (
    <View>
      <Text>User Panel</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default UserPanel;
