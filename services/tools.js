const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
};
  
export const aspectRatio = (width, height)  => {
    const divisor = gcd(width, height);

    return `${width / divisor}:${height / divisor}`;
};