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
    title: 'Settings',
    url: '/settings',
    icon: 'fas fa-cogs',
  },
];
