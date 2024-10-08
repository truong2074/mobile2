import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Add icon library

const product = {
  id: 1,
  name: "Free Helios Silver",
  description: "Mỗi một sản phẩm bạc tại Helios đều là kết quả của quá trình chế tác thủ công kỹ lưỡng, tỉ mỉ và trau chuốt trước khi đến tay khách hàng. Trong quy trình chế tác, chúng tôi luôn không ngừng cải tiến để nâng cao tiêu chuẩn đầu ra, đảm bảo khách hàng sẽ nhận được sản phẩm với chất lượng tốt nhất.",
  image: require("@/assets/images/khuyen1.jpg"),
};

const anotherProduct = {
  id: 2,
  name: "Ontario Lotus Helios Black Silver",
  image: require("@/assets/images/nhan1.jpg"),
};

const sizes = ["10MM", "12MM", "14MM"];

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    console.log(`Product added to cart: ${quantity} x ${product.name}, Size: ${selectedSize}`);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        accessibilityLabel="Back"
      >
        <Icon name="arrow-back" size={20} color="white" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.productImage} />
      </View>

      <View style={styles.detailsContainer}>
        <ThemedText type="title" style={styles.productName}>{product.name}</ThemedText>
        <ThemedText type="default" style={styles.productDescription}>{product.description}</ThemedText>

        <View style={styles.pickerContainer}>
          <ThemedText type="default" style={styles.pickerLabel}>Chọn kích thước:</ThemedText>
          <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Chọn kích thước" value={null} />
            {sizes.map((size) => (
              <Picker.Item key={size} label={size} value={size} />
            ))}
          </Picker>
        </View>

        <View style={styles.quantityContainer}>
          <Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
            <ThemedText type="default" style={styles.quantityText}>-</ThemedText>
          </Pressable>
          <ThemedText type="default" style={styles.quantityText}>{quantity}</ThemedText>
          <Pressable onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
            <ThemedText type="default" style={styles.quantityText}>+</ThemedText>
          </Pressable>
        </View>

        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <ThemedText type="default" style={styles.addButtonText}>Thêm vào giỏ hàng</ThemedText>
        </Pressable>
      </View>

      <View style={styles.productsRow}>
        <View style={styles.productContainer}>
          <Image source={anotherProduct.image} style={styles.anotherProductImage} />
          <View style={styles.productDetails}>
            <ThemedText type="title" style={styles.productName}>{anotherProduct.name}</ThemedText>
            <Pressable 
              style={styles.addButton} 
              onPress={() => console.log(`Product added to cart: ${anotherProduct.name}`)}
              accessibilityLabel="View more about the product"
            >
              <ThemedText type="default" style={styles.addButtonText}>Xem thêm</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F0F4F8",
  },
  backButton: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    height: 300,
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 20,
    color: "black",
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  productsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  productContainer: {
    width: '48%',
    marginHorizontal: '1%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  anotherProductImage: {
    height: 150,
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  productDetails: {
    padding: 12,
  },
});

export default ProductDetailScreen;
