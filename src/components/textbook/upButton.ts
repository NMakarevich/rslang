const upButton = document.getElementById('upButton');

if (upButton) {
  upButton.onclick = () => {
    window.scrollTo(window.pageXOffset, 0);
  };

  window.addEventListener('scroll', () => {
    upButton.hidden = (window.pageYOffset < document.documentElement.clientHeight);
  });
}
