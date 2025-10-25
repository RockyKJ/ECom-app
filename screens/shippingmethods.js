import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

const ShippingAddressScreen = ({ navigateTo, shippingAddresses, addShippingAddress, setDefaultAddress }) => {
  const handleAddAddress = () => {
    addShippingAddress();
    Alert.alert('Success', 'New shipping address added!');
  };

  const handleSetDefault = (addressId) => {
    setDefaultAddress(addressId);
    Alert.alert('Success', 'Default shipping address updated!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('account')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping Addresses</Text>
        <TouchableOpacity onPress={handleAddAddress}>
          <Text style={styles.addButton}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.shippingContainer} showsVerticalScrollIndicator={false}>
        {shippingAddresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shipping addresses yet</Text>
            <TouchableOpacity style={styles.addFirstButton} onPress={handleAddAddress}>
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
                    onPress={() => handleSetDefault(address.id)}
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
  defaultCard: {
    borderColor: '#4A90E2',
    borderWidth: 2,
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

export default ShippingAddressScreen;