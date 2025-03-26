import http from 'http';

import app from './app.js';
import {port} from './config/keys.js';

// create a server and pass the express app to it
const server = http.createServer(app)

// start the server
app.listen(port, () => console.log(`Server is running on port ${port}`))