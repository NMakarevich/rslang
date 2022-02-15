import { IUserInfo } from '../interfaces';

export class LocalStorageUtil {
  keyChapter: string;

  keyPage: string;

  keyUserInfo: string;

  constructor() {
    this.keyChapter = 'current-chapter';
    this.keyPage = 'current-page';
    this.keyUserInfo = 'rslang-user';
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
    if (infoLS) {
      return JSON.parse(infoLS);
    }
    return '';
  }

  putUserInfo(info: IUserInfo) {
    localStorage.setItem(this.keyUserInfo, JSON.stringify(info));
  }

  checkAuthorization() {
    const data = localStorage.getItem('rslang-user');
    if (data) return true;
    return false;
  }
}

export const localStorageUtil = new LocalStorageUtil();
localStorageUtil.checkAuthorization();
