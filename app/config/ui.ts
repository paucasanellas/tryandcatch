export const ui = {
  colors: {
    primary: 'fuchsia',
    secondary: 'lime',
    neutral: 'slate',
  },
  badge: {
    slots: {
      base: 'font-mono tracking-wide shadow-[0_0_1rem_color-mix(in_srgb,var(--ui-primary)_8%,transparent)]',
    },
  },
  button: {
    slots: {
      base: 'transition-[color,background-color,box-shadow,transform] duration-200 hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0',
    },
  },
  navigationMenu: {
    slots: {
      link: 'after:shadow-[0_0_0.75rem_color-mix(in_srgb,var(--ui-primary)_30%,transparent)]',
    },
  },
}
