import { Card, messagePayload } from "../../types/room";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { io } from "socket.io-client";

export const socket = io("http://51.83.42.138:9001");

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
  setError: () => {},
  setTurn: () => {},
  setRoomValue: () => {},
  setParticipants: () => {},
  setRoomName: () => {},
  setMessages: () => {},
  setPlayerCards: () => {},
  setPile: () => {},
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
  const [pile, setPile] = useState<Card[]>([]);

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
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
}
