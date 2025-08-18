import server from '../index.js';

export default function handler(req, res) {
  return server(req, res); // Let Express handle the request directly
}
