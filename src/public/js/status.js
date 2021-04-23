import Client from './Client.js';
import { getCookie } from './util/getCookie.js';
const a = new Client('localhost:3333/plantations', { query: getCookie('token') });
const list = document.getElementById('plantationList');
const elements = list.getElementsByTagName('li');
for (let i = 0; i < elements.length; i++) {
  const e = elements[i];
  const labelName = e.querySelector("span");
  console.log(labelName);
  labelName.classList.add('issued');
}
