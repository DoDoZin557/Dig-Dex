import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image,TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [character, setCharacter] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCharacter = async () => {
    setLoading(true);
    const isPokemon = Math.random() < 0.5;

    if (isPokemon) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        setCharacter({ name: response.data.name, image: response.data.sprites.front_default, type: 'Pokémon' });
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * 151);
      try {
        const response = await axios.get(`https://digimon-api.vercel.app/api/digimon`);
        setCharacter({ name: response.data[randomIndex].name, image: response.data[randomIndex].img, type: 'Digimon' });
      } catch (error) {
        console.error('Erro ao buscar Digimon:', error);
      }
    }
    setLoading(false);
  };

  const handleGuess = (guess) => {
    if (guess === character.type) {
      setResult('Você acertou!');
    } else {
      setResult(`Você errou! Era um ${character.type}.`);
    }
    setTimeout(fetchCharacter, 2000);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Isso é um</Text>
      <Text style={styles.title}>Pokémon ou Digimon?</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.characterName}>{character.name}</Text>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={() => handleGuess('Pokémon')}>
          <Text style={styles.buttonText}>pokémon</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleGuess('Digimon')}>
          <Text style={styles.buttonText}>Digimon</Text>
            </TouchableOpacity>

          </View>
          <Text style={styles.result}>{result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '70%',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    margin: 20,
    
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  result: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ff0000',
    textAlign: 'center',
  },
});

export default App;
