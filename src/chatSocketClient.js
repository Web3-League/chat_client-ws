// chatSocketClient.js
import { io } from 'socket.io-client';

class ChatSocketClient {
  constructor() {
    const isLocalhost = window.location.hostname === 'localhost';
    const socketUrl = isLocalhost ? 'http://localhost:3000' : 'http://192.168.1.16:3000';

    this.socket = io(socketUrl); // Remplacez par votre URL de serveur
    this.channels = [];
    
    this.socket.on('channels', (channels) => {
      this.channels = channels;
    });
  }

  fetchChannels(serverId) {
    this.socket.emit('fetch_channels', { serverId });
  }

  createChannel(channelData) {
    this.socket.emit('create_channel', channelData);
  }

  deleteChannel(channelId) {
    this.socket.emit('delete_channel', { id: channelId });
  }

  updateChannel(channelId, channelData) {
    this.socket.emit('update_channel', { id: channelId, ...channelData });
  }

  getChannels() {
    return this.channels;
  }
}

const chatSocketClient = new ChatSocketClient();
export default chatSocketClient;
