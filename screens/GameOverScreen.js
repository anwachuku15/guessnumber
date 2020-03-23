import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Card from '../components/Card'


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Game Over!</Text>
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