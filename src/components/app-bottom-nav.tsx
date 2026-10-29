import { router, usePathname } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const items = [
  { icon: { ios: 'house', android: 'home', web: 'home' }, label: 'Início', route: '/' },
  { icon: { ios: 'magnifyingglass', android: 'search', web: 'search' }, label: 'Pesquisa', route: '/explorar' },
  { icon: { ios: 'bag', android: 'shopping_bag', web: 'shopping_bag' }, label: 'Pedidos', route: '/pedidos' },
  { icon: { ios: 'person', android: 'person', web: 'person' }, label: 'Perfil', route: '/perfil' },
] as const;

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const active = item.route === '/' ? pathname === '/' : item.route === '/perfil' ? pathname.startsWith('/perfil') : pathname === item.route;
        return (
          <TouchableOpacity key={item.label} style={styles.navItem} activeOpacity={0.7}
            accessibilityRole="button" accessibilityLabel={item.label}
            onPress={() => router.navigate(item.route)}>
            <SymbolView name={item.icon} size={21} tintColor={active ? '#16833B' : '#111'} />
            <Text style={[styles.navLabel, active && styles.activeNavText]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: { height: 54, marginHorizontal: 14, marginBottom: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#8E8E87', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 10, fontWeight: '700', color: '#111', marginTop: 2 },
  activeNavText: { color: '#16833B', fontWeight: '800' },
});
