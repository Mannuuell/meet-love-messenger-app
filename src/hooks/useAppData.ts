import { useState, useEffect } from 'react';

export interface Suggestion {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  compatibility: string;
  distance: string;
  photos: string[];
  isOnline: boolean;
  lastSeen?: string;
}

export interface Favorite {
  id: string;
  userId: string;
  targetUserId: string;
  addedAt: string;
}

export interface Follow {
  id: string;
  userId: string;
  targetUserId: string;
  followedAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'audio';
  timestamp: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  updatedAt: string;
}

export const useAppData = (userId?: string) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [follows, setFollows] = useState<Follow[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Load data on mount
  useEffect(() => {
    loadSuggestions();
    if (userId) {
      loadFavorites(userId);
      loadFollows(userId);
      loadChats(userId);
      loadMessages();
    }
  }, [userId]);

  const loadSuggestions = () => {
    // Generate realistic suggestions
    const mockSuggestions: Suggestion[] = [
      {
        id: 'user_1',
        name: 'Ana Silva',
        age: 28,
        location: 'São Paulo, SP',
        bio: 'Apaixonada por viagens e café. Adoro descobrir novos lugares e culturas. Sempre em busca de novas aventuras!',
        interests: ['Viajar', 'Café', 'Fotografia', 'Livros'],
        compatibility: 'Alta afinidade',
        distance: '2 km',
        photos: [],
        isOnline: true
      },
      {
        id: 'user_2',
        name: 'Carlos Oliveira',
        age: 32,
        location: 'Rio de Janeiro, RJ',
        bio: 'Músico e chef nas horas vagas. Sempre em busca de novas experiências culinárias e musicais.',
        interests: ['Música', 'Culinária', 'Arte', 'Cinema'],
        compatibility: 'Boa afinidade',
        distance: '5 km',
        photos: [],
        isOnline: false,
        lastSeen: '2 horas atrás'
      },
      {
        id: 'user_3',
        name: 'Maria Santos',
        age: 26,
        location: 'Belo Horizonte, MG',
        bio: 'Desenvolvedora, yoga e natureza. Acredito em conexões autênticas e relacionamentos verdadeiros.',
        interests: ['Tecnologia', 'Yoga', 'Natureza', 'Meditação'],
        compatibility: 'Muito compatível',
        distance: '1 km',
        photos: [],
        isOnline: true
      },
      {
        id: 'user_4',
        name: 'Pedro Costa',
        age: 30,
        location: 'Salvador, BA',
        bio: 'Advogado e surfista. Amo o mar e atividades ao ar livre. Procuro alguém que compartilhe essa paixão.',
        interests: ['Surf', 'Direito', 'Praia', 'Esportes'],
        compatibility: 'Boa afinidade',
        distance: '3 km',
        photos: [],
        isOnline: false,
        lastSeen: '1 dia atrás'
      },
      {
        id: 'user_5',
        name: 'Julia Mendes',
        age: 24,
        location: 'Brasília, DF',
        bio: 'Artista e professora. Adoro pintar e ensinar. Procuro alguém criativo e que valorize a arte.',
        interests: ['Arte', 'Pintura', 'Educação', 'Música'],
        compatibility: 'Alta afinidade',
        distance: '4 km',
        photos: [],
        isOnline: true
      },
      {
        id: 'user_6',
        name: 'Rafael Lima',
        age: 29,
        location: 'Fortaleza, CE',
        bio: 'Engenheiro e fotógrafo. Amo capturar momentos especiais e criar soluções inovadoras.',
        interests: ['Engenharia', 'Fotografia', 'Tecnologia', 'Viagem'],
        compatibility: 'Muito compatível',
        distance: '6 km',
        photos: [],
        isOnline: false,
        lastSeen: '3 horas atrás'
      }
    ];

    setSuggestions(mockSuggestions);
  };

  const loadFavorites = (userId: string) => {
    const stored = localStorage.getItem('meetlove_favorites');
    if (stored) {
      const allFavorites = JSON.parse(stored);
      setFavorites(allFavorites.filter((f: Favorite) => f.userId === userId));
    }
  };

  const loadFollows = (userId: string) => {
    const stored = localStorage.getItem('meetlove_follows');
    if (stored) {
      const allFollows = JSON.parse(stored);
      setFollows(allFollows.filter((f: Follow) => f.userId === userId));
    }
  };

  const loadChats = (userId: string) => {
    const stored = localStorage.getItem('meetlove_chats');
    if (stored) {
      const allChats = JSON.parse(stored);
      setChats(allChats.filter((c: Chat) => c.participants.includes(userId)));
    }
  };

  const loadMessages = () => {
    const stored = localStorage.getItem('meetlove_messages');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  };

  const addToFavorites = (targetUserId: string): boolean => {
    if (!userId) return false;

    try {
      const newFavorite: Favorite = {
        id: `fav_${Date.now()}`,
        userId,
        targetUserId,
        addedAt: new Date().toISOString()
      };

      const allFavorites = JSON.parse(localStorage.getItem('meetlove_favorites') || '[]');
      
      // Check if already favorited
      const exists = allFavorites.some((f: Favorite) => 
        f.userId === userId && f.targetUserId === targetUserId
      );

      if (exists) return false;

      allFavorites.push(newFavorite);
      localStorage.setItem('meetlove_favorites', JSON.stringify(allFavorites));
      
      setFavorites(prev => [...prev, newFavorite]);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  };

  const removeFromFavorites = (targetUserId: string): boolean => {
    if (!userId) return false;

    try {
      const allFavorites = JSON.parse(localStorage.getItem('meetlove_favorites') || '[]');
      const filtered = allFavorites.filter((f: Favorite) => 
        !(f.userId === userId && f.targetUserId === targetUserId)
      );

      localStorage.setItem('meetlove_favorites', JSON.stringify(filtered));
      setFavorites(prev => prev.filter(f => f.targetUserId !== targetUserId));
      
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  };

  const followUser = (targetUserId: string): boolean => {
    if (!userId) return false;

    try {
      const newFollow: Follow = {
        id: `follow_${Date.now()}`,
        userId,
        targetUserId,
        followedAt: new Date().toISOString()
      };

      const allFollows = JSON.parse(localStorage.getItem('meetlove_follows') || '[]');
      
      // Check if already following
      const exists = allFollows.some((f: Follow) => 
        f.userId === userId && f.targetUserId === targetUserId
      );

      if (exists) return false;

      allFollows.push(newFollow);
      localStorage.setItem('meetlove_follows', JSON.stringify(allFollows));
      
      setFollows(prev => [...prev, newFollow]);
      return true;
    } catch (error) {
      console.error('Error following user:', error);
      return false;
    }
  };

  const unfollowUser = (targetUserId: string): boolean => {
    if (!userId) return false;

    try {
      const allFollows = JSON.parse(localStorage.getItem('meetlove_follows') || '[]');
      const filtered = allFollows.filter((f: Follow) => 
        !(f.userId === userId && f.targetUserId === targetUserId)
      );

      localStorage.setItem('meetlove_follows', JSON.stringify(filtered));
      setFollows(prev => prev.filter(f => f.targetUserId !== targetUserId));
      
      return true;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return false;
    }
  };

  const sendMessage = (chatId: string, content: string, type: 'text' | 'image' | 'audio' = 'text'): boolean => {
    if (!userId) return false;

    try {
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        chatId,
        senderId: userId,
        content,
        type,
        timestamp: new Date().toISOString(),
        isRead: false
      };

      const allMessages = JSON.parse(localStorage.getItem('meetlove_messages') || '[]');
      allMessages.push(newMessage);
      localStorage.setItem('meetlove_messages', JSON.stringify(allMessages));

      setMessages(prev => [...prev, newMessage]);

      // Update chat's last message
      const allChats = JSON.parse(localStorage.getItem('meetlove_chats') || '[]');
      const chatIndex = allChats.findIndex((c: Chat) => c.id === chatId);
      
      if (chatIndex !== -1) {
        allChats[chatIndex].lastMessage = newMessage;
        allChats[chatIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('meetlove_chats', JSON.stringify(allChats));
        setChats(prev => prev.map(c => c.id === chatId ? allChats[chatIndex] : c));
      }

      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };

  const createChat = (targetUserId: string): string | null => {
    if (!userId) return null;

    try {
      const chatId = `chat_${Date.now()}`;
      const newChat: Chat = {
        id: chatId,
        participants: [userId, targetUserId],
        updatedAt: new Date().toISOString()
      };

      const allChats = JSON.parse(localStorage.getItem('meetlove_chats') || '[]');
      
      // Check if chat already exists
      const existingChat = allChats.find((c: Chat) => 
        c.participants.includes(userId) && c.participants.includes(targetUserId)
      );

      if (existingChat) return existingChat.id;

      allChats.push(newChat);
      localStorage.setItem('meetlove_chats', JSON.stringify(allChats));
      
      setChats(prev => [...prev, newChat]);
      return chatId;
    } catch (error) {
      console.error('Error creating chat:', error);
      return null;
    }
  };

  const getChatMessages = (chatId: string): ChatMessage[] => {
    return messages.filter(m => m.chatId === chatId).sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };

  const getFavoriteUsers = (): Suggestion[] => {
    const favoriteIds = favorites.map(f => f.targetUserId);
    return suggestions.filter(s => favoriteIds.includes(s.id));
  };

  const isUserFavorited = (targetUserId: string): boolean => {
    return favorites.some(f => f.targetUserId === targetUserId);
  };

  const isUserFollowed = (targetUserId: string): boolean => {
    return follows.some(f => f.targetUserId === targetUserId);
  };

  return {
    suggestions,
    favorites,
    follows,
    chats,
    messages,
    addToFavorites,
    removeFromFavorites,
    followUser,
    unfollowUser,
    sendMessage,
    createChat,
    getChatMessages,
    getFavoriteUsers,
    isUserFavorited,
    isUserFollowed
  };
};