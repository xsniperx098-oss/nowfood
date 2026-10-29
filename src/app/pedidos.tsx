import { useSyncExternalStore } from 'react';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBottomNav } from '../components/app-bottom-nav';
import { changeCartQuantity, confirmCart, getCartItems, removeCartItem, subscribeCart } from '../data/cart-store';

const green = '#16833B';
const money = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

export default function OrdersScreen() {
  const items = useSyncExternalStore(subscribeCart, getCartItems, getCartItems);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Text style={styles.title}>Meus pedidos</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {items.map((item) => (
          <View style={styles.row} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.detail}>
              <Text style={styles.name}>{item.name}</Text>
              {!!item.details && <Text style={styles.muted} numberOfLines={2}>{item.details}</Text>}
              <Text style={styles.price}>{money(item.price)}</Text>
            </View>
            <View style={styles.qty}>
              <TouchableOpacity accessibilityLabel={`Remover uma unidade de ${item.name}`} onPress={() => changeCartQuantity(item.id, -1)}><Text style={styles.qtyAction}>−</Text></TouchableOpacity>
              <Text style={styles.qtyNumber}>{item.quantity}</Text>
              <TouchableOpacity accessibilityLabel={`Adicionar uma unidade de ${item.name}`} onPress={() => changeCartQuantity(item.id, 1)}><Text style={styles.qtyAction}>+</Text></TouchableOpacity>
            </View>
            <TouchableOpacity accessibilityLabel={`Remover ${item.name}`} onPress={() => removeCartItem(item.id)}><Text style={styles.trash}>×</Text></TouchableOpacity>
          </View>
        ))}

        {!items.length && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Seu pedido está vazio</Text>
            <Text style={styles.muted}>Adicione algo gostoso para começar.</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => router.push('/explorar')}><Text style={styles.exploreText}>Explorar restaurantes</Text></TouchableOpacity>
          </View>
        )}

        {!!items.length && (
          <View style={styles.summary}>
            <View style={styles.summaryRow}><Text style={styles.muted}>Subtotal</Text><Text style={styles.muted}>{money(subtotal)}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.muted}>Taxa de entrega</Text><Text style={styles.muted}>R$ 5,00</Text></View>
            <View style={styles.summaryRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.total}>{money(subtotal + 5)}</Text></View>
            <TouchableOpacity style={styles.checkout} onPress={() => { confirmCart(); router.replace('/pedido-confirmado'); }}><Text style={styles.checkoutText}>Finalizar pedido　›</Text></TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <AppBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAFAF5' },
  title: { fontSize: 22, fontWeight: '800', color: '#171b18', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 12 },
  content: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#e8ece8' },
  image: { width: 62, height: 62, borderRadius: 10, backgroundColor: '#eee' },
  detail: { flex: 1 },
  name: { fontSize: 13, fontWeight: '800', color: '#171b18' },
  muted: { fontSize: 11, color: '#748078', marginTop: 4 },
  price: { color: green, fontWeight: '800', fontSize: 12, marginTop: 4 },
  qty: { height: 30, flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1, borderColor: '#e2e7e2', borderRadius: 16, paddingHorizontal: 7 },
  qtyAction: { fontSize: 18, color: green },
  qtyNumber: { fontSize: 12, fontWeight: '700' },
  trash: { color: '#526057', fontSize: 21, paddingHorizontal: 3 },
  summary: { marginTop: 18, backgroundColor: '#fff', borderRadius: 14, padding: 14, gap: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontWeight: '800', color: '#171b18', fontSize: 15 },
  total: { color: green, fontSize: 16, fontWeight: '900' },
  checkout: { height: 44, borderRadius: 12, backgroundColor: green, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  checkoutText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  empty: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 64 },
  emptyTitle: { color: '#171b18', fontSize: 17, fontWeight: '800' },
  exploreButton: { marginTop: 16, paddingHorizontal: 18, height: 42, borderRadius: 10, backgroundColor: green, alignItems: 'center', justifyContent: 'center' },
  exploreText: { color: '#fff', fontSize: 13, fontWeight: '800' },
});
