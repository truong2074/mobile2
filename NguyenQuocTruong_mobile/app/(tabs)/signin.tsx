import { Image, StyleSheet, Platform } from 'react-native';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://helios.vn/cdn/shop/files/W_47056a26-d656-4dfc-8374-82b4e727815a_500x.png?v=1723430157',
        }}
      />

      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Username"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

<TouchableOpacity style={styles.button} onPress={() => Alert.alert('Button pressed')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Don't have an account?</Text>
      <TouchableOpacity>
        <Link href='./signup' style={styles.signupLink}>Sign Up</Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'WHITE',
  },
  logo: {
    width: 300,
    height: 58,
    marginBottom: 30,
    resizeMode: 'contain',
    backgroundColor:'black'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0d87ee',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    marginTop: 20,
    color: '#555',
  },
  signupLink: {
    color: '#0d87ee',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
