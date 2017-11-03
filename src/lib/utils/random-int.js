//@flow
export const genRandomInt = (min: number, max: number) =>
  Math.floor(max - Math.random() * (max - min));
