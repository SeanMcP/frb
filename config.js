export default {
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
