import React, { useState } from 'react';
import { CartItem, Product } from './type';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Categories from './components/categories';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import WhyVoltex from './components/WhyVoltex';
import Support from './components/Support';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AccountModal from './components/Accountmodal';
import './App.css';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const addToCart = (product: Product, model?: string) => {
    setCartItems(prev => {
      const key = `${product.id}-${model ?? ''}`;
      const existing = prev.find(i => `${i.id}-${i.selectedModel ?? ''}` === key);
      if (existing) {
        return prev.map(i =>
          `${i.id}-${i.selectedModel ?? ''}` === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1, selectedModel: model }];
    });
    // Cart does NOT auto-open
  };

  const removeFromCart = (id: number, model?: string) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.selectedModel === model)));
  };

  const updateQuantity = (id: number, qty: number, model?: string) => {
    if (qty < 1) return removeFromCart(id, model);
    setCartItems(prev =>
      prev.map(i =>
        i.id === id && i.selectedModel === model ? { ...i, quantity: qty } : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartOpen(false);
  };

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <>
      <Navbar
        totalItems={totalItems}
        onCartClick={() => setCartOpen(true)}
        onAccountClick={() => setAccountOpen(true)}
      />
      <Hero />
      <Brands />
      <Categories />
      <Products addToCart={addToCart} />
      <HowItWorks />
      <WhyVoltex />
      <Support />
      <Footer />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        totalPrice={totalPrice}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onOrderComplete={clearCart}
      />
      <AccountModal
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
      />
    </>
  );
};

export default App;