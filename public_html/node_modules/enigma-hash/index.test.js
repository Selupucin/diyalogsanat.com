const { hash } = require("./index");

// sha256 test
test("sha256 hash of Hello World", () => {
  expect(hash("Hello World", "sha256", "hex")).toEqual(
    "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
  );
});

// sha512 test

test("sha512 hash of Hello World", () => {
  expect(hash("Hello World", "sha512", "hex")).toEqual(
    "2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b"
  );
});

// hmac sha256 test
test("sha256 Hmac test of Hello World", () => {
  expect(hash("Hello World", "sha256", "hex", "Some key")).toEqual(
    "a722630ff96e1aece313dc76a6af89673884bbdb45adec31678f11e44e0578b7"
  );
});

// hmac sha512 test
test("sha256 Hmac test of Hello World", () => {
  expect(hash("Hello World", "sha512", "hex", "Some key")).toEqual(
    "8432d61b16b75978b3b8da48a10f44ea72aba3f66f283bdc696dccdff50a897bc946270501e9e4ee122d066b9aef2e60a8789aaf8d636b6a44521ba64371e109"
  );
});
