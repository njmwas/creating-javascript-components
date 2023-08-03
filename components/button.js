
export default function Button({onClick, label, type}){
    var button = document.createElement('button');
    button.addEventListener('click', onClick);
    button.innerHTML = label || "Button";
    button.type = type || "button";
    return button;
}