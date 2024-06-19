import React from "react";
import { SocketContext } from "../context/SocketContext";


const ChatTypingComponent = ({ channelId }) => {
    const { socket } = useContext(SocketContext);
    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.emit('typing', { channelId });
            socket.on('typing', (data) => {
                setTypingUsers(data);
            });
            return () => {
                socket.off('typing');
            };
        }
    }, [socket, channelId]);
    return (
        <div>
            <ul>
                {typingUsers.map((user, index) => (
                    <li key={index}>{user.username} is typing...</li>
                ))}
            </ul>
        </div>
    );
};

export default ChatTypingComponent;

