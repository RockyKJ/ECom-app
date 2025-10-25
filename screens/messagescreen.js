import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const MessagesScreen = ({ onNavigate }) => {
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
        <TouchableOpacity onPress={() => onNavigate('home')}>
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
});

export default MessagesScreen;