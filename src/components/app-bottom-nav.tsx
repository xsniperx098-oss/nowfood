import { router, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const items = [
  { icon: '⌂', label: 'Início', route: '/' },
  { icon: '⌕', label: 'Pesquisa', route: '/explorar' },
  { icon: '♡', label: 'Favoritos', route: '/explorar' },
  { icon: '♙', label: 'Perfil', route: '/login' },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const active = item.route === '/' ? pathname === '/' : pathname === item.route;
        return (
          <TouchableOpacity key={item.label} style={styles.navItem} activeOpacity={0.7}
            accessibilityRole="button" accessibilityLabel={item.label}
            onPress={() => router.navigate(item.route)}>
            <Text style={[styles.navIcon, active && styles.activeNavText]}>{item.icon}</Text>
            <Text style={[styles.navLabel, active && styles.activeNavText]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: { height: 48, marginHorizontal: 14, marginBottom: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#8E8E87', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIcon: { fontSize: 20, lineHeight: 22, color: '#111' },
  navLabel: { fontSize: 9, fontWeight: '700', color: '#111', marginTop: 1 },
  activeNavText: { color: '#16833B', fontWeight: '800' },
});
