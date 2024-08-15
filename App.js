import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Intro } from './Framework/Screens/Intro';

export default function App() {
  return (
    <View style={styles.container}>
      <Intro />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
