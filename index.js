import http from 'http';

import app from './app';
import {port} from './config.keys';

// create a server and pass the express app to it
const server = http.createServer(app)

// start the server
app.listen(port, () => console.log(`Server is running on port ${port}`))