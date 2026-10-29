import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const GREEN = '#80c51b';
const DARK_GREEN = '#195600';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Faltam dados', 'Digite seu e-mail e sua senha para continuar.');
      return;
    }
    Alert.alert('Nowfood', 'O cadastro será conectado em breve.');
  };

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Criar uma conta</Text>
        <Image source={require('../../assets/minhas-imagens/logo.png')} contentFit="contain" style={styles.logo} accessibilityLabel="Nowfood" />
        <Text style={styles.intro}>Bem vindo ao Nowfood!{'\n'}vamos criar sua conta?</Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            accessibilityLabel="E-mail"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="Digite seu e-mail"
            placeholderTextColor="#111"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={[styles.label, styles.passwordLabel]}>Senha:</Text>
          <TextInput
            accessibilityLabel="Senha"
            autoComplete="new-password"
            placeholder="Digite sua senha"
            placeholderTextColor="#111"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Text style={styles.or}>ou</Text>
        <Pressable style={styles.googleButton} onPress={() => Alert.alert('Nowfood', 'O cadastro com Google será configurado depois.')}>
          <Image source={require('../../assets/minhas-imagens/google-sem-fundo.png')} contentFit="contain" style={styles.googleIcon} />
          <Text style={styles.googleText}>Vincular com o Google</Text>
        </Pressable>

        <View style={styles.messageBox}>
          <Text style={styles.message}>A pressa é inimiga da perfeição!{ '\n' }tenha paciencia tudo vai dar certo!</Text>
        </View>
        <Pressable accessibilityRole="button" style={styles.createButton} onPress={createAccount}>
          <Text style={styles.createButtonText}>Criar conta</Text>
        </Pressable>
        <Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>Voltar para o login</Text></Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fafaf1' },
  content: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 16, paddingTop: 30, paddingBottom: 20 },
  heading: { color: GREEN, fontSize: 25, lineHeight: 31, fontWeight: '900', marginBottom: 8 },
  logo: { width: 180, height: 118 },
  intro: { color: '#111', fontSize: 17, lineHeight: 22, fontWeight: '800', textAlign: 'center', marginTop: 6 },
  form: { width: '100%', marginTop: 28 },
  label: { color: '#111', fontSize: 13, fontWeight: '800', marginLeft: 10, marginBottom: 6 },
  input: { height: 44, borderWidth: 1, borderColor: '#777', borderRadius: 8, backgroundColor: '#d7d7d7', paddingHorizontal: 12, textAlign: 'center', color: '#111', fontSize: 13, fontWeight: '700', paddingVertical: 0 },
  passwordLabel: { marginTop: 14 },
  or: { color: '#111', fontSize: 14, fontWeight: '700', marginTop: 9, marginBottom: 10 },
  googleButton: { width: 205, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#555', borderRadius: 8, backgroundColor: 'transparent' },
  googleIcon: { width: 20, height: 20, position: 'absolute', left: 14 },
  googleText: { color: '#111', fontSize: 12, fontWeight: '800' },
  messageBox: { width: '94%', minHeight: 76, backgroundColor: DARK_GREEN, borderRadius: 8, marginTop: 30, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 10 },
  message: { color: '#fff', fontSize: 12, fontWeight: '800', lineHeight: 19, textAlign: 'center' },
  createButton: { width: '94%', height: 44, backgroundColor: GREEN, borderRadius: 8, marginTop: 14, alignItems: 'center', justifyContent: 'center' },
  createButtonText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  backButton: { padding: 10, marginTop: 5 },
  backText: { color: DARK_GREEN, fontSize: 12, fontWeight: '700' },
});
