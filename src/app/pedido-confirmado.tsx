import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppBottomNav } from '../components/app-bottom-nav';
import { getLastOrder } from '../data/cart-store';

const green = '#16833B';
const money = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

export default function OrderConfirmedScreen() {
  const items = useMemo(() => getLastOrder(), []);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderNumber = `NF${Date.now().toString().slice(-6)}`;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successIcon}><Text style={styles.check}>✓</Text></View>
        <Text style={styles.title}>Pedido confirmado!</Text>
        <Text style={styles.subtitle}>Seu pedido já foi enviado ao restaurante.</Text>
        <View style={styles.estimate}><Text style={styles.estimateLabel}>Previsão de entrega</Text><Text style={styles.estimateTime}>30–45 min</Text></View>
        <Text style={styles.orderNumber}>Pedido {orderNumber}</Text>
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Resumo do pedido</Text>
          {items.map((item) => <View key={item.id} style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}><Text style={styles.itemName}>{item.quantity}× {item.name}</Text><Text style={styles.itemDetail} numberOfLines={2}>{item.details}</Text></View>
            <Text style={styles.itemPrice}>{money(item.price * item.quantity)}</Text>
          </View>)}
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total pago</Text><Text style={styles.total}>{money(subtotal + 5)}</Text></View>
        </View>
        <TouchableOpacity style={styles.trackButton} onPress={() => router.replace('/')}><Text style={styles.trackText}>Voltar para o início</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ordersButton} onPress={() => router.replace('/pedidos')}><Text style={styles.ordersText}>Ver meus pedidos</Text></TouchableOpacity>
      </ScrollView>
      <AppBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAFAF5' },
  content: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 18, paddingTop: 26, paddingBottom: 16 },
  successIcon: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#e5f4e7', alignItems: 'center', justifyContent: 'center' },
  check: { color: green, fontSize: 38, lineHeight: 44, fontWeight: '800' },
  title: { marginTop: 15, fontSize: 23, color: '#172019', fontWeight: '900', textAlign: 'center' },
  subtitle: { marginTop: 5, color: '#727c74', fontSize: 13, textAlign: 'center' },
  estimate: { width: '100%', marginTop: 20, backgroundColor: '#fff', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#e4e9e4' },
  estimateLabel: { color: '#68736a', fontSize: 12 },
  estimateTime: { color: green, fontSize: 19, fontWeight: '900', marginTop: 4 },
  orderNumber: { alignSelf: 'flex-start', color: '#768078', fontSize: 11, marginTop: 14 },
  summary: { width: '100%', marginTop: 8, backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#e4e9e4' },
  sectionTitle: { color: '#172019', fontWeight: '800', fontSize: 15, marginBottom: 8 },
  itemRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 9, borderTopWidth: 1, borderColor: '#edf0ed', paddingVertical: 7 },
  itemImage: { width: 42, height: 42, borderRadius: 8, backgroundColor: '#eee' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 12, color: '#202820', fontWeight: '800' },
  itemDetail: { fontSize: 10, color: '#788279', marginTop: 2 },
  itemPrice: { color: '#263229', fontSize: 11, fontWeight: '700' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#edf0ed', paddingTop: 11, marginTop: 4 },
  totalLabel: { fontSize: 14, color: '#172019', fontWeight: '800' },
  total: { fontSize: 15, color: green, fontWeight: '900' },
  trackButton: { width: '100%', height: 46, borderRadius: 11, backgroundColor: green, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  trackText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  ordersButton: { padding: 12, marginTop: 2 },
  ordersText: { color: green, fontSize: 13, fontWeight: '800' },
});
