const axios = require('axios');
const io = require('socket.io-client');

const username = 'HayatsCodes';
const email = 'hayatscodes@gmail.com';
const password = '123456';
const PORT = 3000;

let token;

// Function to register
async function register() {
  try {
    const response = await axios.post(`http://192.168.1.16:${PORT}/auth/register`, {
      username,
      email,
      password,
    });
    console.log(response.data.message); // Registration successful
  } catch (error) {
    console.error(error.response.data);
  }
}

// Function to login and get the JWT token
async function login() {
  try {
    const response = await axios.post(`http://192.168.1.16:${PORT}/auth/login`, {
      username,
      password,
    });
    token = response.data.token;
    console.log(response.data.message); // Login successful
  } catch (error) {
    console.error(error.response.data);
  }
}

// Function to initialize WebSocket connection
function connectSocket() {
  const client = io(`http://192.168.1.16:${PORT}`, {
    auth: {
      token,
    },
  });

  client.on('connect', () => {
    console.log('Connected to WebSocket server!');
  });

  client.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  client.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });

  // Handle other events here
}

// Main function to execute the steps sequentially
(async function main() {
  await register();
  await login();
  if (token) {
    connectSocket();
  } else {
    console.error('No token received, unable to connect to WebSocket server');
  }
})();

