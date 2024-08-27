import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        const user = await AsyncStorage.getItem(`user_${username}`);
        if (user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser.password === password) {
            if (parsedUser.role === 'admin') {
              navigation.navigate('AdminDashboard', { username });
            } else {
              navigation.navigate('UserDashboard', { username });
            }
          } else {
            alert('Invalid username or password');
          }
        } else {
          alert('No user found');
        }
      } catch (error) {
        alert('Login failed');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Log In" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupLink}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
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
  signupLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default Login;
