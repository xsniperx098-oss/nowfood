export type CartItem = {
  id: string;
  name: string;
  details: string;
  price: number;
  image: string;
  quantity: number;
};

let items: CartItem[] = [];
let lastOrder: CartItem[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getCartItems() {
  return items;
}

export function getLastOrder() {
  return lastOrder;
}

export function subscribeCart(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addCartItem(item: Omit<CartItem, 'id'>) {
  const id = `${item.name}-${item.details}`;
  const existing = items.find((current) => current.id === id);
  items = existing
    ? items.map((current) => current.id === id ? { ...current, quantity: current.quantity + item.quantity } : current)
    : [...items, { ...item, id }];
  notify();
}

export function changeCartQuantity(id: string, delta: number) {
  items = items
    .map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
    .filter((item) => item.quantity > 0);
  notify();
}

export function removeCartItem(id: string) {
  items = items.filter((item) => item.id !== id);
  notify();
}

export function confirmCart() {
  lastOrder = items.map((item) => ({ ...item }));
  items = [];
  notify();
  return lastOrder;
}
