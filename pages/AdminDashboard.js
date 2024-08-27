import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminDashboard = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setTasks(parsedUser.tasks);
        }
      } catch (error) {
        alert('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, []);


  const handleAssignTask = async () => {
    if (newTask && selectedUser) {
      try {
        const user = await AsyncStorage.getItem(`user_${selectedUser}`);
        let parsedUser = { tasks: [] };
        if (user) {
          parsedUser = JSON.parse(user);
        }
        parsedUser.tasks.push({ id: Date.now(), task: newTask, assignedTo: selectedUser, completed: false, deadline });
        await AsyncStorage.setItem(`user_${selectedUser}`, JSON.stringify(parsedUser));
        setTasks(parsedUser.tasks);
        setNewTask('');
      } catch (error) {
        alert('Failed to assign task');
      }
    } else {
      alert('Please provide a task and select a user');
    }
  };
  
  // const handleAssignTask = async () => {
  //   if (newTask && selectedUser) {
  //     try {
  //       const user = await AsyncStorage.getItem('user');
  //       if (user) {
  //         const parsedUser = JSON.parse(user);
  //         parsedUser.tasks.push({ task: newTask, assignedTo: selectedUser, completed: false, deadline });
  //         await AsyncStorage.setItem('user', JSON.stringify(parsedUser));
  //         setTasks(parsedUser.tasks);
  //         setNewTask('');
  //       }
  //     } catch (error) {
  //       alert('Failed to assign task');
  //     }
  //   } else {
  //     alert('Please provide a task and select a user');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TextInput
        style={styles.input}
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <TextInput
        style={styles.input}
        placeholder="Assign to (username)"
        value={selectedUser}
        onChangeText={setSelectedUser}
      />
      <Button title="Set Deadline" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={deadline}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDeadline(selectedDate);
            }
          }}
        />
      )}
      <Button title="Assign Task" onPress={handleAssignTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>Task: {item.task}</Text>
            <Text>Assigned to: {item.assignedTo}</Text>
            <Text>Deadline: {new Date(item.deadline).toLocaleString()}</Text>
            <Text>Status: {item.completed ? 'Completed' : 'Pending'}</Text>
          </View>
        )}
      />
      <Button title="Log Out" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  task: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default AdminDashboard;
