const maskGreaterThan = [
  '(',
  /[1-9]/,
  /[1-9]/,
  ')',
  ' ',
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const maskLessThan = [
  '(',
  /[1-9]/,
  /[1-9]/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const phoneMask = (phoneInput: string): Array<string | RegExp> => {
  const numbers = phoneInput.match(/\d/g) || [];

  if (numbers.length > 10) {
    return maskGreaterThan;
  }

  return maskLessThan;
};
