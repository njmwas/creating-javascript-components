export default function Container(...children){
    const section = document.createElement('section');
    section.appendChild(...children);
    return section;
}