document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const links = document.querySelectorAll(".nav-link");

  const sections = Array.from(links).map(link => {
    const target = document.querySelector(link.getAttribute("href"));
    return { link, target };
  });

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(({ link, target }) => {
      if (
        target.offsetTop <= scrollPos &&
        target.offsetTop + target.offsetHeight > scrollPos
      ) {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  };

  const toggleHeaderBackground = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", () => {
    toggleHeaderBackground();
    setActiveLink();
  });

  toggleHeaderBackground();
  setActiveLink();
});

