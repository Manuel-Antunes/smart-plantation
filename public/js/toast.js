const a = document.getElementById("toast-container");

/*
O rolê é o seguinte, pra usar essa merda aqui tudo q vc tem q fazer é
criar uma div na sua view com a classe "toast-container" e 
importar o css e o js do toast.
e pra o toast aparecer na tela, vc só precisa passar
a mensagem q vc quer fazer o toast e o status do toast
*/
function toast(message, status) {
    const toast = document.createElement("div")
    const icon = document.createElement("icon")
    icon.classList.add("material-icons")
    icon.innerHTML = "error"
    toast.classList.add("toast-box");
    const b = document.createElement("span")
    b.appendChild(icon)
    b.innerHTML += message
    toast.appendChild(b)
    console.log(a.dataset.icons);
    a.appendChild(toast)
    toast.style.animation = "toast .5s ease forwards";
    setTimeout(() => {
        toast.style.animation = "";
        const toasts = document.getElementsByClassName("toast-box")
        for (let i = 0; i < toasts.length; i++) {
            toast.remove(toasts[i]);
        }
    }, 3000);
}