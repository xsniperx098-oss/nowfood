import React from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AppBottomNav } from '../components/app-bottom-nav';

const GREEN = '#16833B';
const DARK = '#111111';
const MUTED = '#66665F';
const CREAM = '#FAFAF1';
const PROMO_ASPECT_RATIO = 397 / 224;

const categories = [
  { name: 'Lanches', icon: require('../../assets/minhas-imagens/lanches.png') },
  { name: 'Pizza', icon: require('../../assets/minhas-imagens/pizza.png') },
  { name: 'Japonesa', icon: require('../../assets/minhas-imagens/japonesa.png') },
  { name: 'Bebidas', icon: require('../../assets/minhas-imagens/bebidas.png') },
];

const restaurants = [
  {
    name: 'Hamburguer Artesanal',
    description: 'Gourmet lanches',
    price: 'R$ 24,90',
    rating: '4,8',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=85',
  },
  {
    name: 'Pizza Calabresa',
    description: 'Pizzaria top',
    price: 'R$ 57,90',
    rating: '4,9',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=85',
  },
  {
    name: 'Combinado',
    description: 'Sushi especial',
    price: 'R$ 59,90',
    rating: '4,7',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700&auto=format&fit=crop&q=85',
  },
];

function CategoryItem({ item }: { item: (typeof categories)[number] }) {
  return (
    <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
      <View style={styles.categoryIcon}>
        <Image source={item.icon} style={styles.categoryImage} resizeMode="contain" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

function RestaurantCard({ item }: { item: (typeof restaurants)[number] }) {
  return (
    <TouchableOpacity style={styles.restaurantCard} activeOpacity={0.9}>
      <View>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <View style={styles.rating}><Text style={styles.ratingText}>★ {item.rating}</Text></View>
      </View>
      <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.restaurantDescription} numberOfLines={1}>{item.description}</Text>
      <Text style={styles.price} numberOfLines={1}>{item.price}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image source={require('../../assets/minhas-imagens/logo.png')} style={styles.logo} resizeMode="contain" />
            <TouchableOpacity style={styles.notification} onPress={() => router.push('/login')}>
              <View style={styles.bellIcon}>
                <View style={styles.bellClapper} />
              </View>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput placeholder="Buscar por restaurantes, pratos..." placeholderTextColor="#111111"
              style={styles.searchInput} returnKeyType="search" />
          </View>

          <TouchableOpacity style={styles.bannerContainer} activeOpacity={0.92}>
            <Image source={require('../../assets/minhas-imagens/promocao.png')}
              style={styles.bannerImage} resizeMode="stretch" />
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
          </View>
          <View style={styles.categories}>{categories.map((item) => <CategoryItem key={item.name} item={item} />)}</View>

          <View style={[styles.sectionHeader, styles.featuredHeader]}>
            <Text style={styles.sectionTitle}>Destaques</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.restaurantList}>
            {restaurants.map((item) => <RestaurantCard key={item.name} item={item} />)}
          </ScrollView>
        </ScrollView>
        <AppBottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: CREAM },
  screen: { flex: 1, backgroundColor: CREAM },
  scrollContent: { paddingBottom: 18 },
  header: { height: 145, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  logo: { width: 300, height: 140 },
  notification: { position: 'absolute', right: 18, top: 48, padding: 6 },
  bellIcon: { width: 17, height: 17, borderWidth: 1.8, borderColor: '#111', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderBottomWidth: 2 },
  bellClapper: { position: 'absolute', width: 7, height: 2, borderRadius: 2, backgroundColor: '#111', bottom: -4, alignSelf: 'center' },
  notificationDot: { position: 'absolute', right: 2, top: 2, width: 7, height: 7, borderRadius: 4, backgroundColor: GREEN },
  searchContainer: { height: 50, borderRadius: 25, marginHorizontal: 12, marginTop: 2, marginBottom: 25, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: CREAM, borderWidth: 1, borderColor: '#77776E' },
  searchIcon: { fontSize: 21, color: '#111', marginRight: 8 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, paddingVertical: 0, color: DARK },
  bannerContainer: { height: (Dimensions.get('window').width - 10) / PROMO_ASPECT_RATIO, marginHorizontal: 5, marginBottom: 25, overflow: 'hidden', backgroundColor: '#160A0A' },
  bannerImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 12 },
  sectionTitle: { color: DARK, fontSize: 20, fontWeight: '900' },
  categories: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 11, marginBottom: 23 },
  categoryItem: { alignItems: 'center', width: '22%' },
  categoryIcon: { width: '90%', height: 56, borderRadius: 12, backgroundColor: '#3BB007', justifyContent: 'center', alignItems: 'center', marginBottom: 7 },
  categoryImage: { width: 56, height: 56, alignSelf: 'center' },
  categoryName: { color: DARK, fontSize: 11, fontWeight: '600' },
  featuredHeader: { marginBottom: 10 },
  restaurantList: { paddingHorizontal: 6, gap: 10, paddingBottom: 6 },
  restaurantCard: { width: 145, padding: 0, backgroundColor: 'transparent' },
  foodImage: { width: '100%', height: 100, borderRadius: 3, backgroundColor: '#E4E8E1' },
  rating: { display: 'none' },
  ratingText: { color: DARK, fontSize: 8, fontWeight: '800' },
  restaurantName: { fontSize: 11, fontWeight: '800', color: DARK, marginTop: 6 },
  restaurantDescription: { fontSize: 9, color: MUTED, marginTop: 3 },
  price: { fontSize: 10, fontWeight: '700', color: GREEN, marginTop: 4, marginBottom: 0 },
});
