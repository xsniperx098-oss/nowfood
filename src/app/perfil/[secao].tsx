import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBottomNav } from '../../components/app-bottom-nav';

const green = '#16833B';
const sections = {
  notificacoes: { title: 'Notificações', description: 'Acompanhe as novidades dos seus pedidos.' },
  'pedidos-finalizados': { title: 'Pedidos Finalizados', description: 'Confira o histórico dos seus pedidos.' },
  recompensas: { title: 'Recompensas e Benefícios', description: 'Vantagens especiais para você.' },
  avaliacoes: { title: 'Avaliações e contribuições', description: 'Sua opinião ajuda outras pessoas.' },
  conta: { title: 'Conta', description: 'Gerencie seus dados e endereços.' },
  'silenciar-notificacoes': { title: 'Silenciar notificações', description: 'Escolha quando deseja receber avisos.' },
  ajuda: { title: 'Ajuda', description: 'Estamos aqui para ajudar.' },
};
type SectionKey = keyof typeof sections;

function InfoCard({ title, detail, icon }: { title: string; detail: string; icon: string }) {
  return <View style={styles.infoCard}><View style={styles.infoIcon}><Text style={styles.iconGlyph}>{icon}</Text></View><View style={styles.infoCopy}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.cardDetail}>{detail}</Text></View><Text style={styles.chevron}>›</Text></View>;
}

function ToggleRow({ title, detail, value, onChange }: { title: string; detail?: string; value: boolean; onChange: (value: boolean) => void }) {
  return <View style={styles.toggleRow}><View style={styles.infoCopy}><Text style={styles.cardTitle}>{title}</Text>{!!detail && <Text style={styles.cardDetail}>{detail}</Text>}</View><Switch value={value} onValueChange={onChange} trackColor={{ false: '#d7ddd7', true: '#9acb9f' }} thumbColor={value ? green : '#f7f7f7'} /></View>;
}

export default function ProfileSectionScreen() {
  const { secao } = useLocalSearchParams<{ secao: string }>();
  const key = (typeof secao === 'string' && secao in sections ? secao : 'ajuda') as SectionKey;
  const section = sections[key];
  const [pushOn, setPushOn] = useState(true);
  const [emailOn, setEmailOn] = useState(false);
  const [quietOn, setQuietOn] = useState(false);

  return <SafeAreaView style={styles.screen} edges={['top']}>
    <StatusBar hidden />
    <View style={styles.header}><Pressable accessibilityLabel="Voltar" onPress={() => router.back()} style={styles.back}><Text style={styles.backGlyph}>‹</Text></Pressable><View style={styles.headingCopy}><Text style={styles.heading}>{section.title}</Text><Text style={styles.description}>{section.description}</Text></View></View>
    <ScrollView contentContainerStyle={styles.content}>
      {key === 'notificacoes' && <>
        <Text style={styles.sectionLabel}>Recentes</Text>
        <InfoCard icon="✓" title="Pedido entregue" detail="Seu pedido foi entregue. Esperamos que aproveite! · Hoje" />
        <InfoCard icon="●" title="Oferta para você" detail="Confira as novidades e ofertas dos restaurantes. · Ontem" />
        <Text style={styles.sectionLabel}>Preferências</Text>
        <ToggleRow title="Notificações no aplicativo" detail="Atualizações sobre seus pedidos" value={pushOn} onChange={setPushOn} />
        <ToggleRow title="Ofertas por e-mail" value={emailOn} onChange={setEmailOn} />
      </>}

      {key === 'pedidos-finalizados' && <>
        <Text style={styles.sectionLabel}>Pedidos anteriores</Text>
        <View style={styles.orderCard}><View style={styles.orderTop}><Text style={styles.cardTitle}>Gourmet Lanches</Text><Text style={styles.status}>Entregue</Text></View><Text style={styles.cardDetail}>X-Bacon, batata frita e refrigerante</Text><Text style={styles.orderMeta}>Hoje · 12:35　　R$ 42,00</Text><Pressable style={styles.outlineButton} onPress={() => router.push('/restaurante')}><Text style={styles.outlineText}>Pedir novamente</Text></Pressable></View>
        <View style={styles.orderCard}><View style={styles.orderTop}><Text style={styles.cardTitle}>Pizzaria Top</Text><Text style={styles.status}>Entregue</Text></View><Text style={styles.cardDetail}>Pizza de calabresa média</Text><Text style={styles.orderMeta}>Ontem · 20:10　　R$ 40,00</Text><Pressable style={styles.outlineButton} onPress={() => router.push('/restaurante')}><Text style={styles.outlineText}>Pedir novamente</Text></Pressable></View>
      </>}

      {key === 'recompensas' && <>
        <View style={styles.pointsCard}><SymbolView name={{ ios: 'star.circle.fill', android: 'stars', web: 'stars' }} size={34} tintColor="#fff" /><Text style={styles.pointsNumber}>120 pontos</Text><Text style={styles.pointsHint}>Continue pedindo para ganhar benefícios.</Text></View>
        <Text style={styles.sectionLabel}>Disponíveis para você</Text>
        <InfoCard icon="%" title="10% de desconto" detail="Em pedidos acima de R$ 40,00 · válido até 30/11" />
        <InfoCard icon="↗" title="Entrega grátis" detail="Use em qualquer restaurante participante." />
      </>}

      {key === 'avaliacoes' && <>
        <Text style={styles.sectionLabel}>Suas avaliações</Text>
        <InfoCard icon="★" title="Gourmet Lanches" detail="★★★★★　O lanche chegou quentinho e estava ótimo." />
        <InfoCard icon="★" title="Sushi Expresso" detail="★★★★☆　Muito bom e chegou dentro do prazo." />
        <Pressable style={styles.primaryButton} onPress={() => Alert.alert('Avaliações', 'Seus pedidos recentes aparecerão aqui para avaliar.')}><Text style={styles.primaryText}>Avaliar um pedido</Text></Pressable>
      </>}

      {key === 'conta' && <>
        <Text style={styles.sectionLabel}>Dados pessoais</Text>
        <InfoCard icon="●" title="Gabriel" detail="Nome do perfil" />
        <InfoCard icon="@" title="teste@gmail.com" detail="E-mail cadastrado" />
        <Text style={styles.sectionLabel}>Entrega e pagamento</Text>
        <InfoCard icon="⌖" title="Meus endereços" detail="Adicione ou edite seus endereços de entrega." />
        <InfoCard icon="▤" title="Formas de pagamento" detail="Gerencie suas opções de pagamento." />
      </>}

      {key === 'silenciar-notificacoes' && <>
        <View style={styles.quietCard}><SymbolView name={{ ios: 'bell.slash.fill', android: 'notifications_off', web: 'notifications_off' }} size={30} tintColor={green} /><Text style={styles.quietTitle}>Modo silencioso</Text><Text style={styles.cardDetail}>As mensagens importantes sobre pedidos ainda serão exibidas.</Text></View>
        <ToggleRow title="Silenciar notificações" detail="Ative para pausar avisos promocionais." value={quietOn} onChange={setQuietOn} />
        <Text style={styles.sectionLabel}>Horário silencioso</Text>
        <InfoCard icon="◷" title="22:00 – 08:00" detail="Toque para ajustar o horário." />
      </>}

      {key === 'ajuda' && <>
        <InfoCard icon="?" title="Onde está meu pedido?" detail="Acompanhe o andamento na tela Pedidos." />
        <InfoCard icon="↻" title="Preciso de ajuda com um pedido" detail="Veja opções para pedidos em andamento." />
        <InfoCard icon="₢" title="Pagamento e reembolso" detail="Saiba mais sobre cobranças e reembolsos." />
        <Pressable style={styles.primaryButton} onPress={() => Alert.alert('Fale com a gente', 'Nosso atendimento está disponível em breve.')}><Text style={styles.primaryText}>Fale com a gente</Text></Pressable>
      </>}

    </ScrollView>
    <AppBottomNav />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fafaf1' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingTop: 18, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#e7e8e0', backgroundColor: '#fff' },
  back: { width: 36, height: 42, justifyContent: 'center' },
  backGlyph: { color: '#111', fontSize: 32, lineHeight: 36 },
  headingCopy: { flex: 1 },
  heading: { color: '#171b18', fontWeight: '900', fontSize: 19 },
  description: { color: '#707a72', fontSize: 12, marginTop: 3 },
  content: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 20, gap: 10 },
  sectionLabel: { color: '#202820', fontSize: 15, fontWeight: '900', marginTop: 9, marginBottom: 2 },
  infoCard: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e8e3', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  infoIcon: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#edf7ed' },
  iconGlyph: { color: green, fontWeight: '800', fontSize: 17 },
  infoCopy: { flex: 1 },
  cardTitle: { color: '#19201b', fontWeight: '800', fontSize: 14 },
  cardDetail: { color: '#737d76', fontSize: 11, lineHeight: 16, marginTop: 3 },
  chevron: { color: '#8a938d', fontSize: 24 },
  toggleRow: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e8e3', borderRadius: 12, paddingHorizontal: 13, paddingVertical: 8 },
  orderCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e8e3', borderRadius: 12, padding: 14, marginBottom: 3 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  status: { color: green, fontSize: 11, fontWeight: '800' },
  orderMeta: { color: '#737d76', fontSize: 11, marginTop: 8 },
  outlineButton: { height: 38, borderWidth: 1, borderColor: green, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  outlineText: { color: green, fontWeight: '800', fontSize: 12 },
  pointsCard: { backgroundColor: green, borderRadius: 16, padding: 20, alignItems: 'center', gap: 7, marginBottom: 7 },
  pointsNumber: { color: '#fff', fontWeight: '900', fontSize: 24 },
  pointsHint: { color: '#eff8ec', fontSize: 12 },
  primaryButton: { height: 46, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: green, marginTop: 5 },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  quietCard: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e4e8e3', alignItems: 'center', padding: 18, gap: 7 },
  quietTitle: { color: '#19201b', fontWeight: '900', fontSize: 17 },
});
