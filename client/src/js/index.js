import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

// Check if the Editor instantiation was successful
if (!(editor instanceof Editor)) {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register Workbox service worker
  const workboxSW = new Workbox('client/src/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
