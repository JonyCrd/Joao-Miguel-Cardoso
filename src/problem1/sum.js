var sum_to_n_a = function (n) {
  const arr = Array.from("a".repeat(n));
  let total = 0;
  let index = 0;
  arr.forEach((element) => {
    index++;
    total += index;
  });

  return total;
};

console.log("a:", sum_to_n_a(5));

var sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i + 1;
  }
  return sum;
};

console.log("b:", sum_to_n_b(5));

var sum_to_n_c = function (n) {
  let sum = 0;
  while (n >= 0) {
    sum += n;
    n--;
  }
  return sum;
};

console.log("c:", sum_to_n_c(5));
