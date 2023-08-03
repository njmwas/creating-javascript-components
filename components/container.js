export default function Container(...children){
    const section = document.createElement('div');
    section.classList.add('container')
    section.append(...children);
    return section;
}