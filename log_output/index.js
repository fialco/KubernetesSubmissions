const crypto = require("crypto");

const string = crypto.randomUUID();

const getStringNow = () => {
  const date = new Date();

  console.log(date.toISOString(), string);

  setTimeout(getStringNow, 5000);
};

getStringNow();
