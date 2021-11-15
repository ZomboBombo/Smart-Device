import { toggleAccordeonState } from './accordeon';
import { limitCharacters } from './character-limiter';
import { setInputmask } from './mask-for-inputs';
import { initiateModalLogic } from './modal';
import { saveToLocalStorage } from './save-to-local-storage';


window.addEventListener('load', () => {
  toggleAccordeonState();
  limitCharacters();
  setInputmask();
  initiateModalLogic();
  saveToLocalStorage();
});
