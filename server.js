const translate = require("@vitalets/google-translate-api");
translate(
  "muje yeh karna hai but me yeh kar nahi paa rha hu, kya tu meri madad kar dega",
  { from: "hi", to: "en" }
)
  .then((res) => {
    console.log(res.text);
  })
  .catch((err) => {
    console.error(err);
  });
