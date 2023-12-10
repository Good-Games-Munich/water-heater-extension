import css from './fixModule.css';

const head = document.head || document.querySelectorAll('head')[0];
const style = document.createElement('style');

head.appendChild(style);

style.appendChild(document.createTextNode(css));
