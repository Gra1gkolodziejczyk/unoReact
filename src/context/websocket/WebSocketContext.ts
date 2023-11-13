import { Socket, io } from "socket.io-client";

import { createContext } from "react";

export const socket = io(`${process.env.REACT_API_URL}`);

export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
