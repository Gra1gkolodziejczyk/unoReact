import { Socket, io } from "socket.io-client";

import { createContext } from "react";

export const socket = io(process.env.REACT_APP_WS_URL as string);

export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
