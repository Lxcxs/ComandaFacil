// SocketContext.tsx
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Socket } from 'socket.io-client'; // Importando o tipo Socket da biblioteca socket.io-client
import socket from '../services/socket';

interface SocketContextProps {
    socket: Socket;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    useEffect(() => {
        // Ouça eventos aqui
        socket.on('orderConfirmed', (data) => {
            console.log('Evento recebido:', data);
        });

        // Limpeza ao desmontar
        return () => {
            socket.off('orderConfirmed');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): SocketContextProps => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket deve ser usado dentro de um SocketProvider');
    }
    return context;
};
