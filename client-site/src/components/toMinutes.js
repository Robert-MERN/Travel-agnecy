export const toMinutes = (arr) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        total += arr[i] * 60
      } else {
        total += arr[i];
      };
    }
    return total;
  };