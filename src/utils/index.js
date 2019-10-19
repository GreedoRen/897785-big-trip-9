export const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];
