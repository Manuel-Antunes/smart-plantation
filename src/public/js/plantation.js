var socket = io.connect("http://localhost:3333");
socket.emit('jooj', { hello: "world" })
socket.on('dados', (d) => {
  if (d) {
    console.log(d);
    const percent = document.getElementById('percent');
    percent.innerHTML = d + "<span>%</span>";
    document.documentElement.style.setProperty('--percent', parseInt(d));
  }
})
