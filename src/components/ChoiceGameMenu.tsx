import {
  WebsocketContext,
  socket,
} from "../context/websocket/WebSocketContext";
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Modal from "./modal";
import { RoomPayload } from "../types/room";
import { Menu } from "./menu";

export const  ChoiceGameMenu = () => {
  const [open, setOpen] = useState(false);

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

  const onCreateRoom = () => {
    socket.emit("createRoom");
  };

  const onJoinRoom = () => {
    socket.emit("joinRoom", context.roomName);
  };


  return (
    <Menu children={
      <>
        <div className="flex flex-col items-center pt-20">
          <button className="font-font italic font-black w-[500px] h-[100px] bg-gradient-to-b from-orange to-orange-clear uppercase text-3xl m-5 cursor-pointer text-white rounded-lg hover:bg-gradient-to-r"
            onClick={() => onCreateRoom()}>
            <Link
              to={"/lobby"}
              className=""
            >
              Créer une partie
            </Link>
          </button>
          <button
            className="font-font italic font-black w-[500px] h-[100px] bg-gradient-to-b from-orange to-orange-clear uppercase text-3xl m-5 cursor-pointer text-white rounded-lg hover:bg-gradient-to-r"
            onClick={() => {
              setOpen(true);
            } }
          >
            Rejoindre la partie
          </button>
        </div><Modal
            show={open}
            children={<form onSubmit={onJoinRoom}>
              <input
                type="text"
                placeholder="lien de la room"
                className="text-black"
                value={context.roomValue}
                name="room"
                onChange={(e) => context.setRoomValue(e.target.value)} />
              <button>Join room</button>
            </form>}
            setShow={() => setOpen(true)} />
      </>
    }/>
  );
}
