const dec = 123;
const bin = "1111011";
const hex = "7b";

const hex10 = dec.toString(16); // === "7b" (10진수 -> 16진수)
const bin10 = dec.toString(2); // === "1111011" (10진수 -> 2진수)

const dec2 = parseInt(bin, 2); // === 123 (2진수 -> 10진수)
const hex2 = parseInt(bin, 2).toString(16); // === "7b" (2진수 -> 16진수)

const dec16 = parseInt(hex, 16); // === 123 (16진수 -> 10진수)
const bin16 = parseInt(hex, 16).toString(2); // === "1111011" (16진수 -> 2진수)
