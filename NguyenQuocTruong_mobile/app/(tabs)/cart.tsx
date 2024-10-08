import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import Icon from 'react-native-vector-icons/FontAwesome';

type CartItem = {
  id: number;
  name: string;
  image: any;
  price: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  image: any;
  price: number;
};

const products: Product[] = [
  { id: 1, name: 'Ontario Lotus Helios Black Silver', image: require('@/assets/images/nhan1.jpg'), price: 79.28 },
  { id: 2, name: 'Free Helios Silver', image: require('@/assets/images/khuyen1.jpg'), price: 14.03 },
  { id: 3, name: 'Freedom Helios Silver', image: require('@/assets/images/daychuyen1.jpg'), price: 46.75 },
  { id: 4, name: 'Freedom Bracelet Helios Silver', image: require('@/assets/images/vtay1.jpg'), price: 132.13 },
];

const CartScreen: React.FC<{ route: any }> = ({ route }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(route?.params?.cartItems || []);
  const [animation] = useState(new Animated.Value(1));

  const calculateTotal = (): string => {
    return cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
      triggerAnimation(); // Trigger animation when adding to cart
    }
  };

  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(animation, { toValue: 1.1, duration: 200, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: true })
    ]).start();
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      const updatedItems = cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Giỏ hàng</ThemedText>
      {cartItems.length === 0 ? (
        <ThemedText type="default" style={styles.emptyCartText}>Giỏ hàng đang trống.</ThemedText>
      ) : (
        <>
          {cartItems.map((item: CartItem) => (
            <Animated.View key={item.id} style={[styles.card, { transform: [{ scale: animation }] }]}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.cardDetails}>
                <ThemedText type="title" style={styles.itemName}>{item.name}</ThemedText>
                <ThemedText type="default" style={styles.priceText}>${item.price.toFixed(2)}</ThemedText>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>
                    <Icon name="minus" size={16} color="#fff" />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={String(item.quantity)}
                    keyboardType="numeric"
                    onChangeText={(text) => updateQuantity(item.id, Number(text))}
                  />
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
                    <Icon name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                <Icon name="trash" size={20} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          ))}
          <View style={styles.totalContainer}>
            <ThemedText type="title">Tổng: ${calculateTotal()}</ThemedText>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <ThemedText type="default" style={styles.checkoutText}>Xử lý thanh toán</ThemedText>
          </TouchableOpacity>
        </>
      )}

      <ThemedText type="title" style={styles.title}>Thêm Sản Phẩm Vào Giỏ Hàng</ThemedText>
      <View style={styles.productGrid}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <ThemedText type="title" style={styles.smallProductName}>{product.name}</ThemedText>
              <ThemedText type="default" style={styles.priceText}>${product.price.toFixed(2)}</ThemedText>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
              <Icon name="shopping-cart" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff', // Light gradient background
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#868e96',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 8,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  checkoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 6,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productDetails: {
    flex: 1,
  },
  smallProductName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: '#212529',
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    width: 40,
    textAlign: 'center',
    padding: 5,
  },
});

export default CartScreen;
