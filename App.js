import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

export default function App() {

  const [userNumber, setUserNumber] = useState()

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  let Content = userNumber ? <GameScreen userChoice={userNumber} /> : <StartGameScreen onStartGame={startGameHandler} />

  return (
    <View style={styles.screen}>
      <Header title='Guess A Number'/>

      {Content}

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
