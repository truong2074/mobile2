import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, View, Dimensions, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: windowWidth } = Dimensions.get('window');

const sliderImages = [
  { id: 1, source: require('@/assets/images/banner1.jpg') },
  { id: 2, source: require('@/assets/images/banner2.jpg') },
  { id: 3, source: require('@/assets/images/banner1.jpg') },
];

const products = [
  { id: 1, name: 'Product 1', image: require('@/assets/images/nhan1.jpg') },
  { id: 2, name: 'Product 2', image: require('@/assets/images/daychuyen1.jpg') },
  { id: 3, name: 'Product 3', image: require('@/assets/images/khuyen1.jpg') },
  { id: 4, name: 'Product 4', image: require('@/assets/images/vtay1.jpg') },
];

const categories = [
  { id: 1, name: 'Nhẫn', icon: 'ring' },
  { id: 2, name: 'Khuyên tai', icon: 'ear-hearing' },
  { id: 3, name: 'Dây chuyền', icon: 'necklace' },
  { id: 4, name: 'Vòng tay', icon: 'bracelet' },
];

const HomeScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryPress = (categoryName: string) => {
    console.log(`Selected category: ${categoryName}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm . . ." />
        <TouchableOpacity style={styles.searchButton}>
          <ThemedText type="default">Search</ThemedText>
        </TouchableOpacity>
        <Link href="../cart">
          <Icon name="cart" size={30} color="#fff" style={styles.cartIcon} />
        </Link>
      </View>

      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          loop
          showsPagination
          onIndexChanged={(index: number) => setActiveSlide(index)}
        >
          {sliderImages.map((image) => (
            <Image key={image.id} source={image.source} style={styles.sliderImage} resizeMode="cover" />
          ))}
        </Swiper>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Icon name={category.icon} size={30} color="#fff" />
            <ThemedText type="title" style={styles.categoryText}>
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ThemedText type="title" style={styles.title}>Sản phẩm</ThemedText>
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <Animated.View key={product.id} style={styles.productCard}>
            <Image source={product.image} style={styles.productImage} />
            <ThemedText type="subtitle" style={styles.productName}>{product.name}</ThemedText>
            <TouchableOpacity style={styles.addButton}>
              <Link href='./productdetail' style={styles.addButtonText}>Add to Cart</Link>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: 'linear-gradient(90deg, #007bff, #6610f2)', // Gradient background
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  logo: {
    width: windowWidth - 80,
    height: 100,
    resizeMode: 'contain',
    backgroundColor:'black'
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cartIcon: {
    paddingLeft: 5,
    width: 40,
    height: 40,
    color:'black'
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  sliderContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryCard: {
    width: 100,
    backgroundColor: '#6610f2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    height: 150,
    width: '100%',
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    textAlign: "center",
  },
});

export default HomeScreen;
