import { router } from 'expo-router';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const GREEN = '#32b600';
const DARK_GREEN = '#073f17';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  function sendRecovery() {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Confira seu e-mail', 'Digite um endereço de e-mail válido para continuar.');
      return;
    }
    router.push('/redefinir-senha');
  }

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Text style={styles.topTitle}>Esqueceu a senha?</Text>
      <Image source={require('../../assets/minhas-imagens/logo.png')} contentFit="contain" style={styles.logo} accessibilityLabel="Nowfood" />
      <Text style={styles.title}>Recupere o acesso</Text>
      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          accessibilityLabel="E-mail cadastrado"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="Digite seu e-mail cadastrado"
          placeholderTextColor="#454545"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Pressable accessibilityRole="button" style={styles.secondaryButton} onPress={sendRecovery}>
          <Text style={styles.secondaryText}>Enviar link de recuperação</Text>
        </Pressable>
      </View>
      <Text style={styles.orText}>ou recuperar com</Text>
      <Pressable style={styles.googleButton} onPress={() => Alert.alert('Nowfood', 'A recuperação pelo Google será configurada depois.')}>
        <Image source={require('../../assets/minhas-imagens/google-sem-fundo.png')} contentFit="contain" style={styles.googleIcon} />
        <Text style={styles.googleText}>Continuar com Google</Text>
      </Pressable>
      <View style={styles.warning}>
        <Text style={styles.warningIcon}>♙</Text>
        <Text style={styles.warningText}>Não se preocupe!{`\n`}tenha paciência vai dar certo!</Text>
      </View>
      <Text style={styles.footer}>Lembrou sua senha? <Text style={styles.link} onPress={() => router.replace('/login')}>Fazer login</Text></Text>
      <Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>Voltar</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fafaf1', alignItems: 'center', paddingHorizontal: 24, paddingTop: 42 },
  topTitle: { color: GREEN, fontWeight: '900', fontSize: 21, marginBottom: 2 },
  logo: { width: 240, height: 140 },
  title: { color: '#080808', fontWeight: '900', fontSize: 18, marginTop: 2, marginBottom: 38 },
  form: { width: '100%', gap: 10 },
  label: { color: '#111', fontSize: 13, fontWeight: '700', marginBottom: 2 },
  input: { height: 43, borderWidth: 1, borderColor: '#888', borderRadius: 5, backgroundColor: '#dedede', paddingHorizontal: 12, color: '#111', fontSize: 13 },
  secondaryButton: { height: 43, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#777', borderRadius: 5, backgroundColor: '#dedede' },
  secondaryText: { color: '#111', fontSize: 13, fontWeight: '700' },
  orText: { marginTop: 12, color: '#111', fontWeight: '700', fontSize: 12 },
  googleButton: { width: '72%', height: 42, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: 7, backgroundColor: GREEN },
  googleIcon: { width: 21, height: 21 },
  googleText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  warning: { width: '100%', minHeight: 76, marginTop: 28, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, backgroundColor: GREEN },
  warningIcon: { color: '#ffe000', fontSize: 21 },
  warningText: { color: '#fff', fontWeight: '800', fontSize: 12, textAlign: 'center' },
  footer: { marginTop: 18, color: '#111', fontSize: 11, fontWeight: '600' },
  link: { color: GREEN, fontWeight: '900' },
  backButton: { marginTop: 'auto', marginBottom: 16, padding: 10 },
  backText: { color: DARK_GREEN, fontWeight: '700' },
});
