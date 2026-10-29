import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splash}>
        <StatusBar hidden />
        <Image source={require('../../assets/minhas-imagens/logo.png')} resizeMode="contain" style={styles.logo} accessibilityLabel="Nowfood" />
        <Text style={styles.tagline}>Sua comida favorita,{'\n'}mais perto de você!</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, alignItems: 'center', backgroundColor: '#fafaf1' },
  logo: { position: 'absolute', top: '11%', width: '108%', aspectRatio: 384 / 255 },
  tagline: { position: 'absolute', top: '51%', color: '#111111', textAlign: 'center', fontSize: 14, lineHeight: 17, fontWeight: '700' },
});
