import { router } from 'expo-router';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const GREEN = '#32b600';

export default function ResetPasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  function resetPassword() {
    if (newPassword.length < 8) {
      Alert.alert('Senha muito curta', 'Use pelo menos 8 caracteres para criar sua senha.');
      return;
    }
    router.replace('/senha-alterada');
  }

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" style={styles.back} onPress={() => router.back()}><Text style={styles.backIcon}>‹</Text></Pressable>
      <Image source={require('../../assets/minhas-imagens/logo.png')} contentFit="contain" style={styles.logo} accessibilityLabel="Nowfood" />
      <Text style={styles.title}>Defina uma nova senha</Text>
      <Text style={styles.subtitle}>Por segurança, sua nova senha deve ser{`\n`}diferente das anteriores.</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Senha atual</Text>
        <View style={styles.inputRow}><Text style={styles.lock}>♙</Text><TextInput accessibilityLabel="Senha atual" secureTextEntry placeholder="Digite sua senha atual" placeholderTextColor="#333" style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} /><Text style={styles.eye}>◉</Text></View>
        <Text style={styles.label}>Nova senha</Text>
        <View style={styles.inputRow}><Text style={styles.lock}>♙</Text><TextInput accessibilityLabel="Nova senha" secureTextEntry placeholder="Digite sua nova senha" placeholderTextColor="#333" style={styles.input} value={newPassword} onChangeText={setNewPassword} /><Text style={styles.eye}>◉</Text></View>
      </View>
      <Text style={styles.strength}>Força da senha: <Text style={styles.weak}>Fraca</Text></Text>
      <Text style={styles.hint}>Use pelo menos 8 caracteres com letras, números e símbolos</Text>
      <View style={styles.warning}><Text style={styles.warningText}>Não se preocupe!{`\n`}tenha paciência vai dar certo!</Text></View>
      <Pressable accessibilityRole="button" style={styles.submit} onPress={resetPassword}><Text style={styles.submitText}>Redefinir senha</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fafaf1', alignItems: 'center', paddingHorizontal: 22, paddingTop: 28 },
  back: { alignSelf: 'flex-start', width: 34, height: 30, justifyContent: 'center' },
  backIcon: { color: '#111', fontSize: 30, lineHeight: 30 },
  logo: { width: 240, height: 140, marginTop: 2 },
  title: { color: '#111', fontWeight: '900', fontSize: 18, marginTop: 5 },
  subtitle: { color: '#145321', fontWeight: '700', fontSize: 12, textAlign: 'center', marginTop: 7, marginBottom: 22 },
  form: { width: '100%', gap: 7 },
  label: { color: '#111', fontWeight: '800', fontSize: 12, marginTop: 2 },
  inputRow: { height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderRadius: 7, backgroundColor: '#dedede' },
  lock: { color: '#111', fontSize: 16, marginRight: 8 },
  input: { flex: 1, color: '#111', paddingVertical: 0, fontSize: 12 },
  eye: { color: '#111', fontSize: 17 },
  strength: { width: '100%', marginTop: 14, color: '#111', fontSize: 13, fontWeight: '800' },
  weak: { color: '#e21a1a' },
  hint: { width: '100%', color: '#111', fontSize: 12, fontWeight: '700', marginTop: 3 },
  warning: { width: '100%', minHeight: 76, alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 8, backgroundColor: '#e21a1a' },
  warningText: { color: '#fff', fontSize: 12, fontWeight: '800', textAlign: 'center' },
  submit: { width: '100%', height: 43, alignItems: 'center', justifyContent: 'center', marginTop: 13, borderRadius: 8, backgroundColor: GREEN },
  submitText: { color: '#fff', fontSize: 13, fontWeight: '800' },
});
