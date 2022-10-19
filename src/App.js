import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Field from './components/Campo/Field';
import params from "./params"


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Iniciando o Mines!!!</Text>
      <Text>Tamano da grade:
        {params.getRowsAmount()}X{params.getColumnsAmount()}
      </Text>
      <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={3} />
      <Field opened nearMines={6} />
      <Field mined />
      <Field mined opened />
      <Field mined opened exploded />
      <Field flagged />
      <Field flagged opened />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
