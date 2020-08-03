'use strict';

const inputElm = document.querySelector('.time-input');
const buttonElm = document.getElementById('button');
const secondsElm = document.querySelector('.alarm__seconds');
const minutesElm = document.querySelector('.alarm__minutes');
const audioElm = document.querySelector('audio');
const alarmElm = document.querySelector('.alarm');
const stopbuttonElm = document.getElementById('stopbutton');

const twoDigits = (num) => {
  return num.toString().padStart(2, '0');
}

const countdown = () => {
  let timeMins = Number(inputElm.value);
  let timeSecs = timeMins*60;
  if (timeMins < 10) {
    timeMins = twoDigits(timeMins);
  };    
  minutesElm.innerHTML = timeMins; /* tady je to kvůli zobrazení počátečního čísla odpočtu */
  
  const timerId = setInterval(() => {
    if (timeSecs > 0) {
      if (timeSecs%60 === 0 || timeMins < 0) {
        timeMins -= 1;
        minutesElm.innerHTML = twoDigits(timeMins); /*tady se to aktualizuje*/
      };
      timeSecs -= 1;
      secondsElm.innerHTML = twoDigits(timeSecs%60); /* tady aby to zobrazovalo odečítání; je trochu nelogické, že to twoDigits volám bez podmínky, aby to bylo menší než 10, ale je to zjevně chytré a když už to dvě místa má, tak to to první na 0 nepřepíše, takže to funguje */
    } else {
      alarmElm.classList.add('alarm--ring');
      audioElm.play();
      clearTimeout(timerId);
    }
    console.log(timeSecs);
  }, 1000);
  inputElm.value = '';

  const stopCountdown = () => {
    clearTimeout(timerId);
    minutesElm.innerHTML = '00';
    secondsElm.innerHTML = '00';
  }

  console.log(timeSecs);
  stopbuttonElm.addEventListener('click', stopCountdown);
};

buttonElm.addEventListener('click', countdown);

