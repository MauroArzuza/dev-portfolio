export function calculateTotal(amount, term) {
  const amountInt = parseInt(amount);
  const termInt = parseInt(term);

  let totalAmount;

  if (amountInt <= 1000) {
    totalAmount = amountInt * 0.25;
  } else if (amountInt > 1000 && amountInt <= 5000) {
    totalAmount = amountInt * 0.2;
  } else if (amountInt > 5000 && amountInt <= 10000) {
    totalAmount = amountInt * 0.15;
  } else {
    totalAmount = amountInt * 0.1;
  }

  let totalTerm;

  switch (termInt) {
    case 3:
      totalTerm = amountInt * 0.05;
      break;
    case 6:
      totalTerm = amountInt * 0.1;
      break;
    case 12:
      totalTerm = amountInt * 0.15;
      break;
    case 24:
      totalTerm = amountInt * 0.2;
      break;

    default:
      break;
  }
  return totalAmount + totalTerm + amountInt;
  //   console.log(totalAmount);
  //   console.log(totalTerm);
}
