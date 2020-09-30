const digitsList = (first, last, label) => {
  const digits = [];
  let i = first;
  while (i <= last) {
    const item = {};
    item.id = i;
    item[label] = `${i}`;
    if (i < 10) item[label] = `0${i}`;
    digits.push(item);
    i += 1;
  }
  return digits;
};

module.exports = {
  digitsList,
};
