import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

import Colors from '../constants/colors'


const StartGameScreen = props => {

    const [value, setValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    
    const inputHandler = inputText => {
        setValue(inputText.replace(/[^0-9]/g, ''))
    }

    const reset = () => {
        setValue('')
        setConfirmed(false)
    }
    
    const confirm = () => {
        const chosenNumber = parseInt(value)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!', 
                'Number must be between 1-99', 
                [{text: 'Okay', style: 'destructive', onPress: reset}]
            )
            return
        }
        setConfirmed(true)
        setValue('')
        setSelectedNumber(chosenNumber)
        Keyboard.dismiss()
    }

    let confirmedOutput

    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.outputContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)} />
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.screen}>

                <Text style={styles.title}>Start a New Game!</Text>

                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    
                    <Input 
                        style={styles.input} 
                        blurOnSubmit 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        keyboardType='number-pad' 
                        maxLength={2} 
                        onChangeText={inputHandler}
                        value={value}
                    />
                
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title='Reset' onPress={reset} color={Colors.accent}/></View>
                        <View style={styles.button}><Button title='Confirm' onPress={confirm} color={Colors.primary}/></View>
                    </View>
                </Card>

                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width:  '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    outputContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen