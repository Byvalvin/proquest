import server from '../index.js';
import { createServer } from 'http';
import { parse } from 'url';

export default async function handler(req, res) {
    const vserver = createServer(server);
    const parsedUrl = parse(req.url, true);
    req.url = parsedUrl.pathname;
    vserver.emit('request', req, res);
}
