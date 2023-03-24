export const shape = {
  title: "Flexible",
  fields: [
    {
      label: "Demographics",
      type: "section",
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
      type: "group",
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
      type: "section",
      fields: [
        {
          label: "Math",
          type: "group",
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
          type: "group",
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
        {
          label: "Science",
          type: "select",
          fields: ["Biology", "Chemistry", "Physics"],
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
    `<b>Favorite science domain</b>: @Science`,
  ]
    .filter(Boolean)
    .join("\n");
}
