import { router } from 'expo-router';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PasswordSuccessScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Image source={require('../../assets/minhas-imagens/logo.png')} contentFit="contain" style={styles.logo} accessibilityLabel="Nowfood" />
      <View style={styles.checkCircle}><Text style={styles.check}>✓</Text></View>
      <Text style={styles.title}>Sua senha foi alterada com{`\n`}sucesso</Text>
      <View style={styles.note}><Text style={styles.noteText}>Obrigado por fazer parte da família{`\n`}nowfood!</Text></View>
      <Pressable accessibilityRole="button" style={styles.button} onPress={() => router.replace('/')}><Text style={styles.buttonText}>voltar ao início</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fafaf1', alignItems: 'center', paddingHorizontal: 28, paddingTop: 45 },
  logo: { width: 240, height: 140 },
  checkCircle: { width: 126, height: 126, marginTop: 30, borderWidth: 1, borderColor: '#111', borderRadius: 63, alignItems: 'center', justifyContent: 'center' },
  check: { color: '#050505', fontSize: 91, lineHeight: 100, fontWeight: '900', marginTop: -8 },
  title: { color: '#111', fontSize: 19, fontWeight: '900', textAlign: 'center', marginTop: 20 },
  note: { width: '100%', minHeight: 55, alignItems: 'center', justifyContent: 'center', marginTop: 58, borderWidth: 1, borderColor: '#888', borderRadius: 6, backgroundColor: '#fff' },
  noteText: { color: '#111', fontSize: 11, fontWeight: '700', textAlign: 'center' },
  button: { width: '100%', height: 43, alignItems: 'center', justifyContent: 'center', marginTop: 18, borderRadius: 8, backgroundColor: '#073f17' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
});
