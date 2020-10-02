const getRandomNumber = (max?: number): string => {
  // generate a random number between 1 and 10
  const randomInt = Math.floor(
    (max && Math.random() * max + 1) || Math.random() * 11,
  );
  return randomInt.toString();
};

export default getRandomNumber;
