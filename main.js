import "./styles/reset.scss";
import "./styles/global.scss";
import "./styles/cart-style.scss";

document.querySelectorAll(".screen2-root").forEach((el) => {
  fetch(`${import.meta.env.BASE_URL}components/screen2.html`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      return res.text();
    })
    .then((html) => {
      el.innerHTML = html;
    })
    .catch((err) => {
      console.error("❌ Failed to load screen2.html:", err);
    });
});

let isScrolling = false;

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  const screens = document.querySelectorAll(".screen");
  const screenHeight = window.innerHeight;
  const currentScroll = window.scrollY;
  const currentIndex = Math.round(currentScroll / screenHeight);

  let targetIndex = currentIndex;

  if (e.deltaY > 0 && currentIndex < screens.length - 1) {
    targetIndex = currentIndex + 1;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    targetIndex = currentIndex - 1;
  } else {
    return;
  }

  isScrolling = true;
  screens[targetIndex].scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    isScrolling = false;
  }, 1000);
});
