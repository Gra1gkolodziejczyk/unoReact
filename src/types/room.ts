export type messagePayload = {
  content: {
    text: string;
    room: string;
  };
  msg: string;
  clientId: string;
};

export type RoomPayload = {
  msg: string;
  room: string;
  participants: string[];
  turn: string;
  playerCards: Record<string, Card[]>; // New property for player cards
  playerHandLength: Record<string, number>; // New property for player hand length
};

export type Card = {
  id: number;
  color: "red" | "blue" | "green" | "yellow"| string;
  value: string;
  effect: string;
};

export type cardsPayload = {
  cards: Card[];
  playerHandLength: Record<string, number>;
};

export type playCardPayload = {
  card: Card;
  playerId: string;
};

export type gamePayload = {
  msg: string;
  winner: string;
}