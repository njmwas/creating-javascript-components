export default function Dialog(...children){
    var dialog = document.createElement('dialog');
    dialog.append(...children);
    dialog.onclose = ()=>dialog.remove();
    return dialog;
}