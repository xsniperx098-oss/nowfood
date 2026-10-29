import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const green = '#16833B';
const menus = {
  burger: { section: 'Lanches', hero: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=85', items: [
    { name: 'X-Burguer', desc: 'Pão, carne, queijo, alface, tomate e maionese.', price: 'R$ 24,90', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=85' },
    { name: 'X-Bacon', desc: 'Pão, carne, queijo, bacon, alface, tomate e maionese.', price: 'R$ 27,90', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=85' },
    { name: 'X-Tudo', desc: 'Pão, carne, queijo, bacon, ovo, alface, tomate e maionese.', price: 'R$ 29,90', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=85' },
  ] },
  pizza: { section: 'Pizzas', hero: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=900&auto=format&fit=crop&q=85', items: [
    { name: 'Pizza Calabresa', desc: 'Calabresa, cebola, muçarela e molho da casa.', price: 'R$ 49,90', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&auto=format&fit=crop&q=85' },
    { name: 'Pizza Marguerita', desc: 'Muçarela, tomate, manjericão e molho da casa.', price: 'R$ 46,90', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&auto=format&fit=crop&q=85' },
    { name: 'Quatro Queijos', desc: 'Muçarela, provolone, parmesão e gorgonzola.', price: 'R$ 54,90', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&auto=format&fit=crop&q=85' },
  ] },
  sushi: { section: 'Japonesas', hero: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&auto=format&fit=crop&q=85', items: [
    { name: 'Combinado Sushi', desc: 'Seleção de sushis e sashimis preparados na hora.', price: 'R$ 59,90', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&auto=format&fit=crop&q=85' },
    { name: 'Sashimi Mix', desc: 'Fatias de salmão e atum frescos.', price: 'R$ 42,90', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&auto=format&fit=crop&q=85' },
    { name: 'Hot Roll', desc: 'Sushi empanado com salmão e cream cheese.', price: 'R$ 34,90', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&auto=format&fit=crop&q=85' },
  ] },
  brazilian: { section: 'Pratos brasileiros', hero: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=85', items: [
    { name: 'Feijoada completa', desc: 'Feijoada da casa, arroz, couve, farofa e laranja.', price: 'R$ 39,90', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&auto=format&fit=crop&q=85' },
    { name: 'Baião de dois', desc: 'Arroz, feijão-de-corda, queijo coalho e carne seca.', price: 'R$ 34,90', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format&fit=crop&q=85' },
    { name: 'Prato feito', desc: 'Arroz, feijão, bife acebolado, salada e fritas.', price: 'R$ 29,90', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&auto=format&fit=crop&q=85' },
  ] },
  acai: { section: 'Açaí e sobremesas', hero: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=900&auto=format&fit=crop&q=85', items: [
    { name: 'Açaí tradicional', desc: 'Açaí cremoso com banana e granola.', price: 'R$ 22,00', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&auto=format&fit=crop&q=85' },
    { name: 'Açaí com morango', desc: 'Açaí, morangos frescos e leite condensado.', price: 'R$ 25,00', image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&auto=format&fit=crop&q=85' },
    { name: 'Açaí na tigela', desc: 'Açaí com frutas, granola e mel.', price: 'R$ 29,00', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&auto=format&fit=crop&q=85' },
  ] },
  drinks: { section: 'Bebidas geladas', hero: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=900&auto=format&fit=crop&q=85', items: [
    { name: 'Refrigerante lata', desc: 'Lata 350 ml, bem gelada.', price: 'R$ 7,00', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&auto=format&fit=crop&q=85' },
    { name: 'Suco natural', desc: 'Suco de laranja feito na hora, 400 ml.', price: 'R$ 10,00', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&auto=format&fit=crop&q=85' },
    { name: 'Água mineral', desc: 'Garrafa 500 ml.', price: 'R$ 5,00', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&auto=format&fit=crop&q=85' },
  ] },
};

export default function RestaurantScreen() {
  const [tab, setTab] = useState('Cardápio');
  const params = useLocalSearchParams<{ name?: string; category?: string }>();
  const restaurantName = typeof params.name === 'string' ? params.name : 'Burguer House';
  const restaurantCategory = typeof params.category === 'string' ? params.category : 'Hambúrguer';
  const categoryKey = restaurantCategory.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const menu = categoryKey.includes('pizza') ? menus.pizza
    : categoryKey.includes('japonesa') || categoryKey.includes('sushi') || categoryKey.includes('combinado') ? menus.sushi
    : categoryKey.includes('acai') || categoryKey.includes('sobremesa') ? menus.acai
    : categoryKey.includes('bebida') || categoryKey.includes('refrigerante') ? menus.drinks
    : categoryKey.includes('brasileira') || categoryKey.includes('feijoada') ? menus.brazilian
    : menus.burger;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView>
        <View style={styles.hero}>
          <Image source={{ uri: menu.hero }} style={StyleSheet.absoluteFill} />
          <TouchableOpacity style={styles.back} onPress={() => router.back()}><Text style={styles.backText}>‹</Text></TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.titleRow}><View><Text style={styles.title}>{restaurantName}</Text><Text style={styles.muted}>{restaurantCategory} · $$</Text></View><Text style={styles.muted}>♡　↗</Text></View>
          <Text style={styles.rating}>★ 4.8 (1,2k)　♧ 30-45 min</Text>
          <View style={styles.tabs}>{['Cardápio', 'Avaliações'].map((value) => <TouchableOpacity key={value} style={[styles.tab, tab === value && styles.selectedTab]} onPress={() => setTab(value)}><Text style={[styles.tabText, tab === value && styles.selectedText]}>{value}</Text></TouchableOpacity>)}</View>
          {tab === 'Cardápio' ? <><Text style={styles.section}>{menu.section}</Text>{menu.items.map((item) => <View key={item.name} style={styles.item}><Image source={{ uri: item.image }} style={styles.itemImage} /><View style={styles.itemInfo}><Text style={styles.itemName}>{item.name}</Text><Text style={styles.muted} numberOfLines={2}>{item.desc}</Text><Text style={styles.price}>{item.price}</Text></View><TouchableOpacity style={styles.add} onPress={() => router.push({ pathname: '/produto', params: { name: item.name, desc: item.desc, price: item.price, category: restaurantCategory } })}><Text style={styles.addText}>+</Text></TouchableOpacity></View>)}</> : <Text style={styles.muted}>★ 4,8 · Confira as avaliações de clientes.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#fff' }, hero: { height: 205, backgroundColor: '#17120d', overflow: 'hidden' }, back: { margin: 14, width: 34, height: 34, borderRadius: 17, backgroundColor: '#1119', alignItems: 'center', justifyContent: 'center' }, backText: { color: '#fff', fontSize: 28, lineHeight: 30 }, body: { marginTop: -12, paddingHorizontal: 18, paddingTop: 18, borderTopLeftRadius: 18, borderTopRightRadius: 18, backgroundColor: '#fff' }, titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { fontSize: 20, fontWeight: '800', color: '#151815' }, muted: { fontSize: 12, color: '#778078', marginTop: 3 }, rating: { marginTop: 8, color: green, fontSize: 12, fontWeight: '700' }, tabs: { flexDirection: 'row', marginTop: 18, borderBottomWidth: 1, borderColor: '#e8ece8' }, tab: { flex: 1, alignItems: 'center', paddingVertical: 12 }, selectedTab: { borderBottomWidth: 2, borderColor: green }, tabText: { color: '#778078', fontWeight: '600' }, selectedText: { color: green }, section: { fontSize: 18, fontWeight: '800', marginTop: 18, marginBottom: 4, color: '#151815' }, item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#edf0ed' }, itemImage: { width: 74, height: 74, borderRadius: 12, backgroundColor: '#eee' }, itemInfo: { flex: 1 }, itemName: { fontSize: 14, fontWeight: '800', color: '#171b18' }, price: { fontSize: 13, fontWeight: '800', color: green, marginTop: 4 }, add: { width: 30, height: 30, borderRadius: 15, backgroundColor: green, alignItems: 'center', justifyContent: 'center' }, addText: { color: '#fff', fontSize: 22, lineHeight: 25 } });
