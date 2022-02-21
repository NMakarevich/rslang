import main from '../main';
import { cards } from '../textbook/textbook';
import textbookNavigation from '../textbook/navigation';
import { localStorageUtil } from '../textbook/localStorageUtil';
import addUpButton from '../textbook/upButton';
import { chapterDifficult } from '../consts';

class Dictionary {
  render = async () => {
    addUpButton();
    main.main.classList.add('bg-white');
    main.mainContainer.innerHTML = `
    <div class='main__dictionary'>
      <h2 сlass='main__title'>Учебник</h2>
      <div class="textbook">
        <div id="textbook-header"></div>
        <div id="page-notification" class="hidden">Эта страница полностью изучена</div>
        <div id="textbook-wrapper"></div>
      </div>
    </div>`;
    textbookNavigation.render();
    if (localStorageUtil.getChapter() === chapterDifficult
    && localStorageUtil.checkAuthorization()) {
      cards.render('difficult');
    } else {
      cards.render('usual');
    }
  };
}

export default Dictionary;
