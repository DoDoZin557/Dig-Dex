import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import PokemonApp from './PokemonApp';
import PokemonBattleApp from './PokemonBattleApp';
import DigimonApp from './DigimonApp';
import DigiDexGame from './DigiDexGame';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>DigiDex</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pokemon')}>
        <Text style={styles.buttonText}>Pokédex</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Digimon')}>
        <Text style={styles.buttonText}>Digivice</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pokemon" component={PokemonApp} />
        <Stack.Screen name="Battle" component={PokemonBattleApp} />
        <Stack.Screen name="Digimon" component={DigimonApp} />
        <Stack.Screen name="Game" component={DigiDexGame} />
      </Stack.Navigator>
    </NavigationContainer>
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
    fontSize: 72,
    fontWeight: '600',
    marginBottom: 40,
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
});

export default App;
