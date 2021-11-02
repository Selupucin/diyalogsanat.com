const colors = require("colors");
const crypto = require("crypto");

function run() {
  const arguments = process.argv;
  const opts = arguments.slice(2, arguments.length);

  try {
    const inputVal = opts.slice(opts.indexOf("--data") + 1, opts.indexOf("--data") + 2)[0];
    const algorithmVal = opts.slice(opts.indexOf("--alg") + 1, opts.indexOf("--alg") + 2)[0];
    const encodingVal = opts.slice(opts.indexOf("--code") + 1, opts.indexOf("--code") + 2)[0];

    if (algorithmVal === "sha256") {
      const h = crypto.createHash(algorithmVal.toLowerCase() || "sha256");
      h.update(inputVal);
      const res = h.digest(encodingVal || "hex");
      console.log(colors.green(res));
    } else {
      const h = crypto.createHash(algorithmVal.toLowerCase() || "sha512");
      h.update(inputVal);
      const res = h.digest(encodingVal || "hex");
      console.log(colors.green(res));
    }
  } catch (error) {
    console.log(colors.red.bold("Error occured, please type all required fields"));
  }
}

run();
