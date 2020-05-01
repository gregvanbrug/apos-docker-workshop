module.exports = {
  name: "talk",
  extend: "apostrophe-pieces",
  label: "Talk",
  pluralLabel: "Talks",
  addFields: [
    {
      name: "time",
      label: "Time",
      type: "string",
      help: "The date and time of the talk"
    },
    {
      name: "image",
      label: "Image",
      type: "singleton",
      widgetType: "apostrophe-images",
      help: "An overview image for the talk",
      options: {
        limit: [1]
      }
    },
    {
      name: "content",
      label: "Content",
      type: "area",
      options: {
        widgets: {
          "apostrophe-rich-text": {
            toolbar: [
              "Styles",
              "Bold",
              "Italic",
              "Link",
              "Unlink",
              "Split",
              "NumberedList",
              "BulletedList",
              "JustifyCenter",
              "JustifyLeft",
              "JustifyRight"
            ],
            styles: [
              {
                name: "Heading Level 2",
                element: "h2"
              },
              {
                name: "Heading Level 3",
                element: "h3"
              }
            ]
          },
          "apostrophe-files": {
            options: {
              limit: 1
            }
          }
        }
      }
    }
  ]
};
