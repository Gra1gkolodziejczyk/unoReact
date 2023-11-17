import { useContext } from 'react';
import '../assets/css/button.scss'
import { Menu } from './menu';
import { WebsocketContext, socket } from '../context/websocket/WebSocketContext';
import { Link } from 'react-router-dom';

interface Props {}

export const LobbyMenu: React.FC<Props> = () => {
  const context = useContext(WebsocketContext);

  const handleStartGame = () => {
    socket.emit("startGame", { roomName: context.roomName }); // Send startGame event with roomName in payload
  };

 return(

  <Menu children={
    <div className="flex font-font gap-[5px] p-[10px] h-full">
      <div className="flex flex-col flex-1">
        <h3 className="m-[10px] font-bold text-center text-[20px]">PARTICIPANTS - {context.participants.length}/4</h3>
        <div className="flex-1 bg-grey">
          {Object.values(context.participants).map((i:any) =>
            <div key={i} className="flex flex-col flex-1">
              <div className="m-[10px] font-bold text-center text-[20px]">- {context.participants[i]}</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex font-font flex-col flex-1 pt-[35px]">
        <div className="button bg-orange text-center text-[20px]">{context.roomName}</div>
        <button className="button bg-orange text-[20px]">PARAMETRES</button>
        <button className="button bg-orange text-[20px] mt-[95px] sm:mt-[215px] md:mt-[195px] xl:mt-[145px]" onClick={() => handleStartGame()}>
          <Link to={"/game"}> JOUER</Link></button>
      </div>
      
    </div>
  }/>
)};
