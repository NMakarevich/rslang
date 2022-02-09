import { IWord } from "./interfaces/IWord";
import { SprintResult } from "./sprint_results";
import { Word } from "./word";

export function addAnswerNo(count: number) {
    console.log(`word  ${count}`);
    

}

export function addAnswerYes(count: number) {
    console.log(`word  ${count}`);
    

}

export let pageWords = [
    {
        key: 'group',
        value: 0
    }, 
    {
        key: 'page',
        value: 0
    }
  ]
  
  const baseUrl = 'https://rslang-team32.herokuapp.com';
  const path = {
      words: '/words',
      winners: '/winners',
      engine: '/engine'
  }
  
  const getParam = (params: any[]) =>  params.length ? `?${params.map((item) => `${item.key}=${item.value}`).join('&')}` : '';  
  
  export async function getWords(params: any[]) {
    let response = await fetch(`${baseUrl}${path.words}${getParam(params)}`);
    if (response.ok) return await response.json();
  };
  
  const words = getWords(pageWords);
  console.log(words)
  
  
  let time: NodeJS.Timer;
  export  function setTimer(right: Array<IWord>, wrong: Array<IWord>) {let seconds = 60;
    // if (localStorage.getItem('timeGame') ==  'true') {
        
        // let workTime1 = localStorage.getItem('ltimeInterval');
        // console.log(workTime1);
        time =  setInterval(function () {
            if (seconds >= 0) {
                let timerScore = document.querySelector('.sprint__game__timer');
                (document.querySelector('.sprint__container') as HTMLElement).style.opacity = '1';
                (timerScore as HTMLElement).innerHTML = `${seconds}`;
                seconds = seconds -1;
            } else {
                clearInterval(time);
                let container = document.querySelector('.sprint__container');
                container?.appendChild(new SprintResult().draw(right, wrong));
                // (container as HTMLElement).click();           
            }
            return seconds;
        }, 1000);
    // }
  }

 export function changeWord(count: number, word: HTMLElement, data: Array<IWord>) {
    count = count + 1;
    let translation = Math.ceil(Math.random() * 18 + 1) ;
    console.log(translation);
    
    let container = document.querySelector('.sprint__word__container1');
    (container as HTMLElement).innerHTML = '';
    if (data[count]) {
        word = new Word().draw(data[count]!, data[translation]!);// тут надо разобраться
    } else word = document.createElement('div');
    container?.appendChild(word);
    return count;

  }

  
  
//   export  function timeOf() {
//     clearInterval(time);
//   }

//   function keyPress(e: Event) {
//     let keyNum;
//     if (window.event) {
//         keyNum = window.event.keyCode;
//     }
//     else if (e) {
//         keyNum = e.which;
//     }
//     console.log(keyNum);
// }
// document.onkeydown = keyPress;