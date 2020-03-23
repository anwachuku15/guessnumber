import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import Card from '../components/Card'


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Game Over!</Text>
            <Text>Number of rounds: {props.rounds}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title='NEW GAME' onPress={props.onRestart}/>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default GameOverScreen