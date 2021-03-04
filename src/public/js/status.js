import Client from './Client.js';
import { getCookie } from './util/getCookie.js';
const a = new Client('localhost:3333/plantations', { query: getCookie('token') });
