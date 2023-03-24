import COPY from "./copy.js";

function list(array) {
  if (array.length === 0) return "None";
  return array.join(", ");
}

export default function (data) {
  const { fields, groups } = data;
  return COPY.replace(/\?([@&!])(\w+)\|(.*)\?/g, (match, ...rest) => {
    const [key, value, ifTrue] = rest;
    let met = false;
    if (key === "@" && fields[value]) met = true;
    if (key === "&" && groups[value].on.length > 0) met = true;
    if (key === "!" && groups[value].off.length > 0) met = true;
    if (met) return ifTrue;
    return "";
  }).replace(/([@&!])(\w+)/g, (match, ...rest) => {
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
