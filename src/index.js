@tailwind base;
@tailwind components;
@tailwind utilities;

/* اضافات ساده برای فونت و راست‌چین */
:root {
  --brand-green: #3B7A57;
  --muted-beige: #F5F1E3;
}

html, body, #root {
  height: 100%;
  direction: rtl;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background-color: var(--muted-beige);
}
