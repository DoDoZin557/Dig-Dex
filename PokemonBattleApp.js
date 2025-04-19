import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, Button, Animated, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PokemonBattleApp = () => {
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [pokemon1Data, setPokemon1Data] = useState(null);
  const [pokemon2Data, setPokemon2Data] = useState(null);
  const [winner, setWinner] = useState('');
  const [shakeAnim1] = useState(new Animated.Value(0));
  const [shakeAnim2] = useState(new Animated.Value(0));

  const fetchPokemonData = async (pokemon, setPokemonData) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      setPokemonData(response.data);
    } catch (error) {
      Alert.alert('Erro', `Pokémon ${pokemon} não encontrado.`);
    }
  };

  const startShake = (shakeAnim) => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const simulateBattle = () => {
    if (pokemon1Data && pokemon2Data) {
      const pokemon1Attack = pokemon1Data.stats[1].base_stat;
      const pokemon2Attack = pokemon2Data.stats[1].base_stat;
      const pokemon1Defense = pokemon1Data.stats[2].base_stat;
      const pokemon2Defense = pokemon2Data.stats[2].base_stat;

      const pokemon1Score = pokemon1Attack - pokemon2Defense;
      const pokemon2Score = pokemon2Attack - pokemon1Defense;

      if (pokemon1Score > pokemon2Score) {
        setWinner(pokemon1Data.name);
        startShake(shakeAnim2);
        setTimeout(() => setPokemon2Data(null), 1000);
      } else if (pokemon1Score < pokemon2Score) {
        setWinner(pokemon2Data.name);
        startShake(shakeAnim1);
        setTimeout(() => setPokemon1Data(null), 1000);
      } else {
        setWinner('Empate');
      }
    } else {
      Alert.alert('Erro', 'Ambos os Pokémon devem ser selecionados para a batalha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulação de Batalha de Pokémon</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do Pokémon 1"
          value={pokemon1}
          onChangeText={setPokemon1}
        />
        
        <TouchableOpacity style={styles.button} onPress={() => fetchPokemonData(pokemon1, setPokemon1Data)}>
          <Text style={styles.buttonText}>Buscar Pokémon 1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do Pokémon 2"
          value={pokemon2}
          onChangeText={setPokemon2}
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchPokemonData(pokemon2, setPokemon2Data)}>
          <Text style={styles.buttonText}>Buscar Pokémon 2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.battleScreen}>
        {pokemon1Data && (
          <Animated.View style={[styles.pokemonSection, { transform: [{ translateX: shakeAnim1 }] }]}>
            <Image style={styles.pokemonImage} source={{ uri: pokemon1Data.sprites.front_default }} />
            <View style={styles.pokemonInfo}>
              <Text style={styles.pokemonName}>{pokemon1Data.name.toUpperCase()}</Text>
              <Text style={styles.level}>Lv 50</Text>
              <Text style={styles.level}>Ataque: {pokemon1Data.stats[1].base_stat}</Text>
              <Text style={styles.level}>Defesa: {pokemon1Data.stats[2].base_stat}</Text>
              <Text style={styles.level}>HP: {pokemon1Data.stats[0].base_stat}</Text>
            </View>
          </Animated.View>
        )}

        {pokemon2Data && (
          <Animated.View style={[styles.pokemonSection, { transform: [{ translateX: shakeAnim2 }] }]}>
            <Image style={styles.pokemonImage} source={{ uri: pokemon2Data.sprites.front_default }} />
            <View style={styles.pokemonInfo}>
              <Text style={styles.pokemonName}>{pokemon2Data.name.toUpperCase()}</Text>
              <Text style={styles.level}>Lv 50</Text>
              <Text style={styles.level}>Ataque: {pokemon2Data.stats[1].base_stat}</Text>
              <Text style={styles.level}>Defesa: {pokemon2Data.stats[2].base_stat}</Text>
              <Text style={styles.level}>HP: {pokemon2Data.stats[0].base_stat}</Text>
            </View>
          </Animated.View>
        )}
      </View>

      <TouchableOpacity style={styles.button2} onPress={simulateBattle}>
      <Text style={styles.buttonText}>Iniciar Batalha</Text>
      </TouchableOpacity>

      {winner ? (
        <View style={styles.resultContainer}>
          <Text style={styles.winnerText}>Vencedor: {winner}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginRight: 8,
    padding: 8,
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
  button2: {
    width: '100%',
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
  battleScreen: {
    marginVertical: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingVertical: 20,
  },
  pokemonSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  pokemonInfo: {
    marginLeft: 20,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 18,
    color: '#333',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 20,
  },
  resultContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ff0000',
  },
});

export default PokemonBattleApp;