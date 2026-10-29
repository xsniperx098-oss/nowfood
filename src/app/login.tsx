import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AppBottomNav } from '../components/app-bottom-nav';

const GREEN = '#32b600';
const DARK_GREEN = '#073f17';
const DEMO_EMAIL = 'teste@gmail.com';
const DEMO_PASSWORD = '123';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const showUnavailableMessage = (service: string) =>
    Alert.alert('Nowfood', `O login com ${service} será configurado depois.`);

  const handleLogin = () => {
    const validEmail = email.trim().toLowerCase() === DEMO_EMAIL;
    const validPassword = password === DEMO_PASSWORD;

    if (validEmail && validPassword) {
      router.replace('/perfil');
      return;
    }

    Alert.alert('Não foi possível entrar', 'Confira o e-mail e a senha.');
  };

  return (
    <View style={styles.screen}>
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <StatusBar hidden />

      <Image
        source={require('../../assets/minhas-imagens/logo.png')}
        contentFit="contain"
        style={styles.logo}
        accessibilityLabel="Nowfood"
      />

      <Text style={styles.title}>Bem-vindo ao nowfood!{`\n`}faça login para continuar</Text>

      <View style={styles.form}>
        <View style={[styles.inputBox, styles.emailBox]}>
          <Text style={styles.inputIcon}>✉</Text>
          <TextInput
            accessibilityLabel="E-mail"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="E-mail:"
            placeholderTextColor="#ffffff"
            returnKeyType="next"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputIcon}>▣</Text>
          <TextInput
            accessibilityLabel="Senha"
            autoComplete="password"
            placeholder="Senha:"
            placeholderTextColor="#ffffff"
            returnKeyType="done"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            hitSlop={10}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '◎' : '◉'}</Text>
          </Pressable>
        </View>

        <View style={styles.optionsRow}>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: rememberMe }}
            style={styles.rememberButton}
            onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.optionText}>Lembrar de mim</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/recuperar-senha')}>
            <Text style={styles.optionText}>Esqueceu sua senha?</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          style={styles.loginButton}
          onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </Pressable>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou continue com</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtons}>
        <SocialButton icon={require('../../assets/minhas-imagens/google-sem-fundo.png')} label="Entrar com Google" onPress={() => showUnavailableMessage('Google')} />
        <SocialButton icon={require('../../assets/minhas-imagens/facebook.png')} label="Entrar com Facebook" onPress={() => showUnavailableMessage('Facebook')} />
        <SocialButton icon={require('../../assets/minhas-imagens/maça.png')} label="Entrar com Apple" onPress={() => showUnavailableMessage('Apple')} />
      </View>

      <View style={styles.signupDivider} />
      <Text style={styles.signupPrompt}>Ainda não tem uma conta?</Text>
      <Pressable
        accessibilityRole="button"
        style={styles.signupButton}
        onPress={() => router.push('/cadastro')}>
        <Text style={styles.signupButtonText}>Criar conta</Text>
      </Pressable>
    </ScrollView>
    <AppBottomNav />
    </View>
  );
}

type SocialButtonProps = {
  icon: number;
  label: string;
  onPress: () => void;
};

function SocialButton({ icon, label, onPress }: SocialButtonProps) {
  return (
    <Pressable accessibilityRole="button" style={styles.socialButton} onPress={onPress}>
      <Image source={icon} contentFit="contain" style={styles.socialIcon} />
      <Text style={styles.socialButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fafaf1',
  },
  scroll: { flex: 1 },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 38,
    paddingBottom: 18,
  },
  logo: {
    width: 240,
    height: 140,
  },
  title: {
    marginTop: 26,
    color: '#080808',
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: 34,
    gap: 8,
  },
  inputBox: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: GREEN,
  },
  emailBox: {
    borderWidth: 2,
    borderColor: GREEN,
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 22,
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  eyeIcon: {
    paddingLeft: 8,
    color: '#ffffff',
    fontSize: 16,
  },
  optionsRow: {
    minHeight: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  rememberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkbox: {
    width: 13,
    height: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: DARK_GREEN,
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: DARK_GREEN,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 10,
    lineHeight: 12,
  },
  optionText: {
    color: '#141414',
    fontSize: 10,
  },
  loginButton: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: DARK_GREEN,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
    marginBottom: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#bdbdb3',
  },
  dividerText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '600',
  },
  socialButtons: {
    width: '100%',
    gap: 8,
  },
  socialButton: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: '#ffffff',
  },
  socialIcon: {
    position: 'absolute',
    left: 26,
    width: 24,
    height: 24,
  },
  socialButtonText: {
    color: '#101010',
    fontSize: 12,
    fontWeight: '600',
  },
  signupDivider: {
    width: '100%',
    height: 1,
    marginTop: 22,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  signupPrompt: {
    marginBottom: 10,
    color: '#d4d4cb',
    fontSize: 10,
  },
  signupButton: {
    width: '100%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: DARK_GREEN,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
