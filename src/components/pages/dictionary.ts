import main from '../main';
import { cards } from '../textbook/textbook';
import textbookNavigation from '../textbook/navigation';
import { localStorageUtil } from '../textbook/localStorageUtil';
import { authorization } from '../consts';
import addUpButton from '../textbook/upButton';

class Dictionary {
  render = async () => {
    addUpButton();
    main.mainContainer.innerHTML = `
    <div class='main__dictionary'>
      <h2 сlass='main__title'>Словарь</h2>
      <div class="textbook">
        <div id="textbook-header"></div>
        <div id="textbook-wrapper"></div>
      </div>
    </div>`;
    textbookNavigation.render();
    if (localStorageUtil.getChapter() === 6 && authorization.authorized) {
      cards.render('difficult');
    } else {
      cards.render('usual');
    }
  };
}

export default Dictionary;
