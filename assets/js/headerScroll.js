document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let maxScroll = 150; // на каком скролле будет максимальная непрозрачность

    let opacity = Math.min(scrollY / maxScroll, 1) * 0.95; // max opacity 0.95

    header.style.backgroundColor = `rgba(15, 15, 15, ${opacity})`;

    if (opacity > 0) {
      header.style.boxShadow = `0 2px 8px rgba(0, 0, 0, ${opacity * 0.4})`;
    } else {
      header.style.boxShadow = 'none';
    }
  });
});
