import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role

  const handleSignup = async () => {
    if (username && password) {
      try {
        const existingUser = await AsyncStorage.getItem(`user_${username}`);
        if (existingUser) {
          alert('User already exists');
        } else {
          await AsyncStorage.setItem(`user_${username}`, JSON.stringify({ username, password, role, tasks: [] }));
          alert('Signup successful');
          navigation.navigate('Login');
        }
      } catch (error) {
        alert('Signup failed');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.roleContainer}>
        <Button title="Select Admin" onPress={() => setRole('admin')} />
        <Button title="Select User" onPress={() => setRole('user')} />
      </View>
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Signup;
