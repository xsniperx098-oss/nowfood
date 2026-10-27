
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

const { width } = Dimensions.get('window');

const GREEN = '#087C25';
const LIGHT_GREEN = '#A5FFC0';
const CREAM = '#FAF9F0';
const MUTED = '#77776E';

type Category = { name: string; icon: string };
type Restaurant = {
  name: string;
  description: string;
  price: string;
  image: string;
};

const categories: Category[] = [
  { name: 'Lanches', icon: '🍔' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Japonesa', icon: '🍱' },
  { name: 'Bebidas', icon: '🍸' },
];

const restaurants: Restaurant[] = [
  {
    name: 'Hamburguer Artesanal',
    description: 'Combo lançamento',
    price: 'R$ 24,90',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
  {
    name: 'Pizza Calabresa',
    description: 'Pizza tradicional',
    price: 'R$ 57,90',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
  },
  {
    name: 'Combinado',
    description: 'Sushi especial',
    price: 'R$ 59,90',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
  },
];

function CategoryItem({ item }: { item: Category }) {
  return (
    <TouchableOpacity style={styles.categoryItem} activeOpacity={0.8}>
      <View style={styles.categoryIcon}>
        <Text style={styles.categoryEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

function RestaurantCard({ item }: { item: Restaurant }) {
  return (
    <TouchableOpacity style={styles.restaurantCard} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <Text style={styles.restaurantName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.restaurantDescription} numberOfLines={1}>
        {item.description}
      </Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
}

function BottomNavigation() {
  const items = [
    { icon: '⌂', label: 'Início', active: true },
    { icon: '⌕', label: 'Buscar' },
    { icon: '♡', label: 'Favoritos' },
    { icon: '♟', label: 'Perfil' },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => {
            if (item.label === 'Perfil') router.push('/login');
          }}
        >
          <Text
            style={[
              styles.navIcon,
              item.active && styles.activeNavText,
            ]}
          >
            {item.icon}
          </Text>
          <Text
            style={[
              styles.navLabel,
              item.active && styles.activeNavText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View style={styles.logoArea}>
              <Text style={styles.logoDecor}>♧</Text>
              <Text style={styles.logoText}>
                nw<Text style={styles.logoHighlight}>food</Text>
              </Text>
              <Text style={styles.logoBike}>🚲</Text>
            </View>

            <TouchableOpacity style={styles.notification}>
              <Text style={styles.bell}>♧</Text>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Busca */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              placeholder="Buscar por restaurantes, pratos..."
              placeholderTextColor="#222"
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>

          {/* Banner promocional */}
          <TouchableOpacity style={styles.bannerContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000',
              }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.bannerOverlay} />

            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>
                PROMOÇÃO
              </Text>
              <Text style={styles.bannerTitleSecond}>
                IMPERDÍVEL!
              </Text>
              <Text style={styles.bannerSubtitle}>
                HAMBÚRGUER ARTESANAL
              </Text>
              <Text style={styles.bannerPriceLabel}>
                APENAS
              </Text>
              <Text style={styles.bannerPrice}>
                R$ 29,90
              </Text>
            </View>
          </TouchableOpacity>

          {/* Categorias */}
          <View style={styles.categories}>
            {categories.map((item) => (
              <CategoryItem key={item.name} item={item} />
            ))}
          </View>

          {/* Restaurantes em destaque */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destaques</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantList}
          >
            {restaurants.map((item) => (
              <RestaurantCard key={item.name} item={item} />
            ))}
          </ScrollView>
        </ScrollView>

        {/* Menu fixo inferior */}
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CREAM,
  },
  screen: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scrollContent: {
    paddingBottom: 12,
  },

  // Cabeçalho
  header: {
    height: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoDecor: {
    fontSize: 27,
    color: GREEN,
    marginRight: -7,
    transform: [{ rotate: '-30deg' }],
  },
  logoText: {
    fontSize: 27,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1.8,
    color: '#123E19',
  },
  logoHighlight: {
    color: GREEN,
  },
  logoBike: {
    fontSize: 19,
    marginLeft: 3,
  },
  notification: {
    position: 'absolute',
    right: 13,
    top: 22,
    padding: 4,
  },
  bell: {
    fontSize: 22,
    color: '#111',
  },
  notificationDot: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
  },

  // Campo de busca
  searchContainer: {
    height: 29,
    borderWidth: 1,
    borderColor: '#88877D',
    borderRadius: 20,
    marginHorizontal: 9,
    marginBottom: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
  },
  searchIcon: {
    fontSize: 19,
    color: '#111',
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 9,
    paddingVertical: 0,
    color: '#111',
  },

  // Banner
  bannerContainer: {
    height: width * 0.57,
    marginHorizontal: 3,
    marginBottom: 13,
    borderWidth: 2,
    borderColor: '#FF3E16',
    overflow: 'hidden',
    backgroundColor: '#E52B12',
  },
  bannerImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(202, 24, 0, 0.58)',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: width * 0.076,
    fontWeight: '900',
    fontStyle: 'italic',
    lineHeight: width * 0.08,
    textShadowColor: '#111',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  bannerTitleSecond: {
    color: '#FFEC00',
    fontSize: width * 0.068,
    fontWeight: '900',
    fontStyle: 'italic',
    lineHeight: width * 0.075,
    textShadowColor: '#111',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 7,
    fontWeight: '900',
    marginTop: 5,
  },
  bannerPriceLabel: {
    color: '#FFEF00',
    fontSize: 10,
    fontWeight: '900',
    marginTop: 5,
  },
  bannerPrice: {
    color: '#FFEB00',
    fontSize: width * 0.087,
    fontWeight: '900',
    fontStyle: 'italic',
    textShadowColor: '#111',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  // Categorias
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    marginBottom: 8,
  },
  categoryItem: {
    alignItems: 'center',
    width: '23%',
  },
  categoryIcon: {
    width: '86%',
    height: 29,
    borderRadius: 6,
    backgroundColor: LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryName: {
    color: '#111',
    fontSize: 7,
    fontWeight: '600',
  },

  // Destaques
  sectionHeader: {
    paddingHorizontal: 9,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '900',
    color: '#111',
  },
  restaurantList: {
    paddingHorizontal: 3,
    gap: 8,
  },
  restaurantCard: {
    width: (width - 30) / 2.55,
    marginRight: 2,
  },
  foodImage: {
    width: '100%',
    height: 57,
    borderRadius: 2,
    backgroundColor: '#E4E1D5',
  },
  restaurantName: {
    fontSize: 7,
    fontWeight: '800',
    color: '#181818',
    marginTop: 3,
  },
  restaurantDescription: {
    fontSize: 6.5,
    color: '#555',
    marginTop: 1,
  },
  price: {
    fontSize: 7,
    fontWeight: '700',
    color: GREEN,
    marginTop: 2,
  },

  // Navegação inferior
  bottomNav: {
    height: 39,
    marginHorizontal: 9,
    marginBottom: 3,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#99988E',
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 19,
    lineHeight: 20,
    color: '#171717',
  },
  navLabel: {
    fontSize: 7,
    fontWeight: '600',
    color: '#171717',
    marginTop: 0,
  },
  activeNavText: {
    color: GREEN,
    fontWeight: '900',
  },
});
