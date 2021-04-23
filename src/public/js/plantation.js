import Client from './Client.js';
const PClient = new Client('localhost:3333/plantation', { query: { id: pl_id } });
console.log(PClient.socket);
PClient.socket.emit('jooj', pl_id);
PClient.socket.on('dados', (d) => {
  if (d) {
    update(d);
  }
});

function update(d) {
  const remainingT = document.getElementById('remaining-time')
  const remainingH = document.getElementById('remaining-humidity')
  const elapsedW = document.getElementById('elapsed-water')
  const percent = document.getElementById('percent');
  percent.innerHTML = d + "<span>%</span>";
  remainingH.innerHTML = (100 - parseInt(d)) + "% restantes para meta";
  remainingT.innerHTML = "tempo estimado " + 1 + " minutos";
  elapsedW.innerHTML = "quantidade de água utilizada na ultima irrigação (" + 10 + "L)";
  document.documentElement.style.setProperty('--percent', parseInt(d));
}
