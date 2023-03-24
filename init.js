import config from "./config.js";
import build from "./build.js";

const form = document.querySelector("form");
const formBody = form.querySelector("div");
const output = document.querySelector("output");

function processGroup(group) {
  const groupEl = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = group.label;
  groupEl.appendChild(legend);
  if (group.fields) {
    group.fields.forEach((field) => {
      groupEl.append(processField(field, group.label));
    });
  } else if (group.groups) {
    group.groups.forEach((group) => {
      groupEl.append(processGroup(group));
    });
  }
  return groupEl;
}

function processField(field, groupLabel) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = field.type;
  input.name = field.label;
  if (field.type === "checkbox") input.dataset.group = groupLabel;
  label.appendChild(input);
  label.appendChild(document.createTextNode(field.label));
  return label;
}

const children = [];

config.groups.forEach((group) => {
  children.push(processGroup(group));
});

formBody.append(...children);

function getData() {
  const formData = new FormData(form);
  const fields = Object.fromEntries(formData);
  const groups = {};

  form.querySelectorAll("[data-group]").forEach((node) => {
    if (!groups[node.dataset.group]) {
      groups[node.dataset.group] = { on: [], off: [] };
    }
    if (node.checked) {
      groups[node.dataset.group].on.push(node.name);
    } else {
      groups[node.dataset.group].off.push(node.name);
    }
  });

  return { fields, groups };
}

function updateOutput() {
  output.innerHTML = build(getData());
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateOutput();
});

form.addEventListener("input", () => {
  updateOutput();
});
