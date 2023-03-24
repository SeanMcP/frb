export const shape = {
  title: "Flexible",
  groups: [
    {
      label: "Demographics",
      fields: [
        {
          label: "Name",
          type: "text",
        },
        {
          label: "Age",
          type: "number",
        },
      ],
    },
    {
      label: "Interests",
      fields: [
        {
          label: "Soccer",
          type: "checkbox",
        },
        {
          label: "LEGO",
          type: "checkbox",
        },
        {
          label: "Video Games",
          type: "checkbox",
        },
      ],
    },
    {
      label: "Academics",
      groups: [
        {
          label: "Math",
          fields: [
            {
              label: "Counting",
              type: "checkbox",
            },
            {
              label: "Addition",
              type: "checkbox",
            },
          ],
        },
        {
          label: "Reading",
          fields: [
            {
              label: "ABCs",
              type: "checkbox",
            },
            {
              label: "Letter sounds",
              type: "checkbox",
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Receives form data and returns a string template for your report.
 * @param {*} data
 * @returns
 */
export function template(data) {
  /**
   * If you have conditional parts of your report, implement
   * them here. The values will be injected later.
   */
  return [
    `<b>Name</b>: @Name`,
    `<b>Age</b>: @Age`,
    `<b>Interests</b>: &Interests`,
    `<b>Non interests</b>: !Interests`,
    data.groups.Math.on.length > 0 && `<b>Math</b>: &Math`,
    `<b>Reading skills</b>: &Reading`,
  ]
    .filter(Boolean)
    .join("\n");
}
