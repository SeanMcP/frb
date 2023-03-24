import { template } from "./config.js";

function list(array) {
  if (array.length === 0) return "None";
  return array.join(", ");
}

export default function (data) {
  const { fields, groups } = data;
  return template(data).replace(/([@&!])(\w+)/g, (match, ...rest) => {
    const [key, value] = rest;
    switch (key) {
      case "@":
        return fields[value];
      case "&":
        return list(groups[value].on);
      case "!":
        return list(groups[value].off);
      default:
        return match;
    }
  });
}
