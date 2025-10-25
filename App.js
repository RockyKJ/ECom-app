import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

export default function TridentFashion() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);

  // Sample Products Data
  const products = [
    {
      id: '1',
      name: 'Classic White T-Shirt',
      price: '$24.99',
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Designer Jeans',
      price: '$59.99',
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Wireless Headphones',
      price: '$129.99',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'Smart Watch',
      price: '$199.99',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
    },
    {
      id: '5',
      name: 'Summer Dress',
      price: '$45.99',
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop'
    },
    {
      id: '6',
      name: 'Bluetooth Speaker',
      price: '$79.99',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'
    }
  ];

  // Sample Data
  const sampleOrders = [
    {
      id: '1001',
      date: '2024-01-15',
      total: '$84.98',
      items: ['Classic White T-Shirt', 'Summer Dress'],
      status: 'Delivered'
    }
  ];

  const samplePaymentMethods = [
    {
      id: '1',
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: '2', 
      type: 'paypal',
      email: 'santhush@trident.com',
      isDefault: false
    }
  ];

  const sampleAddresses = [
    {
      id: '1',
      name: 'Home',
      fullName: 'Santhush',
      street: '123 Main Street',
      city: 'Colombo',
      state: 'WP',
      zipCode: '00001',
      country: 'Sri Lanka',
      phone: '+94 45 254 1245',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      fullName: 'Santhush',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY', 
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ];

  // Login Function
  const handleLogin = () => {
    if (email === 'santhush@trident.com' && password === 'password') {
      setCurrentScreen('home');
      setOrders(sampleOrders);
      setPaymentMethods(samplePaymentMethods);
      setShippingAddresses(sampleAddresses);
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Error', 'Invalid email or password.');
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
    
    // Check if user has payment methods and addresses
    if (paymentMethods.length === 0) {
      Alert.alert('Payment Required', 'Please add a payment method first');
      setCurrentScreen('payment');
      return;
    }

    if (shippingAddresses.length === 0) {
      Alert.alert('Address Required', 'Please add a shipping address first');
      setCurrentScreen('shipping');
      return;
    }
    
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price;
    }, 0);
    
    const defaultAddress = shippingAddresses.find(addr => addr.isDefault);
    const defaultPayment = paymentMethods.find(pay => pay.isDefault);
    
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      total: `$${total.toFixed(2)}`,
      items: cart.map(item => item.name),
      status: 'Processing',
      shippingAddress: defaultAddress,
      paymentMethod: defaultPayment
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    Alert.alert('Order Placed!', `Your order #${newOrder.id} has been placed successfully!\n\nShipping to: ${defaultAddress.street}, ${defaultAddress.city}\nPayment: ${defaultPayment.brand || defaultPayment.type} ${defaultPayment.last4 || ''}`);
  };

  // Add New Payment Method
  const addPaymentMethod = () => {
    const newPayment = {
      id: Date.now().toString(),
      type: 'credit_card',
      last4: '1234',
      brand: 'MasterCard',
      expiry: '06/26',
      isDefault: paymentMethods.length === 0
    };
    setPaymentMethods([...paymentMethods, newPayment]);
    Alert.alert('Success', 'New payment method added!');
  };

  // Add New Shipping Address
  const addShippingAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      name: 'Santhush',
      fullName: 'Santhush Karthigeshan',
      street: 'bambalapittiya',
      city: 'Colombo',
      state: 'WP',
      zipCode: '00001',
      country: 'Sri Lanka',
      phone: '+94 76 805 6560',
      isDefault: shippingAddresses.length === 0
    };
    setShippingAddresses([...shippingAddresses, newAddress]);
    Alert.alert('Success', 'New shipping address added!');
  };

  // Set Default Payment Method
  const setDefaultPayment = (paymentId) => {
    const updatedPayments = paymentMethods.map(payment => ({
      ...payment,
      isDefault: payment.id === paymentId
    }));
    setPaymentMethods(updatedPayments);
    Alert.alert('Success', 'Default payment method updated!');
  };

  // Set Default Shipping Address
  const setDefaultAddress = (addressId) => {
    const updatedAddresses = shippingAddresses.map(address => ({
      ...address,
      isDefault: address.id === addressId
    }));
    setShippingAddresses(updatedAddresses);
    Alert.alert('Success', 'Default shipping address updated!');
  };

  // Logout Function
  const handleLogout = () => {
    setCurrentScreen('login');
    setCart([]);
    setOrders([]);
    setPaymentMethods([]);
    setShippingAddresses([]);
  };

  // Custom Logo Component
  const CustomLogo = ({ size = 'large' }) => {
    const isLarge = size === 'large';
    
    return (
      <View style={[styles.logoContainer, isLarge ? styles.largeLogo : styles.smallLogo]}>
        <Text style={[styles.logoMainText, isLarge && styles.largeMainText]}>TRIDENT FASHION🔱</Text>
        <Text style={[styles.logoSubText, isLarge && styles.largeSubText]}>SINCE 2025</Text>
        <Text style={[styles.logoOwnerText, isLarge && styles.largeOwnerText]}>SANTHUSH</Text>
      </View>
    );
  };

  // Payment Methods Screen
  const PaymentMethodsScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('account')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <TouchableOpacity onPress={addPaymentMethod}>
            <Text style={styles.addButton}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.paymentContainer} showsVerticalScrollIndicator={false}>
          {paymentMethods.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No payment methods yet</Text>
              <TouchableOpacity style={styles.addFirstButton} onPress={addPaymentMethod}>
                <Text style={styles.addFirstButtonText}>Add Payment Method</Text>
              </TouchableOpacity>
            </View>
          ) : (
            paymentMethods.map((payment) => (
              <View key={payment.id} style={[
                styles.paymentCard,
                payment.isDefault && styles.defaultCard
              ]}>
                <View style={styles.paymentHeader}>
                  <View style={styles.paymentInfo}>
                    {payment.type === 'credit_card' ? (
                      <>
                        <Text style={styles.paymentBrand}>{payment.brand}</Text>
                        <Text style={styles.paymentNumber}>**** **** **** {payment.last4}</Text>
                        <Text style={styles.paymentExpiry}>Expires {payment.expiry}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.paymentBrand}>PayPal</Text>
                        <Text style={styles.paymentNumber}>{payment.email}</Text>
                      </>
                    )}
                  </View>
                  {payment.isDefault ? (
                    <Text style={styles.defaultBadge}>DEFAULT</Text>
                  ) : (
                    <TouchableOpacity 
                      style={styles.setDefaultButton}
                      onPress={() => setDefaultPayment(payment.id)}
                    >
                      <Text style={styles.setDefaultText}>Set Default</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  // Shipping Addresses Screen
  const ShippingAddressScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('account')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shipping Addresses</Text>
          <TouchableOpacity onPress={addShippingAddress}>
            <Text style={styles.addButton}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.shippingContainer} showsVerticalScrollIndicator={false}>
          {shippingAddresses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No shipping addresses yet</Text>
              <TouchableOpacity style={styles.addFirstButton} onPress={addShippingAddress}>
                <Text style={styles.addFirstButtonText}>Add Shipping Address</Text>
              </TouchableOpacity>
            </View>
          ) : (
            shippingAddresses.map((address) => (
              <View key={address.id} style={[
                styles.addressCard,
                address.isDefault && styles.defaultCard
              ]}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressName}>{address.name}</Text>
                  {address.isDefault && <Text style={styles.defaultBadge}>DEFAULT</Text>}
                </View>
                
                <Text style={styles.addressText}>{address.fullName}</Text>
                <Text style={styles.addressText}>{address.street}</Text>
                <Text style={styles.addressText}>{address.city}, {address.state} {address.zipCode}</Text>
                <Text style={styles.addressText}>{address.country}</Text>
                <Text style={styles.addressPhone}>{address.phone}</Text>
                
                <View style={styles.addressActions}>
                  {!address.isDefault && (
                    <TouchableOpacity 
                      style={styles.setDefaultButton}
                      onPress={() => setDefaultAddress(address.id)}
                    >
                      <Text style={styles.setDefaultText}>Set Default</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  // Login Screen Component
  const LoginScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.loginHeader}>
              <CustomLogo size="large" />
              <Text style={styles.appTagline}>Premium Fashion & Electronics</Text>
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
                autoComplete="email"
                returnKeyType="next"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              
              <Text style={styles.demoText}>
                ⚙️Powered By : Santhush_Tech💻
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  // Home Screen Component
  const HomeScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <CustomLogo size="small" />
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => setCurrentScreen('cart')}>
              <Text style={styles.icon}>🛒 ({cart.length})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentScreen('account')}>
              <Text style={styles.icon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
    </SafeAreaView>
  );

  // Cart Screen Component
  const CartScreen = () => {
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('home')}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Shopping Cart</Text>
            <View style={styles.headerIcons}></View>
          </View>

          <ScrollView style={styles.cartContainer} showsVerticalScrollIndicator={false}>
            {cart.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your cart is empty</Text>
              </View>
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
                  
                  {/* Payment & Shipping Info */}
                  {paymentMethods.length > 0 && shippingAddresses.length > 0 && (
                    <View style={styles.checkoutInfo}>
                      <Text style={styles.checkoutInfoText}>
                        Payment: {paymentMethods.find(p => p.isDefault)?.brand || 'PayPal'} • 
                        Shipping: {shippingAddresses.find(a => a.isDefault)?.city}
                      </Text>
                    </View>
                  )}
                  
                  <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  // Orders Screen Component
  const OrdersScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
          <View style={styles.headerIcons}></View>
        </View>

        <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
          {orders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No orders yet</Text>
            </View>
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
                {order.shippingAddress && (
                  <Text style={styles.orderAddress}>
                    Shipping: {order.shippingAddress.street}, {order.shippingAddress.city}
                  </Text>
                )}
                <Text style={styles.orderTotal}>Total: {order.total}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  // Messages Screen Component
  const MessagesScreen = () => {
    const messages = [
      {
        id: '1',
        sender: 'TRIDENT Support',
        text: 'Welcome to TRIDENT! How can we help you today?',
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setCurrentScreen('home')}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Messages</Text>
            <View style={styles.headerIcons}></View>
          </View>

          <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
            {messages.map((message) => (
              <View key={message.id} style={styles.messageCard}>
                <Text style={styles.messageSender}>{message.sender}</Text>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  // Account Screen Component
  const AccountScreen = () => (
    <SafeAreaView style={styles.safeArea}>
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

        <ScrollView style={styles.accountContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <CustomLogo size="large" />
            <Text style={styles.userName}>Santhush</Text>
            <Text style={styles.userEmail}>santhush@trident.com</Text>
          </View>

          <View style={styles.accountMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Personal Information</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentScreen('orders')}>
              <Text style={styles.menuText}>Order History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentScreen('payment')}>
              <Text style={styles.menuText}>Payment Methods ({paymentMethods.length})</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentScreen('shipping')}>
              <Text style={styles.menuText}>Shipping Addresses ({shippingAddresses.length})</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentScreen('messages')}>
              <Text style={styles.menuText}>Customer Support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    case 'payment':
      return <PaymentMethodsScreen />;
    case 'shipping':
      return <ShippingAddressScreen />;
    default:
      return <LoginScreen />;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  // Custom Logo Styles
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  largeLogo: {
    marginTop: 20,
    marginBottom: 20,
  },
  smallLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 2,
  },
  largeMainText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 4,
  },
  logoSubText: {
    fontSize: 10,
    color: '#7f8c8d',
    marginTop: 2,
    letterSpacing: 1,
  },
  largeSubText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
    letterSpacing: 2,
  },
  logoOwnerText: {
    fontSize: 8,
    color: '#e74c3c',
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 1,
  },
  largeOwnerText: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: '600',
    marginTop: 5,
    letterSpacing: 1.5,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appTagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
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
    marginTop: 0,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
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
  addButton: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  // Login Styles
  loginForm: {
    paddingHorizontal: 30,
    marginTop: 10,
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
  content: {
    flex: 1,
    marginTop: 0,
  },
  // Product Styles
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    color: '#333',
    marginTop: 0,
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
    width: 120,
    height: 120,
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
    width: 80,
    height: 80,
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
  checkoutInfo: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  checkoutInfoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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
  orderAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontStyle: 'italic',
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
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
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
  // Payment Methods Styles
  paymentContainer: {
    flex: 1,
    padding: 15,
  },
  paymentCard: {
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
  defaultCard: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paymentNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  paymentExpiry: {
    fontSize: 12,
    color: '#999',
  },
  defaultBadge: {
    backgroundColor: '#4A90E2',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  setDefaultButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  setDefaultText: {
    fontSize: 12,
    color: '#666',
  },
  // Shipping Address Styles
  shippingContainer: {
    flex: 1,
    padding: 15,
  },
  addressCard: {
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  editButtonText: {
    fontSize: 12,
    color: '#666',
  },
  // Common Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addFirstButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});