import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

const PaymentMethodsScreen = ({ navigateTo, paymentMethods, addPaymentMethod, setDefaultPayment }) => {
  const handleAddPayment = () => {
    addPaymentMethod();
    Alert.alert('Success', 'New payment method added!');
  };

  const handleSetDefault = (paymentId) => {
    setDefaultPayment(paymentId);
    Alert.alert('Success', 'Default payment method updated!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('account')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity onPress={handleAddPayment}>
          <Text style={styles.addButton}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.paymentContainer} showsVerticalScrollIndicator={false}>
        {paymentMethods.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No payment methods yet</Text>
            <TouchableOpacity style={styles.addFirstButton} onPress={handleAddPayment}>
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
                  <Text style={styles.paymentBrand}>{payment.brand}</Text>
                  <Text style={styles.paymentNumber}>**** **** **** {payment.last4}</Text>
                  <Text style={styles.paymentExpiry}>Expires {payment.expiry}</Text>
                </View>
                {payment.isDefault ? (
                  <Text style={styles.defaultBadge}>DEFAULT</Text>
                ) : (
                  <TouchableOpacity 
                    style={styles.setDefaultButton}
                    onPress={() => handleSetDefault(payment.id)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
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
  backButton: {
    fontSize: 16,
    color: '#4A90E2',
  },
  addButton: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
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
});

export default PaymentMethodsScreen;