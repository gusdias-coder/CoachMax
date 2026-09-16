document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Assign a stagger index to each direct child of a [data-reveal-stagger] block
  document.querySelectorAll('[data-reveal-stagger]').forEach((parent) => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
      child.classList.add('reveal-child');
    });
  });

  const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // No motion preference (or no support): show everything immediately
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => io.observe(el));
  }

  // Sticky header gains a shadow once the page scrolls
  const header = document.querySelector('.nav');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
