import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const DigimonApp = () => {
  const [digimon, setDigimon] = useState('');
  const [digimonData, setDigimonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDigimon = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
      setDigimonData(response.data[0]);
      setLoading(false);
    } catch (erro) {
      setError('Digimon não encontrado');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchDigimon(digimon.toLowerCase());
    setDigimon('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Digimon</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do Digimon"
        value={digimon}
        onChangeText={(text) => setDigimon(text)}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSearch}> 
      <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {digimonData && (
        <View style={styles.digimonContainer}>
          <Text style={styles.digimonName}>{digimonData.name}</Text>
          <Image
            style={styles.digimonImage}
            source={{ uri: digimonData.img }}
          />
          <Text style={styles.digimonLevel}>Nível: {digimonData.level}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    width: '45%',
    paddingVertical: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  digimonContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
  },
  digimonName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  digimonLevel: {
    fontSize: 18,
    color: '#333',
  },
  digimonImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 20,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});

export default DigimonApp;
