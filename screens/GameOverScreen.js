import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

import colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>Game Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    // source={require('../assets/success.png')} 
                    source={{uri: 'https://miro.medium.com/max/5000/1*QqoS6WsjG6WSr9-BFFQhbA.jpeg'}}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>
            <BodyText>Number of rounds: {props.rounds}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: colors.accent,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
})


export default GameOverScreen