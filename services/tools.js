const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
};
  
export const aspectRatio = (width, height)  => {
    const divisor = gcd(width, height);

    return `${width / divisor}:${height / divisor}`;
};

export const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
};