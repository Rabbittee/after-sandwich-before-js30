import { pipe } from './utils';

const maxRow = 20;

export const Section = (question, fn) => {
  const createSection = (node) => {
    node.classList.add('bg-white', 'text-black', 'text-opacity-70', 'rounded-xl', 'shadow-xl', 'p-8', 'space-y-2');
    node.innerHTML = `<div>${question}</div>`;

    return node;
  };

  const createButton = (node) => {
    const button = document.createElement('button');
    button.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
    button.innerText = '解答';

    button.onclick = async () => {
      if (!fn) return;
      const text = await fn();
      const prettified = JSON.stringify(text, undefined, 4);

      const textarea = node.querySelector('textarea');
      textarea.value = prettified;
      textarea.rows = Math.min(prettified.split('\n').length, maxRow);
    };

    node.appendChild(button);
    return node;
  };

  const createAnswer = (node) => {
    node.insertAdjacentHTML(
      'beforeend',
      `
  <div>
    <div>Answer:</div>
    <textarea class="w-full p-4 bg-slate-100 text-black text-opacity-70 text-sm resize-none" disabled></textarea>
  </div>`,
    );

    return node;
  };

  const section = document.createElement('section');
  const node = pipe(createSection, createButton, createAnswer)(section);

  return function () {
    return node;
  };
};
