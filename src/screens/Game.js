import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Dimensions, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardAsync } from '../store/actions/Board'
import { StackActions } from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';

const windowWidth = Dimensions.get("window").width;

export default function Game({ navigation, route }) {
  const [inputBoard, setInputBoard] = useState([]);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch()
  const { level, name } = route.params;

  useEffect(() => {
    dispatch(fetchBoardAsync(level))
  }, []);

  const board = useSelector(state => state.boards.data)

  useEffect(() => {
    setInputBoard(board);
  }, [board]);

  //helper from sugoku api (for fetching solution and validate answer)...(1)
  const encodeBoard = (board) =>
    board.reduce((result, row, i) =>
      result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
//helper from sugoku api (for fetching solution and validate answer)...(2)
  const encodeParams = (params) =>
    Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

  const handleUpdate = (value, iRow, iCol) => {
    const newBoard = JSON.parse(JSON.stringify(inputBoard));
    newBoard[iRow][iCol] = value;
    setInputBoard(newBoard);
  };

  const validate = () => {
    const data = { board: inputBoard };
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.status == 'solved'){
          navigation.dispatch(
            StackActions.replace('Finish', {
              name
            })
          )
        } else {
          alert('the game is unsolved')
        }
      })
      .catch(console.warn);
  }

  const solve = () => {
    const data = { board };
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((response) => {
        setInputBoard(response.solution);
        setStatus('solved')
      })
      .catch(console.warn);
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.titleText}
      >Welcome {name}{"\n"}</Text>
      <Text
        style={{fontSize:20, color: '#006d77'}}
      >Difficulty: {level}{"\n"}</Text>
      <CountDown
        until={60 * 10}
        size={20}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
      {
      inputBoard.map((row, iRow) => {
        return (
          <View style={styles.row} key={iRow}>
            {row.map((col, iCol) => {
              return (
                <TextInput
                  keyboardType={"numeric"}
                  maxLength={1}
                  editable={board[iRow][iCol] === 0 ? true : false}
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
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View>
          <Button title="solve" onPress={() => solve()} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Button title="validate" onPress={() => validate()} />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
          <Text style={{ color: "blue", fontSize: 27 }}>
            {status}
          </Text>
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
