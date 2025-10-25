import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Image,
  Alert
} from 'react-native';

export default function TridentFashion() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Sample Products Data
  const products = [
    {
      id: '1',
      name: 'Classic White T-Shirt',
      price: '$24.99',
      category: 'clothing',
      image: 'https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=T-Shirt'
    },
    {
      id: '2',
      name: 'Designer Jeans',
      price: '$59.99',
      category: 'clothing',
      image: 'https://via.placeholder.com/150x150/50E3C2/FFFFFF?text=Jeans'
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      price: '$129.99',
      category: 'electronics',
      image: 'https://via.placeholder.com/150x150/9013FE/FFFFFF?text=Headphones'
    },
    {
      id: '4',
      name: 'Smart Watch',
      price: '$199.99',
      category: 'electronics',
      image: 'https://via.placeholder.com/150x150/BD10E0/FFFFFF?text=Watch'
    },
    {
      id: '5',
      name: 'Summer Dress',
      price: '$45.99',
      category: 'clothing',
      image: 'https://via.placeholder.com/150x150/F5A623/FFFFFF?text=Dress'
    },
    {
      id: '6',
      name: 'Bluetooth Speaker',
      price: '$79.99',
      category: 'electronics',
      image: 'https://via.placeholder.com/150x150/417505/FFFFFF?text=Speaker'
    }
  ];

  // Sample Orders Data
  const sampleOrders = [
    {
      id: '1001',
      date: '2024-01-15',
      total: '$84.98',
      items: ['Classic White T-Shirt', 'Summer Dress'],
      status: 'Delivered'
    },
    {
      id: '1002',
      date: '2024-01-10',
      total: '$199.99',
      items: ['Smart Watch'],
      status: 'Processing'
    }
  ];

  // Login Function
  const handleLogin = () => {
    if (email === 'user@trident.com' && password === 'password') {
      setCurrentScreen('home');
      setOrders(sampleOrders);
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Error', 'Invalid email or password. Use: user@trident.com / password');
    }
  };

  // Add to Cart Function
  const addToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  // Remove from Cart Function
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Checkout Function
  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Add items to cart before checkout');
      return;
    }
    
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price;
    }, 0);
    
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      total: `$${total.toFixed(2)}`,
      items: cart.map(item => item.name),
      status: 'Processing'
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    Alert.alert('Order Placed!', `Your order #${newOrder.id} has been placed successfully!`);
  };

  // Logout Function
  const handleLogout = () => {
    setCurrentScreen('login');
    setCart([]);
    setOrders([]);
  };

  // Login Screen Component
  const LoginScreen = () => (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>TF</Text>
        </View>
        <Text style={styles.appTitle}>Trident Fashion</Text>
        <Text style={styles.tagline}>Style Meets Technology</Text>
      </View>
      
      <View style={styles.loginForm}>
        <Text style={styles.loginTitle}>Welcome Back</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <Text style={styles.demoText}>
          Demo: user@trident.com / password
        </Text>
      </View>
    </View>
  );

  // Home Screen Component
  const HomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trident Fashion</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setCurrentScreen('cart')}>
            <Text style={styles.icon}>🛒 ({cart.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentScreen('account')}>
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <TouchableOpacity 
                style={styles.addToCartButton}
                onPress={() => addToCart(product)}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('home')}>
          <Text style={styles.navText}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('orders')}>
          <Text style={styles.navText}>📦 Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('messages')}>
          <Text style={styles.navText}>💬 Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('account')}>
          <Text style={styles.navText}>👤 Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Cart Screen Component
  const CartScreen = () => {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <View style={styles.headerIcons}></View>
        </View>

        <ScrollView style={styles.cartContainer}>
          {cart.length === 0 ? (
            <Text style={styles.emptyText}>Your cart is empty</Text>
          ) : (
            <>
              {cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.cartImage} />
                  <View style={styles.cartDetails}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>{item.price}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeFromCart(index)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
              
              <View style={styles.cartTotal}>
                <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    );
  };

  // Orders Screen Component
  const OrdersScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.headerIcons}></View>
      </View>

      <ScrollView style={styles.ordersContainer}>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders yet</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.orderStatus}>{order.status}</Text>
              </View>
              <Text style={styles.orderDate}>Date: {order.date}</Text>
              <Text style={styles.orderItems}>
                Items: {order.items.join(', ')}
              </Text>
              <Text style={styles.orderTotal}>Total: {order.total}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );

  // Messages Screen Component
  const MessagesScreen = () => {
    const messages = [
      {
        id: '1',
        sender: 'Trident Support',
        text: 'Welcome to Trident Fashion! How can we help you today?',
        time: 'Today, 10:30 AM'
      },
      {
        id: '2',
        sender: 'Order Updates',
        text: 'Your order #1001 has been delivered successfully.',
        time: 'Yesterday, 3:45 PM'
      },
      {
        id: '3',
        sender: 'Promotions',
        text: 'Special offer: 20% off on all electronics this weekend!',
        time: 'Jan 12, 2024'
      }
    ];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
          <View style={styles.headerIcons}></View>
        </View>

        <ScrollView style={styles.messagesContainer}>
          {messages.map((message) => (
            <View key={message.id} style={styles.messageCard}>
              <Text style={styles.messageSender}>{message.sender}</Text>
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTime}>{message.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  // Account Screen Component
  const AccountScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.accountContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileLogo}>
            <Text style={styles.profileLogoText}>TF</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>user@trident.com</Text>
        </View>

        <View style={styles.accountMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Personal Information</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentScreen('orders')}>
            <Text style={styles.menuText}>Order History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Payment Methods</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Shipping Address</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentScreen('messages')}>
            <Text style={styles.menuText}>Customer Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // Main Render Function
  switch (currentScreen) {
    case 'login':
      return <LoginScreen />;
    case 'home':
      return <HomeScreen />;
    case 'cart':
      return <CartScreen />;
    case 'orders':
      return <OrdersScreen />;
    case 'messages':
      return <MessagesScreen />;
    case 'account':
      return <AccountScreen />;
    default:
      return <LoginScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // Login Styles
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#4A90E2',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  loginForm: {
    paddingHorizontal: 30,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 12,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    fontSize: 18,
  },
  backButton: {
    fontSize: 16,
    color: '#4A90E2',
  },
  logoutButton: {
    fontSize: 16,
    color: '#ff4444',
  },
  content: {
    flex: 1,
  },
  // Product Styles
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    color: '#333',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  addToCartButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Cart Styles
  cartContainer: {
    flex: 1,
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cartDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  cartTotal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Order Styles
  ordersContainer: {
    flex: 1,
    padding: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderItems: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  // Message Styles
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageSender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  // Account Styles
  accountContainer: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
  },
  profileLogo: {
    width: 80,
    height: 80,
    backgroundColor: '#4A90E2',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileLogoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  accountMenu: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  // Navigation Styles
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  navText: {
    fontSize: 12,
    color: '#333',
  },
  // Common Styles
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});