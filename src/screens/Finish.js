import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { CommonActions } from '@react-navigation/native';

export default function Finish({ navigation, route}) {

    const { name, level } = route.params

    const backHome = () => {
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'Home',
                  params: { name: '', level: '' },
                },
              ],
            })
          );
    }

    return (
        <View style={styles.container}>
            <Image
            style={{ width: 250, height: 150, marginBottom: 50 }}
            source={{
                uri: 'https://i.imgur.com/y1RDwyG.png'
            }}
            />
            <Text style={styles.finish}>Great Job {name}!</Text>
            <View style={{marginTop: 30}}>
                <Button
                    title='Go Back Home'
                    color= '#f28482'
                    onPress={() => backHome()}
                />
                 
            </View>
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
    finish: {
        textAlign: "center",
        width: 250,
        fontSize: 25,
    }
});