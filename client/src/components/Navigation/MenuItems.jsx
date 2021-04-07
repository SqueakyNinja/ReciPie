export const MenuItems = [
  {
    title: "Home",
    icon: "fas fa-home",
    url: "/",
  },
  {
    title: "Recipes",
    url: "#",
    icon: "fas fa-utensils",

    subNav: [
      {
        title: "Search",
        path: "/browse-recipe",
        icon: "fas fa-search",
      },
      {
        title: "Create",
        path: "/recipes/create",
        icon: "fas fa-plus",
      },
      {
        title: "Saved Recipes",
        path: "/recipes/saved-recipes",
        icon: "far fa-save",
      },
    ],
  },

  {
    title: "Settings",
    url: "/settings",
    icon: "fas fa-cogs",
  },
];
