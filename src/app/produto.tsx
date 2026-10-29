import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addCartItem } from '../data/cart-store';

const green = '#16833B';
const configs = {
  burger: {
    sizesTitle: 'Tamanho', sizes: ['Simples', 'Duplo', 'Triplo'], sizeAdd: [0, 8, 15],
    extrasTitle: 'Adicionais', extras: [['Queijo extra', 2], ['Bacon extra', 2.5], ['Ovo', 2], ['Hambúrguer extra', 4]],
    saucesTitle: 'Molhos', sauces: ['Maionese', 'Ketchup', 'Mostarda', 'Barbecue'],
  },
  pizza: {
    sizesTitle: 'Tamanho', sizes: ['Pequena', 'Média', 'Grande'], sizeAdd: [0, 12, 22],
    extrasTitle: 'Coberturas extras', extras: [['Muçarela extra', 5], ['Calabresa', 6], ['Bacon', 6], ['Azeitona', 3]],
    saucesTitle: 'Borda recheada', sauces: ['Sem borda', 'Catupiry', 'Cheddar', 'Chocolate'],
  },
  sushi: {
    sizesTitle: 'Combinado', sizes: ['12 peças', '24 peças', '36 peças'], sizeAdd: [0, 32, 60],
    extrasTitle: 'Adicionais', extras: [['Sashimi de salmão', 12], ['Cream cheese', 4], ['Gengibre', 2], ['Wasabi extra', 2]],
    saucesTitle: 'Molhos', sauces: ['Shoyu', 'Tarê', 'Ponzu', 'Spicy'],
  },
  brazilian: {
    sizesTitle: 'Porção', sizes: ['Individual', 'Para 2', 'Para 4'], sizeAdd: [0, 24, 52],
    extrasTitle: 'Acompanhamentos', extras: [['Torresmo', 7], ['Ovo frito', 3], ['Farofa extra', 3], ['Couve extra', 3]],
    saucesTitle: 'Complementos', sauces: ['Laranja', 'Vinagrete', 'Pimenta', 'Molho da casa'],
  },
  acai: {
    sizesTitle: 'Tamanho', sizes: ['300 ml', '500 ml', '700 ml'], sizeAdd: [0, 8, 14],
    extrasTitle: 'Adicionais', extras: [['Granola', 2], ['Banana', 2], ['Morango', 4], ['Leite condensado', 3]],
    saucesTitle: 'Coberturas', sauces: ['Mel', 'Paçoca', 'Chocolate', 'Leite em pó'],
  },
  drinks: {
    sizesTitle: 'Tamanho', sizes: ['Lata', '600 ml', '1 litro'], sizeAdd: [0, 4, 8],
    extrasTitle: 'Deseja adicionar?', extras: [['Gelo', 0], ['Limão', 1], ['Copo com gelo', 1], ['Canudo', 0]],
    saucesTitle: 'Preferência', sauces: ['Normal', 'Sem gelo', 'Com gelo', 'Bem gelada'],
  },
};
type ConfigKey = keyof typeof configs;

function money(value: number) { return `R$ ${value.toFixed(2).replace('.', ',')}`; }

export default function ProductScreen() {
  const params = useLocalSearchParams<{ name?: string; desc?: string; price?: string; category?: string }>();
  const category = (params.category ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const type: ConfigKey = category.includes('pizza') ? 'pizza'
    : category.includes('japonesa') || category.includes('sushi') || category.includes('combinado') ? 'sushi'
    : category.includes('acai') || category.includes('sobremesa') ? 'acai'
    : category.includes('bebida') || category.includes('refrigerante') ? 'drinks'
    : category.includes('brasileira') || category.includes('feijoada') ? 'brazilian' : 'burger';
  const config = configs[type];
  const productName = params.name || 'X-Tudo';
  const productDesc = params.desc || 'Pão, carne, queijo, bacon, ovo, alface, tomate e maionese.';
  const basePrice = Number((params.price ?? 'R$ 29,90').replace('R$', '').trim().replace(',', '.')) || 29.9;
  const [sizeIndex, setSizeIndex] = useState(0);
  const [extras, setExtras] = useState<string[]>([]);
  const [sauce, setSauce] = useState(config.sauces[0]);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState('');
  const total = useMemo(() => basePrice + config.sizeAdd[sizeIndex] + config.extras.reduce((sum, [name, price]) => sum + (extras.includes(String(name)) ? Number(price) : 0), 0), [basePrice, config, sizeIndex, extras]);
  const toggleExtra = (name: string) => setExtras((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const productImage = type === 'pizza' ? 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=900&auto=format&fit=crop&q=85'
    : type === 'sushi' ? 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&auto=format&fit=crop&q=85'
    : type === 'brazilian' ? 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=85'
    : type === 'acai' ? 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=900&auto=format&fit=crop&q=85'
    : type === 'drinks' ? 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=900&auto=format&fit=crop&q=85'
    : 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=85';

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView>
        <View style={styles.hero}>
          <Image source={{ uri: productImage }} style={StyleSheet.absoluteFill} />
          <TouchableOpacity style={styles.back} onPress={() => router.back()}><Text style={styles.backText}>‹</Text></TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}><Text style={styles.title}>{productName}</Text><Text style={styles.price}>{money(total)}</Text></View>
          <Text style={styles.desc}>{productDesc}</Text>
          <Text style={styles.label}>{config.sizesTitle}</Text>
          <View style={styles.options}>{config.sizes.map((name, index) => <TouchableOpacity key={name} onPress={() => setSizeIndex(index)} style={[styles.size, sizeIndex === index && styles.selectedSize]}><Text style={[styles.sizeName, sizeIndex === index && styles.selectedText]}>{name}</Text><Text style={[styles.sizePrice, sizeIndex === index && styles.selectedText]}>{index === 0 ? money(basePrice) : `+ ${money(config.sizeAdd[index])}`}</Text></TouchableOpacity>)}</View>
          <Text style={styles.label}>{config.extrasTitle}</Text>
          {config.extras.map(([name, price]) => <TouchableOpacity key={String(name)} style={styles.choice} onPress={() => toggleExtra(String(name))}><Text style={[styles.checkbox, extras.includes(String(name)) && styles.checked]}>{extras.includes(String(name)) ? '✓' : ''}</Text><Text style={styles.choiceName}>{name}</Text><Text style={styles.choicePrice}>+ {money(Number(price))}</Text></TouchableOpacity>)}
          <Text style={styles.label}>{config.saucesTitle}</Text>
          <View style={styles.sauces}>{config.sauces.map((name) => <TouchableOpacity key={name} style={styles.sauce} onPress={() => setSauce(name)}><Text style={[styles.radio, sauce === name && styles.radioSelected]}>{sauce === name ? '●' : '○'}</Text><Text style={styles.choiceName}>{name}</Text></TouchableOpacity>)}</View>
          <Text style={styles.label}>Observações <Text style={styles.optional}>(opcional)</Text></Text>
          <TextInput value={note} onChangeText={setNote} placeholder="Alguma preferência?" style={styles.note} />
        </View>
      </ScrollView>
      <View style={styles.footer}><View style={styles.counter}><TouchableOpacity onPress={() => setCount(Math.max(1, count - 1))}><Text style={styles.counterButton}>−</Text></TouchableOpacity><Text style={styles.count}>{count}</Text><TouchableOpacity onPress={() => setCount(count + 1)}><Text style={styles.counterButton}>+</Text></TouchableOpacity></View><TouchableOpacity style={styles.addButton} onPress={() => { const details = [config.sizes[sizeIndex], extras.join(', '), `${config.saucesTitle}: ${sauce}`, note.trim()].filter(Boolean).join(' · '); addCartItem({ name: productName, details, price: total, quantity: count, image: productImage }); router.push('/pedidos'); }}><Text style={styles.addButtonText}>Adicionar • {money(total * count)}</Text></TouchableOpacity></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#fff' }, hero: { height: 185, backgroundColor: '#17120d' }, back: { margin: 14, width: 34, height: 34, borderRadius: 17, backgroundColor: '#1119', alignItems: 'center', justifyContent: 'center' }, backText: { color: '#fff', fontSize: 28 }, content: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 16 }, titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { flex: 1, fontSize: 20, fontWeight: '800', color: '#151815' }, price: { fontSize: 16, fontWeight: '800', color: green }, desc: { fontSize: 12, color: '#59625b', marginTop: 5 }, label: { fontSize: 14, fontWeight: '800', color: '#171b18', marginTop: 16, marginBottom: 8 }, options: { flexDirection: 'row', gap: 8 }, size: { flex: 1, borderWidth: 1, borderColor: '#e0e5e0', borderRadius: 18, alignItems: 'center', paddingVertical: 9 }, selectedSize: { backgroundColor: green, borderColor: green }, sizeName: { fontWeight: '700', fontSize: 11, color: '#202620' }, sizePrice: { fontSize: 9, color: '#66716a', marginTop: 3 }, selectedText: { color: '#fff' }, choice: { minHeight: 39, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderColor: '#edf0ed' }, checkbox: { width: 17, height: 17, borderRadius: 4, borderWidth: 1, borderColor: '#cbd3cc', color: '#fff', textAlign: 'center', fontSize: 12, overflow: 'hidden' }, checked: { backgroundColor: green, borderColor: green }, choiceName: { flex: 1, fontSize: 12, color: '#303830' }, choicePrice: { fontSize: 11, color: '#303830' }, sauces: { flexDirection: 'row', flexWrap: 'wrap' }, sauce: { width: '50%', height: 34, flexDirection: 'row', alignItems: 'center', gap: 9 }, radio: { width: 17, color: '#9ca69e', fontSize: 15 }, radioSelected: { color: green }, optional: { fontWeight: '400', color: '#818a83', fontSize: 12 }, note: { height: 40, borderWidth: 1, borderColor: '#e0e5e0', borderRadius: 20, paddingHorizontal: 14, fontSize: 12 }, footer: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderColor: '#edf0ed', backgroundColor: '#fff' }, counter: { height: 42, borderRadius: 12, borderWidth: 1, borderColor: '#e0e5e0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: 102 }, counterButton: { fontSize: 22, color: green }, count: { fontWeight: '700', color: '#263229' }, addButton: { flex: 1, height: 42, backgroundColor: green, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }, addButtonText: { color: '#fff', fontWeight: '800', fontSize: 13 } });
