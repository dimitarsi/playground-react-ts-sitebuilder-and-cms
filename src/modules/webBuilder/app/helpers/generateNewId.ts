export const generateNewId = () =>
  `${Math.random().toString().slice(0, 10)}-${Math.random()
    .toString()
    .slice(0, 10)}`;
