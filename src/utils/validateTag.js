
const validChars = "0289PYLQGRJCUV";

function clean(tag) {
  if(!tag) return "";
  if(tag.startsWith("#")) return tag.slice(1).replace(/O/g, "0");
  return tag.replace(/O/g, "0");
}

function validate(tag) {
  return clean(tag).split("").every((char) => validChars.includes(char));
}

module.exports = { clean, validate, validChars };
