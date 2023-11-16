import { useContext, useEffect } from 'react';
import '../assets/css/button.scss'
import { Menu } from './menu';
import { WebsocketContext, socket } from '../context/websocket/WebSocketContext';
import { messagePayload, RoomPayload, cardsPayload, gamePayload, playCardPayload, Card } from '../types/room';

interface Props {}

export const LobbyMenu: React.FC<Props> = () => {
  const context = useContext(WebsocketContext);



  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("onRoomCreated", (room: RoomPayload) => {
      console.log("roomCreated event received");
      console.log(room);
      context.setRoomName(room.room);
      context.setParticipants(room.participants);
      context.setPlayerCards({}); // Initialize player cards when the room is created
    });

    socket.on("onRoomJoined", (room: RoomPayload) => {
      console.log("roomJoined event received");
      console.log(room);
      context.setRoomName(room.room);
      context.setParticipants(room.participants);
      context.setPlayerCards(room.playerCards || {}); // Ensure playerCards is initialized
    });

    socket.on("onParticipantUpdate", (room: RoomPayload) => {
      console.log("updateParticipants event received");
      console.log(room);
      context.setParticipants(room.participants);
    });

    socket.on("onRoomJoinFailed", (room: RoomPayload) => {
      console.log("roomJoinFailed event received");
      console.log(room);
      context.setError(room.msg);
    });

  }, [context]);



 return(

  <Menu children={
    <div className="flex font-font gap-[5px] p-[10px] h-full">
      <div className="flex flex-col flex-1">
        <h3 className="m-[10px] font-bold text-center text-[20px]">PARTICIPANTS - {context.participants.length}/4</h3>
        <div className="flex-1 bg-grey">
          {context.participants.map((i:any) =>(
            <div className="flex flex-col flex-1">
              <h3 className="m-[10px] font-bold text-center text-[20px]">{context.participants[i]}</h3>
            </div>
          ))}
        </div>
        <div className="flex font-font flex-col flex-1 pt-[35px]">
          <button className="button bg-orange text-[20px]">INVITER</button>
          <button className="button bg-orange text-[20px]">PARAMETRES</button>
          <button className="button bg-orange text-[20px] mt-[95px] sm:mt-[215px] md:mt-[195px] xl:mt-[145px]">JOUER</button>
        </div>
      </div>
    </div>
  }/>
)};
