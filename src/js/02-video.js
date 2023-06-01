// Імпорт  відеоплеєра
import Vimeo from '@vimeo/player';

// Імпорт  throttle
import throttle from 'lodash.throttle';

// Створюємо ключ для зберігання даних у сховищі
const STORAGE_KEY = 'videoplayer-current-time';

// Ініціалізуємо plugin Vimeo
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

//  Функція для зберігання часу відтворення відео у сховищі
function onPlay(data) {
  const currentTime = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, currentTime);
}

//  Функція для передачі даних зі сховища
function insertTime() {
  const value = localStorage.getItem(STORAGE_KEY);
  if (value) {
    const timeValueJSON = JSON.parse(value);
    const { seconds } = timeValueJSON;
    return seconds;
  }
}

// Починаємо програвання відео зі збереженого часу
player
  .setCurrentTime(insertTime())
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
