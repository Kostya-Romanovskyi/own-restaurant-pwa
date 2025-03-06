function formatString(input: string) {
  if (input === 'profile') {
    return 'Personal data';
  }

  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default formatString;
