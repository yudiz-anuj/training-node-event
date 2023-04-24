import { server } from './server.mjs';

const port = 8080;
const hostname = '127.0.0.1';

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
