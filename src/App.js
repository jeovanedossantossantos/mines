import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Field from './components/Campo/Field';
import Header from './components/Header/Header';
import MineField from './components/MineField/MineField';
import { cloneBoard, createMinedBoard, flagsUsed, hadExplosion, invertFlag, openField, showMines, wonGame } from './functions';
import params from "./params"
import LevelSelection from './screens/LevelSelection/LevelSelection';


export default function App() {

  const [state, setState] = useState({ board: [], won: false, lost: false })


  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  const onOpenField = (row, column) => {
    const board = cloneBoard(state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Não desista, tente outra vez!')
    }
    if (won) {
      Alert.alert('Aeeeeeeeeee, parabéns!', 'Sabia que você ia ganhar!')
    }

    setState({ ...state, board: board, lost: lost, won: won })
  }

  const onSelectField = (row, column) => {
    const board = cloneBoard(state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Aeeeeeeeeee, parabéns!', 'Sabia que você ia ganhar!')
    }

    setState({ ...state, board: board, won: won })
  }

  const onLevelSelected = (level) => {
    params.difficultLevel = level
    setState(createState())
  }

  useEffect(() => {
    setState(createState())
  }, [])

  return (
    <View style={styles.container}>
      <LevelSelection isVisible={state.showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setState({ ...state, showLevelSelection: false })} />
      <Header
        flagsLeft={minesAmount() - flagsUsed(state.board)}
        onNewGame={() => setState(createState())}
        onFlagPress={() => setState({ ...state, showLevelSelection: true })}
      />

      <View style={styles.board1}>

        <MineField
          board={state.board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board1: {
    alignItems: 'center',
    backgroundColor: "#AAA"
  }
});
