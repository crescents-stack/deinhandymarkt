export const MakeCombinationString = (combination: any) => {
    const { combinationType, combinations } = combination;
    let resultString = [];
    for (const index in combinations) {
      let newString;
      const { color, quantity, size, price } = combinations[index];
      if (combinationType === "color") {
        newString = `${color} x ${quantity}`;
      } else {
        newString = `${size}: ${quantity} x $${price}`;
      }
      resultString.push(newString);
    }
    return resultString.toString().replaceAll(",", ", ");
  };