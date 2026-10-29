import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBottomNav } from '../components/app-bottom-nav';

const entries = [
  { icon: { ios: 'bell', android: 'notifications', web: 'notifications' }, title: 'Notificações', section: 'notificacoes' },
  { icon: { ios: 'bag', android: 'shopping_bag', web: 'shopping_bag' }, title: 'Pedidos Finalizados', section: 'pedidos-finalizados' },
  { icon: { ios: 'target', android: 'redeem', web: 'redeem' }, title: 'Recompensas e Benefícios', section: 'recompensas' },
  { icon: { ios: 'star.bubble', android: 'rate_review', web: 'rate_review' }, title: 'Avaliações e contribuições', section: 'avaliacoes' },
] as const;

function openSection(section: string) {
  router.push({ pathname: '/perfil/[secao]', params: { secao: section } });
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&auto=format&q=85' }} style={styles.avatar} />
          <Text style={styles.userName}>Gabriel</Text>
          <Pressable accessibilityLabel="Configurações" style={styles.settings} onPress={() => Alert.alert('Configurações', 'Essa tela será adicionada depois.')}><SymbolView name={{ ios: 'gearshape', android: 'settings', web: 'settings' }} size={22} tintColor="#111" /></Pressable>
        </View>

        <View style={styles.menu}>
          {entries.map((entry) => <Pressable key={entry.title} style={styles.menuRow} onPress={() => openSection(entry.section)}><SymbolView name={entry.icon} size={23} tintColor="#111" style={styles.menuIcon} /><Text style={styles.menuTitle}>{entry.title}</Text></Pressable>)}
          <Pressable style={[styles.menuRow, styles.accountRow]} onPress={() => openSection('conta')}>
            <SymbolView name={{ ios: 'person.fill', android: 'person', web: 'person' }} size={23} tintColor="#111" style={styles.menuIcon} />
            <View><Text style={styles.menuTitle}>Conta</Text><Text style={styles.menuSubtitle}>Endereços, código de entrega e etc</Text></View>
          </Pressable>
        </View>

        <View style={styles.spacer} />
        <Pressable style={styles.utilityCard} onPress={() => openSection('silenciar-notificacoes')}>
          <SymbolView name={{ ios: 'bell.slash', android: 'notifications_off', web: 'notifications_off' }} size={22} tintColor="#111" /><View style={styles.utilityCopy}><Text style={styles.utilityTitle}>Silenciar notificações</Text><Text style={styles.utilitySubtitle}>Gerencie horários em que não deseja receber avisos.</Text></View>
        </Pressable>
        <Pressable style={styles.utilityCard} onPress={() => openSection('ajuda')}>
          <SymbolView name={{ ios: 'questionmark.circle.fill', android: 'help', web: 'help' }} size={23} tintColor="#111" /><View style={styles.utilityCopy}><Text style={styles.utilityTitle}>Ajuda</Text><Text style={styles.utilitySubtitle}>Fale com a gente caso tenha qualquer dúvida.</Text></View>
        </Pressable>
      </ScrollView>
      <AppBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fafaf1' },
  content: { flexGrow: 1, paddingHorizontal: 12, paddingTop: 22, paddingBottom: 8 },
  header: { height: 58, flexDirection: 'row', alignItems: 'center', gap: 11 },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#ddd' },
  userName: { color: '#111', fontSize: 15, fontWeight: '900' },
  settings: { marginLeft: 'auto', width: 38, height: 42, alignItems: 'center', justifyContent: 'center' },
  menu: { marginTop: 20, borderWidth: 1, borderColor: '#777', borderRadius: 9, overflow: 'hidden', backgroundColor: '#fff' },
  menuRow: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 13, borderBottomWidth: 1, borderColor: '#111' },
  menuIcon: { width: 25, height: 25 },
  menuTitle: { color: '#111', fontSize: 14, fontWeight: '800' },
  accountRow: { minHeight: 64, borderBottomWidth: 0 },
  menuSubtitle: { marginTop: 4, color: '#999', fontSize: 11, fontWeight: '600' },
  spacer: { flex: 1, minHeight: 52 },
  utilityCard: { minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: 11, borderWidth: 1, borderColor: '#777', borderRadius: 9, backgroundColor: '#fff', paddingHorizontal: 12, marginBottom: 7 },
  utilityCopy: { flex: 1 },
  utilityTitle: { color: '#111', fontSize: 12, fontWeight: '800' },
  utilitySubtitle: { color: '#555', fontSize: 9, marginTop: 2 },
});
