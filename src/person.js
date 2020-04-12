const isAdult = age => {
  if (age > 18) {
    return true;
  }
  return false;
};

const canDrink = age => {
  if (age > 21) {
    return true;
  }
  return false;
};

const isSenior = age => age >= 65;

export default isSenior;
export { canDrink, isAdult };
