import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect, useRef, useState } from "react";
import {
   ActivityIndicator,
   FlatList,
   KeyboardAvoidingView,
   Platform,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import { api } from "../../convex/_generated/api";

export default function ChatScreen() {
  const messages = useQuery(api.input.getMessages);
  const addMessage = useMutation(api.input.addMessage);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList<{ _id: string; messageData: string; _creationTime?: number }> | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current && messages?.length) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);
    await addMessage({ messageData: input });
    setInput("");
    setSending(false);
  };

  const renderMessage = ({ item }: { item: { _id: string; messageData: string; _creationTime?: number } }) => {
    // For demo, treat all messages as 'received'.
    // If you have user info, compare item.userId === currentUserId
    const isSent = false; // Change this logic if you have user info
    return (
      <View
        style={[
          styles.messageContainer,
          isSent ? styles.sent : styles.received,
        ]}
      >
        <Text style={styles.messageText}>{item.messageData}</Text>
        {item._creationTime && (
          <Text style={styles.timestamp}>
            {new Date(item._creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        {messages === undefined ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No messages yet. Start the conversation!</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={renderMessage}
            inverted
            contentContainerStyle={{ paddingTop: 10 }}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            style={styles.input}
            placeholder="Type your message"
            placeholderTextColor="#aaa"
            editable={!sending}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={handleSend}
            style={[styles.sendButton, sending && { opacity: 0.6 }]}
            disabled={sending || !input.trim()}
          >
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7fa",
    paddingHorizontal: 10,
    paddingBottom: 6,
    justifyContent: "flex-end",
  },
  messageContainer: {
    maxWidth: "80%",
    marginBottom: 10,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
  },
  messageText: {
    color: "#222",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f2f2f7",
    borderRadius: 16,
    fontSize: 16,
    color: "#222",
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
    fontStyle: "italic",
  },
});
