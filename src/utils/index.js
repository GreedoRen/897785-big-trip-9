
export const createElement = (template) => {
  const elementContainer = document.createElement(`div`);
  elementContainer.innerHTML = template;
  return elementContainer.firstElementChild;
};

export const render = (container, html, place) => place === `begin` ? container.prepend(html) : container.append(html);

export const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];
