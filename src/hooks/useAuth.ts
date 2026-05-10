import { useState, useEffect } from 'react';

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  state: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: { name: string; brand: string; quantity: number; price: number; model?: string }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  deliveryAddress: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
}

const STORAGE_KEY = 'voltex_user';
const SESSION_KEY = 'voltex_session';

// Simulated user database stored in localStorage
const getDb = (): Record<string, User & { password: string }> => {
  try { return JSON.parse(localStorage.getItem('voltex_db') || '{}'); }
  catch { return {}; }
};
const saveDb = (db: Record<string, User & { password: string }>) => {
  localStorage.setItem('voltex_db', JSON.stringify(db));
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (!session) return null;
      const db = getDb();
      const u = db[session];
      if (!u) return null;
      const { password: _, ...rest } = u;
      return rest;
    } catch { return null; }
  });

  const login = (email: string, password: string): string | null => {
    const db = getDb();
    const key = email.toLowerCase().trim();
    const u = db[key];
    if (!u) return 'No account found with this email.';
    if (u.password !== password) return 'Incorrect password.';
    localStorage.setItem(SESSION_KEY, key);
    const { password: _, ...rest } = u;
    setUser(rest);
    return null;
  };

  const register = (firstName: string, lastName: string, email: string, password: string): string | null => {
    if (!firstName.trim() || !lastName.trim()) return 'Please enter your full name.';
    if (!email.includes('@') || !email.includes('.')) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    const db = getDb();
    const key = email.toLowerCase().trim();
    if (db[key]) return 'An account with this email already exists.';
    const newUser: User & { password: string } = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: key,
      password,
      addresses: [],
      orders: [],
    };
    db[key] = newUser;
    saveDb(db);
    localStorage.setItem(SESSION_KEY, key);
    const { password: _, ...rest } = newUser;
    setUser(rest);
    return null;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const db = getDb();
    const key = user.email;
    if (!db[key]) return;
    db[key] = { ...db[key], ...updates };
    saveDb(db);
    setUser(prev => prev ? { ...prev, ...updates } : prev);
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = { ...addr, id: Date.now().toString() };
    const addresses = addr.isDefault
      ? [...user.addresses.map(a => ({ ...a, isDefault: false })), newAddr]
      : [...user.addresses, newAddr];
    updateUser({ addresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    updateUser({ addresses: user.addresses.filter(a => a.id !== id) });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    updateUser({ addresses: user.addresses.map(a => ({ ...a, isDefault: a.id === id })) });
  };

  const addOrder = (order: Omit<Order, 'id' | 'date' | 'status'>) => {
    if (!user) return;
    const newOrder: Order = {
      ...order,
      id: 'VTX' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      date: new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Processing',
    };
    updateUser({ orders: [newOrder, ...user.orders] });
    return newOrder.id;
  };

  return { user, login, register, logout, updateUser, addAddress, deleteAddress, setDefaultAddress, addOrder };
};