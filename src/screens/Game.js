import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Dimensions, Text, Button } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Game({name, level}) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://sugoku.herokuapp.com/board?difficulty=easy'
    })
      .then(({data}) => {
        setBoard(data.board)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const handleUpdate = (value, iRow, iCol) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[iRow][iCol] = value;
    setBoard(newBoard);
  };

  const validate = () => {
    axios({
      method: 'POST',
      url: 'https://sugoku.herokuapp.com/validate',
      data: {
        board
      }
    })
      .then(({data}) => {
        if(data){
          alert(data.status)
        } else{
          throw new Error()
        }
      })
      .catch((err) => {
        alert('failed')
      })
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.titleText}
      >Welcome to Sugoku {name}{"\n"}</Text>
      {
      board.map((row, iRow) => {
        return (
          <View style={styles.row} key={iRow}>
            {row.map((col, iCol) => {
              return (
                <TextInput
                  maxLength={1}
                  key={iCol}
                  textAlign="center"
                  style={styles.col}
                  value={col === 0 ? "" : String(col)}
                  onChangeText={(value) => handleUpdate(value, iRow, iCol)}
                />
              );
            })}
          </View>
        )        
      })      
      }
      <Text>{"\n"}</Text>
      <View style={{flex: 2}}>
        <Button
            title="Validate"
            onPress={() => validate()}
        ></Button>
        <Button
            title="Solve"
            onPress={() => alert('solving')}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8edeb",
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  },
  col: {
    borderWidth: 1,
    width: (windowWidth - 20) / 9,
    height: (windowWidth - 20) / 9,
    fontSize: 20
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
