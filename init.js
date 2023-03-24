import { shape } from "./config.js";
import build from "./build.js";

const form = document.querySelector("form");
const formBody = form.querySelector("div");
const output = document.querySelector("output");

function processField(field, parentLabel) {
  switch (field.type) {
    case "section":
    case "group": {
      let fieldsHTML = "";
      field.fields.forEach((f) => {
        fieldsHTML += processField(f, field.label);
      });
      return `
      <fieldset id="${field.label}" data-type="${field.type}">
        <legend>${field.label}</legend>
        <div>${fieldsHTML}</div>
      </fieldset>
      `;
    }
    case "select": {
      let optionsHTML = "";
      field.fields.forEach((label) => {
        optionsHTML += `<option>${label}</option>`;
      });
      return `
      <label>
        <span>${field.label}</span>
        <select name="${field.label}">
          ${optionsHTML}
        </select>
      </label>`;
    }
    case "checkbox": {
      return `
      <label>
        <input type="${field.type}" name="${field.label}" data-group="${parentLabel}">
        <span>${field.label}</span>
      </label>`;
    }
    default: {
      // Basic input cases
      return `
      <label>
        <span>${field.label}</span>
        <input type="${field.type}" name="${field.label}">
      </label>`;
    }
  }
}

let formBodyHTML = "";

shape.fields.forEach((field) => {
  formBodyHTML += processField(field);
});

formBody.innerHTML = formBodyHTML;

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
