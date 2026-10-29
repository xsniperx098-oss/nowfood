import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBottomNav } from '../components/app-bottom-nav';

const green = '#16833B';
const restaurants = [
  { name: 'Gourmet Lanches', category: 'Hambúrguer · Lanches', rating: '4.8', time: '15 min', price: 'R$ 15,00', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=85' },
  { name: 'Pizzaria Top', category: 'Pizza · Massas', rating: '4.9', time: '50 min', price: 'R$ 40,00', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=85' },
  { name: 'Sushi Expresso', category: 'Japonesa · Sushi', rating: '4.7', time: '35 min', price: 'R$ 45,00', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=85' },
  { name: 'Açaí e Cia', category: 'Açaí · Sobremesas', rating: '4.8', time: '35 min', price: 'R$ 22,00', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop&q=85' },
  { name: 'Bebidas Geladas', category: 'Bebidas · Refrigerantes', rating: '4.6', time: '12 min', price: 'R$ 15,00', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop&q=85' },
];
const categories = ['Todos', 'Hambúrguer', 'Pizza', 'Japonesa', 'Açaí', 'Bebidas'];
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  useEffect(() => {
    const requested = typeof params.category === 'string' ? params.category : '';
    const target = requested.toLowerCase() === 'lanches' ? 'Hambúrguer' : requested;
    setCategory(categories.includes(target) ? target : 'Todos');
  }, [params.category]);
  const filtered = useMemo(() => restaurants.filter((item) => {
    const matchesCategory = category === 'Todos' || normalize(item.category).includes(normalize(category));
    const searchable = normalize(`${item.name} ${item.category}`);
    return matchesCategory && searchable.includes(normalize(query));
  }), [category, query]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.search}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar restaurantes ou cozinhas..."
          placeholderTextColor="#7b8580"
          style={styles.searchInput}
          returnKeyType="search"
          accessibilityLabel="Buscar restaurantes ou cozinhas"
        />
        {query.length > 0 && <TouchableOpacity accessibilityLabel="Limpar busca" onPress={() => setQuery('')}><Text style={styles.clear}>×</Text></TouchableOpacity>}
      </View>

      <ScrollView horizontal style={styles.categoryScroll} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((item) => (
          <TouchableOpacity key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.activeChip]}>
            <Text style={[styles.chipText, category === item && styles.activeChipText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.headingRow}>
        <Text style={styles.heading}>{query || category !== 'Todos' ? 'Resultados da busca' : 'Restaurantes perto de você'}</Text>
        <Text style={styles.count}>{filtered.length}</Text>
      </View>
      <ScrollView style={styles.resultsScroll} contentContainerStyle={styles.results} keyboardShouldPersistTaps="handled">
        {filtered.map((item) => (
          <TouchableOpacity key={item.name} style={styles.row} activeOpacity={0.8} onPress={() => router.push({ pathname: '/restaurante', params: { name: item.name, category: item.category } })}>
            <Image source={{ uri: item.image }} style={styles.photo} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.muted}>{item.category}</Text>
              <View style={styles.metaRow}><Text style={styles.muted}>◷ {item.time}</Text><Text style={styles.price}>{item.price}</Text></View>
            </View>
          </TouchableOpacity>
        ))}
        {!filtered.length && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum restaurante encontrado</Text>
            <Text style={styles.emptyText}>Tente outro nome ou escolha uma categoria diferente.</Text>
            <TouchableOpacity onPress={() => { setQuery(''); setCategory('Todos'); }}><Text style={styles.reset}>Limpar filtros</Text></TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <AppBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAFAF5' },
  search: { height: 46, marginHorizontal: 16, marginTop: 10, borderRadius: 24, borderWidth: 1, borderColor: '#e1e6e1', backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  searchIcon: { fontSize: 25, color: '#34433b', marginRight: 8 }, searchInput: { flex: 1, fontSize: 13, color: '#202820', paddingVertical: 0 }, clear: { fontSize: 23, color: '#65736a', paddingHorizontal: 4 },
  categoryScroll: { height: 54, flexGrow: 0 }, chips: { gap: 8, paddingHorizontal: 16, alignItems: 'center' }, chip: { borderRadius: 20, borderWidth: 1, borderColor: '#e1e5e1', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 8 }, activeChip: { backgroundColor: green, borderColor: green }, chipText: { fontSize: 12, color: '#303a34' }, activeChipText: { color: '#fff', fontWeight: '700' },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginBottom: 7 }, heading: { fontSize: 17, fontWeight: '800', color: '#171b18' }, count: { color: '#758078', fontSize: 12 }, resultsScroll: { flex: 1 }, results: { paddingHorizontal: 6, paddingBottom: 12 }, row: { minHeight: 76, flexDirection: 'row', alignItems: 'center', padding: 6, marginBottom: 10, borderWidth: 1, borderColor: '#737b75', borderRadius: 9, backgroundColor: '#fff', gap: 10 }, photo: { width: 76, height: 60, borderRadius: 7, backgroundColor: '#e8e8e8' }, info: { flex: 1, justifyContent: 'center', gap: 2 }, name: { fontSize: 13, fontWeight: '800', color: '#171b18' }, muted: { fontSize: 10, color: '#858b86' }, metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }, price: { color: green, fontSize: 10, fontWeight: '800', marginRight: 6 }, emptyState: { alignItems: 'center', paddingHorizontal: 22, paddingTop: 56 }, emptyTitle: { fontSize: 15, fontWeight: '800', color: '#303a34', textAlign: 'center' }, emptyText: { color: '#737d76', fontSize: 12, textAlign: 'center', marginTop: 6 }, reset: { color: green, fontWeight: '700', marginTop: 15 },
});
