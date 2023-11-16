import {Card,} from "../../types/room";
import { useContext} from "react";
import { WebsocketContext, socket } from "../../context/websocket/WebSocketContext";

export const GamePage = () => {
  const context = useContext(WebsocketContext);

  const playCard = (card: Card) => {
    console.log("Sending playCard event to the server");
    console.log("Pile before emitting playCard:", context.pile);
    socket.emit('playCard', { card, room: context.roomName, lastCard: context.pile[context.pile.length - 1], playerHand: context.playerCards[socket.id]});
  };

  const handleDraw = () => {
    console.log("Sending drawCard event to the server");
    socket.emit('drawCard', { room: context.roomName, playerId: socket.id });
  };

  return (
      <div className="h-screen bg-background">
        <div>
          <h1>Websocket component</h1>
          <div>
            {context.error ? (
              <div>{ context.error }</div>
            ) : (
              <div>
                Participants in room: {Object.values(context.participants).join(", ")} - {Object.values(context.participants).length}/4
                {context.turn && <div>Turn: {context.turn}</div>}
                {context.turn === socket.id && <div><b>It's your turn to play!</b></div>}
                {Object.values(context.pile).length > 0 && (
                  <div>
                    Pile: {Object.values(context.pile).length}
                      <div  className="flex rounded-lg h-48 w-32 m-6 border bg-white">
                          <div className="rounded-lg h-40  w-24 mt-4 ml-4 p-4" style={{ backgroundColor: (context.pile)[context.pile.length-1].color }}> <div className="h-full mx-auto bg-white" style={{borderRadius:'70% 30% 68% 32% / 71% 26% 74% 29%'}}>{context.pile[context.pile.length-1].value}</div> </div>
                      </div>
                    
                    <button onClick={handleDraw}>Piocher</button>
                  </div>
                )}
                {context.playerCards[socket.id ] && (
                  <div>
                      Your Cards: 
                      <div className="flex">
                      {context.playerCards[socket.id].map((card, index) => (
                      <div key={index}  
                            onClick={() => playCard(card)}
                            className="flex rounded-lg h-48 w-32 m-6 border bg-white hover:-translate-y-8 transition duration-500 ease-in-out">
                          <div className="rounded-lg h-40  w-24 mt-4 ml-4 p-4" style={{ backgroundColor: card.color }}> <div className="h-full mx-auto bg-white" style={{borderRadius:'70% 30% 68% 32% / 71% 26% 74% 29%'}}>{card.value}</div> </div>
                      </div>
                      ))}
                      </div>
                  </div>
                  )}
                {Object.keys(context.playerCards).map((player) => (
                  <div key={player}>
                    {player !== socket.id && (
                      <div>
                        {player}'s Cards: {context.playerCards[player].length}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {context.messages.length === 0 ? (
              <div>No messages</div>
            ) : (
              <div>
                {context.messages.map((message, index) => (
                  <div key={index} style={message.clientId === "SERVER" ? { color: "gray", fontStyle: "italic" } : {}}>
                    [{message.clientId}] {message.content.text}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* {roomName === "" ? (
            <div>
              <button onClick={onCreateRoom}>Create room</button>
              <div>
                <input type="text" value={roomValue} onChange={(e) => setRoomValue(e.target.value)} />
                <button onClick={onJoinRoom}>Join room</button>
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => socket.emit("disconnect")}>Leave room</button>
            </div>
          )}
          {roomName === "" ? (
            <div>No room joined</div>
          ) : (
            <div>
              <div>Room name: {roomName}</div>
            </div>
          )} */}
        </div>
    </div>
  );
};

export default GamePage;
