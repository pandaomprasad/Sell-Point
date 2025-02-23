// ChatScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs for relative time

dayjs.extend(relativeTime);

// Type the route props

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const { productName, productId } = route.params;

  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: `Hi! I’m interested in the ${productName} priced at $${productId}.`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Buyer',
      },
    },
  ]);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name: 'You',
        }}
        renderUsernameOnMessage={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Added dayjs for date handling and enabled renderUsernameOnMessage to avoid the getLocale error! Let me know if you need more changes! 🚀
