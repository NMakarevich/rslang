import { authorization } from './consts';

export class LocalStorageUtil {
  keyChapter: string;

  keyPage: string;

  keyUserInfo: string;

  constructor() {
    this.keyChapter = 'chapter';
    this.keyPage = 'page';
    this.keyUserInfo = 'userInfo';
  }

  getChapter() {
    const chapterLS = localStorage.getItem(this.keyChapter);
    if (chapterLS !== null) {
      return +chapterLS;
    }
    return 0;
  }

  putChapter(chapter: string) {
    localStorage.setItem(this.keyChapter, chapter);
  }

  getPage() {
    const pageLS = localStorage.getItem(this.keyPage);
    if (pageLS !== null) {
      return +pageLS;
    }
    return 0;
  }

  putPage(page: string) {
    localStorage.setItem(this.keyPage, page);
  }

  getUserInfo() {
    const infoLS = localStorage.getItem(this.keyUserInfo);
    if (infoLS !== null) {
      return JSON.parse(infoLS);
    }
    return '';
  }

  putUserInfo(info) {
    localStorage.setItem(this.keyUserInfo, JSON.stringify(info));
  }

  checkAuthorization() {
    const aut = this.getUserInfo();
    if (aut !== '') {
      authorization.authorized = true;
    }
  }
}

export const localStorageUtil = new LocalStorageUtil();
localStorageUtil.checkAuthorization();