import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Input Your Name{"\n"}</Text>
            <TextInput 
            style={styles.input}
            ></TextInput>
            <Text>Pick Level{"\n"}</Text>
            <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
            ]}
        />
            <Button
                title="Game"
                onPress={() => navigation.navigate('Game')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        borderWidth: 1,
        width: 150,
        fontSize: 20,
        marginBottom: 15
    }
  });