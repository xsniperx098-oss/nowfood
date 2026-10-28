import { router } from 'expo-router';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <View style={styles.brand}>
        <Image source={require('../../assets/minhas-imagens/logo.png')} contentFit="contain" style={styles.logo} accessibilityLabel="Nowfood" />
      </View>
      <Text style={styles.tagline}>Sua comida favorita,{`\n`}mais perto de você!</Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={() => router.replace('/login')}>
        <Text style={styles.buttonText}>Começar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, backgroundColor: '#fafaf1' },
  brand: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 245, height: 140 },
  tagline: { color: '#111', textAlign: 'center', fontSize: 18, lineHeight: 23, fontWeight: '800', marginBottom: 34 },
  button: { width: '100%', height: 46, marginBottom: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 9, backgroundColor: '#073f17' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
});
