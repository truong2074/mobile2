import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [numberag, onChangeNumberAG] = React.useState('');

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://helios.vn/cdn/shop/files/W_47056a26-d656-4dfc-8374-82b4e727815a_500x.png?v=1723430157',
        }}
      />

      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Username"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumberAG}
        value={numberag}
        placeholder="Password Again"
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Button pressed')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>Already have an account?</Text>
      <TouchableOpacity>
        <Link href='./signin' style={styles.link}>
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    width: 300,
    height: 58,
    marginBottom: 30,
    resizeMode: 'contain',
    backgroundColor:'black'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#0d87ee',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#0d87ee',
    marginTop: 15,
    textAlign: 'center',
  },
});
