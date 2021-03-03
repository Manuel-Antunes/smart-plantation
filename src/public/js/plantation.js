var socket = io.connect("http://localhost:3333");
socket.emit('jooj', pl_id);
socket.on('dados', (d) => {
  if (d) {
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
})
