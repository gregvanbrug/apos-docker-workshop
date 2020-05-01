// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  park: [
    {
      slug: "/talks",
      published: true,
      parkedId: "talks",
      title: "Talks",
      type: "talks-pages"
    }
  ],
  types: [
    {
      name: "home",
      label: "Home"
    }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ]
};
