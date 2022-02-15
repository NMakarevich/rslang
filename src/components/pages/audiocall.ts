import startScreen from '../audiocall/startScreen';
import main from '../main';

class AudioCall {
  render() {
    main.mainContainer.innerHTML = `<div class="main__audiocall">
      <h2 сlass='main__title'>Аудиовызов</h2>
    </div>`;
    const mainAudiocall = main.mainContainer.querySelector('.main__audiocall') as HTMLElement;
    mainAudiocall.append(startScreen.render());
  }
}

export default AudioCall;
