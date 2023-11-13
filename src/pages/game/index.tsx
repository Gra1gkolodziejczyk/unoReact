import {
  Card,
  RoomPayload,
  cardsPayload,
  messagePayload,
  playCardPayload,
} from "../../types/room";
import { useContext, useEffect, useState } from "react";

import { WebsocketContext } from "../../context/websocket/WebSocketContext";

export const GamePage = () => {
  const [error, setError] = useState("");
  const [turn, setTurn] = useState("");
  const [roomValue, setRoomValue] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState<messagePayload[]>([]);
  const [playerCards, setPlayerCards] = useState<Record<string, Card[]>>({});
  const [pile, setPile] = useState<Card[]>([]);
  const socket = useContext(WebsocketContext);

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
    });

    socket.on("onTurnUpdate", (room: RoomPayload) => {
      console.log("Turn updated:", room.turn);
      setTurn(room.turn);
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

    socket.on("onGameStart", (pile: cardsPayload) => {
      console.log("gameStart event received");
      console.log(pile);
      setPile(pile.cards);
    });

    return () => {
      console.log("disconnecting");
      socket.off("connect");
      socket.off("onMessage");
      socket.off("onRoomCreated");
      socket.off("onRoomJoined");
      socket.off("onParticipantUpdate");
      socket.off("onRoomJoinFailed");
      socket.off("onCardsDistributed");
      socket.off("onCardPlayed");
      socket.off("onGameStart");
      socket.off("disconnect");
    };
  }, [socket]);

  const onCreateRoom = () => {
    socket.emit("createRoom");
  };

  const onJoinRoom = () => {
    socket.emit("joinRoom", roomValue);
    setRoomValue("");
  };

  const playCard = (card: Card) => {
    console.log("Sending playCard event to the server");
    console.log("Pile before emitting playCard:", pile);
    socket.emit("playCard", {
      card,
      room: roomName,
      lastCard: pile[pile.length - 1],
    });
  };

  return (
    <div>
      <div>
        <h1>Websocket component</h1>
        <div>
          {error !== "" ? (
            <div>{error}</div>
          ) : (
            <div>
              Participants in room: {participants.join(", ")} -{" "}
              {participants.length}/4
              {turn && <div>Turn: {turn}</div>}
              {turn === socket.id && (
                <div>
                  <b>It's your turn to play!</b>
                </div>
              )}
              {pile.length > 0 && (
                <div>
                  Pile: {pile.length}
                  {pile.map((card, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid black",
                        margin: "10px",
                        padding: "10px",
                        backgroundColor: card.color,
                      }}
                    >
                      {card.value}
                    </div>
                  ))}
                </div>
              )}
              {playerCards[socket.id] && (
                <div>
                  Your Cards:
                  {playerCards[socket.id].map((card, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid black",
                        margin: "10px",
                        padding: "10px",
                        backgroundColor: card.color,
                      }}
                    >
                      {card.value}
                      <button onClick={() => playCard(card)}>Play</button>
                    </div>
                  ))}
                </div>
              )}
              {Object.keys(playerCards).map((player) => (
                <div key={player}>
                  {player !== socket.id && (
                    <div>
                      {player}'s Cards: {playerCards[player].length}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {messages.length === 0 ? (
            <div>No messages</div>
          ) : (
            <div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={
                    message.clientId === "SERVER"
                      ? { color: "gray", fontStyle: "italic" }
                      : {}
                  }
                >
                  [{message.clientId}] {message.content.text}
                </div>
              ))}
            </div>
          )}
        </div>
        {roomName === "" ? (
          <div>
            <button onClick={onCreateRoom}>Create room</button>
            <div>
              <input
                type="text"
                value={roomValue}
                onChange={(e) => setRoomValue(e.target.value)}
              />
              <button onClick={onJoinRoom}>Join room</button>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => socket.emit("disconnect")}>
              Leave room
            </button>
          </div>
        )}
        {roomName === "" ? (
          <div>No room joined</div>
        ) : (
          <div>
            <div>Room name: {roomName}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
