export const MenuItems = [
  {
    title: 'Home',
    icon: 'fas fa-home',
    url: '/',
  },
  {
    title: 'Recipes',
    url: '#',
    icon: 'fas fa-receipt',

    subNav: [
      {
        title: 'Browse',
        path: '/browse-recipe',
        icon: 'fas fa-receipt',
      },
      {
        title: 'Create',
        path: '/recipes/create',
        icon: 'fas fa-receipt',
      },
      {
        title: 'Saved Recipes',
        path: '/recipes/saved-recipes',
        icon: 'fas fa-receipt',
      },
    ],
  },
  {
    title: 'Ingredient Search',
    url: '#',
    icon: 'fas fa-utensils',
  },
  {
    title: 'Meal Generator',
    url: '/meal-generator',
    icon: 'fas fa-drumstick-bite',

    subNav: [
      {
        title: 'hej',
        path: '/style',
        icon: 'fas fa-receipt',
      },
      {
        title: 'på',
        path: '#',
        icon: 'fas fa-receipt',
      },
    ],
  },
  {
    title: 'Scan new Recipe',
    url: '/scan',
    icon: 'fas fa-qrcode',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'fas fa-cogs',
  },
];
