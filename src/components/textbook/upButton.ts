export default function addUpButton() {
  const upButton = document.createElement('button');
  upButton.id = 'upButton';
  upButton.hidden = true;

  document.body.appendChild(upButton);
  upButton.onclick = () => {
    window.scrollTo(window.pageXOffset, 0);
  };

  window.addEventListener('scroll', () => {
    upButton.hidden = (window.pageYOffset < document.documentElement.clientHeight);
  });
}
