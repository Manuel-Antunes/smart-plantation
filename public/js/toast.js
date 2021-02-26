const a = document.getElementById("toast-container");
function toast(message, status) {
    const toast = document.createElement("div")
    const icon = document.createElement("icon")
    toast.classList.add("toast-box");
    toast.innerText = message;
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