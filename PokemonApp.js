import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PokemonApp = ({ navigation }) => {
  const [pokemon, setPokemon] = useState('');
  const [searchPokemon, setSearchPokemon] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (pokemon) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      setPokemonData(response.data);
      setLoading(false);
    } catch (erro) {
      setError('Pokémon não encontrado');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPokemon(pokemon.toLowerCase());
    setPokemon('');
  };

  const handlePrev = () => {
    if (searchPokemon > 1) {
      setSearchPokemon(searchPokemon - 1);
      fetchPokemon(searchPokemon - 1);
    }
  };

  const handleNext = () => {
    setSearchPokemon(searchPokemon + 1);
    fetchPokemon(searchPokemon + 1);
  };

  useEffect(() => {
    fetchPokemon(searchPokemon);
  }, [searchPokemon]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Pokémon</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome ou número do Pokémon"
        value={pokemon}
        onChangeText={(text) => setPokemon(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {pokemonData && (
        <View style={styles.pokemonContainer}>
          <Text style={styles.pokemonName}>{pokemonData.name}</Text>
          <Text style={styles.pokemonNumber}>#{pokemonData.id}</Text>
          <Image
            style={styles.pokemonImage}
            source={{ uri: pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default }}
          />
        </View>
      )}

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.button} onPress={handlePrev} disabled={searchPokemon === 1}>
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.simulateButton} onPress={() => navigation.navigate('Battle')}>
        <Text style={styles.buttonText}>Simular Batalha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    fontWeight: '600',
    color: '#3a444d',
    fontSize: 16,
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
  pokemonContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
  },
  pokemonName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  pokemonNumber: {
    fontSize: 18,
    color: '#666',
  },
  pokemonImage: {
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
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  simulateButton: {
    width: '80%',
    paddingVertical: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 5,
  },
});

export default PokemonApp;