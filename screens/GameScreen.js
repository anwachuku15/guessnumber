import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native'

import { Ionicons } from '@expo/vector-icons'


import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import BodyText from '../components/BodyText'

import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
        return generateRandomNumber(min, max, exclude)   
    } else {
        return rndNum
    }
}

const renderListItem = (listLength, itemData) => (
    <View key={itemData.index} style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}:</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const { bodyText, title } = DefaultStyles

    const initialGuess = generateRandomNumber(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    
    const currentLow = useRef(1) 
    const currentHigh = useRef(100)
    
    const { userChoice, onGameOver } = props
    
    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        
        if (
            (direction === 'lower' && currentGuess < userChoice) || 
            (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert(
                'Don\'t lie!', 
                'You know this is wrong...', 
                [{text: 'Sorry!', style: 'cancel'}]
            )
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }

        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess)
        
        setCurrentGuess(nextNumber)
        // setRounds(currentRounds => currentRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }



    return (
        <View style={styles.screen}>

            <Text style={title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>
                <MainButton title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>

            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center', 
        justifyContent: 'flex-start'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
})


export default GameScreen