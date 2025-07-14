import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Phone, Video, MoreVertical, Send, Smile, Paperclip } from "lucide-react";

interface ChatScreenProps {
  onNavigate: (screen: string) => void;
}

export const ChatScreen = ({ onNavigate }: ChatScreenProps) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Ana Silva",
      lastMessage: "Adorei sua playlist! 🎵",
      time: "14:30",
      unread: 2,
      isOnline: true,
      avatar: "AS"
    },
    {
      id: 2,
      name: "Carlos Oliveira", 
      lastMessage: "Que tal aquele café amanhã?",
      time: "12:15",
      unread: 0,
      isOnline: false,
      avatar: "CO"
    },
    {
      id: 3,
      name: "Maria Santos",
      lastMessage: "Você está vendo? 😄",
      time: "10:45",
      unread: 1,
      isOnline: true,
      avatar: "MS"
    },
    {
      id: 4,
      name: "Julia Costa",
      lastMessage: "Obrigada pela dica do livro!",
      time: "Ontem",
      unread: 0,
      isOnline: false,
      avatar: "JC"
    }
  ];

  const messages = [
    { id: 1, text: "Oi! Tudo bem?", sent: false, time: "14:25" },
    { id: 2, text: "Oi! Tudo ótimo e você?", sent: true, time: "14:27" },
    { id: 3, text: "Adorei sua playlist! 🎵", sent: false, time: "14:30" },
    { id: 4, text: "Que bom que gostou! Também amo música", sent: true, time: "14:32" }
  ];

  const sendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  if (selectedChat) {
    const currentChat = conversations.find(c => c.id === selectedChat);
    
    return (
      <div className="min-h-screen bg-gradient-warm flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-card/90 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)}>
              ←
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-romantic text-white">
                {currentChat?.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{currentChat?.name}</h2>
              <p className="text-sm text-muted-foreground">
                {currentChat?.isOnline ? "online" : "visto por último às 12:30"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sent
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-card text-card-foreground rounded-bl-sm shadow-soft'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-card/90 backdrop-blur-sm border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Escreva uma mensagem..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="pr-10"
              />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              variant="romantic" 
              size="icon"
              onClick={sendMessage}
              disabled={!messageInput.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header */}
      <div className="p-4 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">
            Conversas
          </h1>
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Online Status */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            {conversations.filter(c => c.isOnline).length} pessoas online
          </span>
        </div>
      </div>

      {/* Conversations */}
      <div className="px-4 space-y-2">
        {conversations.map((conversation) => (
          <Card 
            key={conversation.id} 
            className="shadow-soft border-0 cursor-pointer hover:shadow-romantic transition-all"
            onClick={() => setSelectedChat(conversation.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-romantic text-white">
                      {conversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                {conversation.unread > 0 && (
                  <Badge variant="default" className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State or Load More */}
      <div className="p-4 mt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Comece uma conversa com alguém especial
          </p>
          <Button variant="outline" onClick={() => onNavigate('explore')}>
            Explorar Pessoas
          </Button>
        </div>
      </div>
    </div>
  );
};