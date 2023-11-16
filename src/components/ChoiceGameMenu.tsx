import {
  WebsocketContext,
  socket,
} from "../context/websocket/WebSocketContext";
import { useContext, useEffect, useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import Modal from "./modal";
import { Menu } from "./menu";

export const  ChoiceGameMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const context = useContext(WebsocketContext);
  const { setRoomName, setParticipants, setPlayerCards }= useContext(WebsocketContext)

  const onCreateRoom = () => {
    socket.emit("createRoom");
  };

  const onJoinRoom = () => {
    socket.emit("joinRoom", context.roomName);
    navigate("/lobby")
  }


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
                value={context.roomName}
                name="room"
                onChange={(e) => context.setRoomName(e.target.value)} />
              <button>Join room</button>
            </form>}
            setShow={() => setOpen(true)} />
      </>
    }/>
  );
}
