import { Card, RoomPayload, cardsPayload, gamePayload, messagePayload, playCardPayload } from "../../types/room";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";

export const socket = io("http://localhost:9000");

type WebSocketProviderType = {
  children: ReactNode;
};

export interface WebSocketContextInterface {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  turn: string;
  setTurn: Dispatch<SetStateAction<string>>;
  roomValue: string;
  setRoomValue: Dispatch<SetStateAction<string>>;
  participants: string[];
  setParticipants: Dispatch<SetStateAction<string[]>>;
  roomName: string;
  setRoomName: Dispatch<SetStateAction<string>>;
  messages: messagePayload[];
  setMessages: Dispatch<SetStateAction<messagePayload[]>>;
  playerCards: Record<string, Card[]>;
  setPlayerCards: Dispatch<SetStateAction<Record<string, Card[]>>>;
  pile: Card[];
  setPile: Dispatch<SetStateAction<Card[]>>;
  playerHandLength: Record<string, number>;
  setPlayerHandLength: Dispatch<SetStateAction<Record<string, number>>>;
  gameStarted: boolean;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
}

export const defaultWebSocket = {
  error: "",
  turn: "",
  roomValue: "",
  participants: [""],
  roomName: "",
  messages: [],
  playerCards: {},
  pile: [],
  playerHandLength: {},
  gameStarted: false,
  setError: () => {},
  setTurn: () => {},
  setRoomValue: () => {},
  setParticipants: () => {},
  setRoomName: () => {},
  setMessages: () => {},
  setPlayerCards: () => {},
  setPile: () => {},
  setPlayerHandLength: () => {},
  setGameStarted: () => {},
} as WebSocketContextInterface;

export const WebsocketContext = createContext(defaultWebSocket);
export const WebsocketProvider = WebsocketContext.Provider;

export default function WebSocketsProvider({
  children,
}: WebSocketProviderType) {
  const [error, setError] = useState<string>("");
  const [turn, setTurn] = useState<string>("");
  const [roomValue, setRoomValue] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [messages, setMessages] = useState<messagePayload[]>([]);
  const [playerCards, setPlayerCards] = useState<Record<string, Card[]>>({});
  const [playerHandLength, setPlayerHandLength] = useState<Record<string, number>>({});
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [pile, setPile] = useState<Card[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("onMessage", (newMessage: messagePayload) => {
      console.log("onMessage event received");
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("onRoomCreated", (room: RoomPayload) => {
      console.log("roomCreated event received");
      console.log(room);
      setRoomName(room.room);
      setParticipants(room.participants);
      setPlayerCards({}); // Initialize player cards when the room is created
      setPlayerHandLength({}); // Initialize player hand length when the room is created
    });

    socket.on("onTurnUpdate", (room: RoomPayload) => {
      console.log("Turn updated:", room.turn);
      console.log(room);
    
      if (typeof room.playerHandLength === 'object' && room.playerHandLength !== null) {
        console.log("Received player hand length:", room.playerHandLength);
        setPlayerHandLength(room.playerHandLength);
      }     
      setTurn(room.turn);
      console.log("Player hand length:", { playerHandLength });
    });

    socket.on("onRoomJoined", (room: RoomPayload) => {
      console.log("roomJoined event received");
      console.log(room);
      setRoomName(room.room);
      setParticipants(room.participants);
      setPlayerCards(room.playerCards || {}); // Ensure playerCards is initialized
    });

    socket.on("onParticipantUpdate", (room: RoomPayload) => {
      console.log("updateParticipants event received");
      console.log(room);
      setParticipants(room.participants);
    });

    socket.on("onRoomJoinFailed", (room: RoomPayload) => {
      console.log("roomJoinFailed event received");
      console.log(room);
      setError(room.msg);
    });

    socket.on("onCardsDistributed", (cards: cardsPayload) => {
      console.log("cardsDistributed event received");
      console.log(cards);
      setPlayerCards((prev) => ({ ...prev, [socket.id]: cards.cards }));
    });

    socket.on("onGameEnd", (game: gamePayload) => {
      console.log("gameEnd event received");
      console.log(game);
      alert(`Game has ended. Winner: ${game.winner}`);
      setRoomName("");
      setParticipants([]);
      setPlayerCards({});
      setPile([]);
      setTurn("");
    });

    socket.on("onCardPlayed", (cards: playCardPayload) => {
      console.log("onCardPlayed event received");
      console.log(cards);
      // Add the card to the pile
      setPile((prev) => [...prev, cards.card]);
      if (cards.playerId === socket.id) {
        setPlayerCards((prev) => ({
          ...prev,
          [cards.playerId]: prev[cards.playerId].filter(
            (card) => card.id !== cards.card.id
          ),
        }));
      }
    });

    socket.on('onCardDrawn', (drawnCard: Card) => {
      console.log('onCardDrawn event received');
      console.log(drawnCard);
  
      // Update the player's hand and pile
      setPlayerCards((prev) => ({ ...prev, [socket.id]: [...prev[socket.id], drawnCard] }));
    });

    socket.on('onCardsDrawn', (cards: cardsPayload) => {
      console.log('onCardsDrawn event received');
      console.log(cards);
  
      // Update the player's hand and pile
      setPlayerCards((prev) => ({ ...prev, [socket.id]: [...prev[socket.id], ...cards.cards] }));
    });

    socket.on("onGameStart", (pile: cardsPayload) => {
      console.log("gameStart event received");
      console.log(pile);
      setPile(pile.cards);
      setPlayerHandLength(pile.playerHandLength);
      setGameStarted(true);
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
      socket.off("onRoomCreated");
      socket.off("onRoomJoined");
      socket.off("onParticipantUpdate");
      socket.off("onRoomJoinFailed");
      socket.off("onCardsDistributed");
      socket.off("onCardPlayed");
      socket.off("onGameStart");
      socket.off("onCardDrawn");
      socket.off("onCardsDrawn");
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    console.log("participants", participants)
  
  },[roomName, participants, playerCards, pile, messages, turn])

  return (
    <WebsocketContext.Provider
      value={{
        error,
        setError,
        turn,
        setTurn,
        roomValue,
        setRoomValue,
        participants,
        setParticipants,
        roomName,
        setRoomName,
        messages,
        setMessages,
        playerCards,
        setPlayerCards,
        pile,
        setPile,
        playerHandLength,
        setPlayerHandLength,
        gameStarted,
        setGameStarted,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}
