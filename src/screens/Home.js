import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker';

export default function Home({navigation}) {

    const [level, setLevel] = useState('');
    const [name, setName] = useState('')

    function goToGame (level, name) {
        if(!name){
            alert('Input your name first')
        } else if(!level) {
            alert('Pick level first')
        } else {
            navigation.navigate('Game', {level, name})
        }
    }

    return (
        <View style={styles.container}>
            <Image
            style={{ width: 250, height: 150, marginBottom: 50 }}
            source={{
                uri: 'https://i.imgur.com/jYdR951.jpg'
            }}
            />
            <Text>Input Your Name{"\n"}</Text>
            <TextInput 
                style={styles.input}
                value={{name}}
                onChangeText={(value) => setName(value)}
            ></TextInput>
            <Text>Pick Level{"\n"}</Text> 
            <View style={{ borderRadius: 5, borderWidth: 1, height: 50, backgroundColor: "#FFF", marginBottom: 30 }}>
                <Picker
                    style={styles.picker}
                    selectedValue={level}
                    onValueChange={(itemValue) =>
                        setLevel(itemValue)
                }>
                    <Picker.Item label="Random" value="random" />
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Hard" value="hard" />
                </Picker>
            </View>
            <Button
                title="Game On"
                onPress={() => goToGame(level, name)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8edeb",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        textAlign: "center",
        borderWidth: 1,
        width: 250,
        fontSize: 20,
        marginBottom: 15
    },
    picker: {
        width: 250,
    }
});