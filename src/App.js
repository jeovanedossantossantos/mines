import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Field from './components/Campo/Field';
import MineField from './components/MineField/MineField';
import { createMinedBoard } from './functions';
import params from "./params"
import LevelSelection from './screens/LevelSelection/LevelSelection';


export default function App() {

  const [state, setState] = useState({ board: [] })


  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return {
      board: createMinedBoard(rows, cols, minesAmount())
    }
  }

  useEffect(() => {
    setState(createState())
  }, [])

  return (
    <View style={styles.container}>
      <Text>Iniciando o Mines!!!</Text>
      <Text>Tamano da grade:
        {params.getRowsAmount()}X{params.getColumnsAmount()}
      </Text>
      <View style={styles.board}>

        <MineField board={state.board} />

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
