// ===== 个人网站交互脚本 =====

// 1. Hero 打字机效果
const phrases = [
  'Android 工程师',
  'Kotlin / Jetpack Compose 爱好者',
  '把想法变成 App 的人',
];
const typedEl = document.getElementById('typed');
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = phrases[phraseIdx];
  typedEl.textContent = current.slice(0, charIdx);

  if (!deleting) {
    if (charIdx < current.length) {
      charIdx++;
      setTimeout(type, 110);
    } else {
      deleting = true;
      setTimeout(type, 1800); // 停留
    }
  } else {
    if (charIdx > 0) {
      charIdx--;
      setTimeout(type, 45);
    } else {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
    }
  }
}
if (typedEl) type();

// 2. 滚动入场动效（IntersectionObserver）
const revealEls = document.querySelectorAll('.work-card, .skill-group, .contact-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

// 3. 导航：移动端菜单 + 滚动高亮
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

const sections = ['hero', 'works', 'skills', 'contact'];
const links = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 120;
  let activeId = '';
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= pos) activeId = id;
  });
  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}, { passive: true });

// 4. 页脚年份
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
