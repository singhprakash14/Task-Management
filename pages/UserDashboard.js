import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDashboard = ({ route, navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskId, setTaskId] = useState(null);
  const { username } = route.params;

  useEffect(() => {
    // const fetchTasks = async () => {
    //   try {
    //     const user = await AsyncStorage.getItem(`user_${username}`);
    //     if (user) {
    //       const parsedUser = JSON.parse(user);
    //       setTasks(parsedUser.tasks);
    //     }
    //   } catch (error) {
    //     alert('Failed to fetch tasks');
    //   }
    // };
    const fetchTasks = async () => {
      try {
        const user = await AsyncStorage.getItem(`user_${username}`);
        if (user) {
          const parsedUser = JSON.parse(user);
          setTasks(parsedUser.tasks);
        }
      } catch (error) {
        alert('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, [username]);

  const handleCreateTask = async () => {
    if (newTask) {
      try {
        const user = await AsyncStorage.getItem(`user_${username}`);
        if (user) {
          const parsedUser = JSON.parse(user);
          const updatedTasks = [...parsedUser.tasks, { id: Date.now(), task: newTask, assignedTo: username, completed: false }];
          parsedUser.tasks = updatedTasks;
          await AsyncStorage.setItem(`user_${username}`, JSON.stringify(parsedUser));
          setTasks(updatedTasks);
          setNewTask('');
        }
      } catch (error) {
        alert('Failed to create task');
      }
    } else {
      alert('Please provide a task');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const user = await AsyncStorage.getItem(`user_${username}`);
      if (user) {
        const parsedUser = JSON.parse(user);
        const updatedTasks = parsedUser.tasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        );
        parsedUser.tasks = updatedTasks;
        await AsyncStorage.setItem(`user_${username}`, JSON.stringify(parsedUser));
        setTasks(updatedTasks);
      }
    } catch (error) {
      alert('Failed to complete task');
    }
  };

  // No need for handleEditTask and handleDeleteTask as users should not edit or delete tasks

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <TextInput
        style={styles.input}
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Create Task" onPress={handleCreateTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>Task: {item.task}</Text>
            <Text>Status: {item.completed ? 'Completed' : 'Pending'}</Text>
            {!item.completed && (
              <>
                <Button title="Complete" onPress={() => handleCompleteTask(item.id)} />
                {item.assignedTo === username && (
                  // No editing or deleting options for users
                  <Text>No options to edit or delete tasks for users</Text>
                )}
              </>
            )}
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

export default UserDashboard;
