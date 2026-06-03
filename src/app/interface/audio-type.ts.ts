// 1. Интерфейс для базовой музыки (Synthwave, Techno и т.д.)
export interface MusicTrack {
  id: string;        // Уникальный идентификатор (например, 'synthwave')
  name: string;      // Красивое название для кнопки в интерфейсе
  bpm: number;       // Темп трека (СДВГ-шникам важно видеть ритм)
  url: string;       // Путь к аудиофайлу в папке assets
}

export interface NoiseChannel {
  id: string;        // Идентификатор (например, 'rain')
  name: string;      // Название для ползунка
  icon: string;      // Эмодзи-иконка (🌧, 🟫, ☕)
  url: string;       // Путь к файлу шума
  volume: number;    // Текущая громкость ползунка (от 0 до 1)
  audio?: HTMLAudioElement; // Сам объект звука в браузере (опционально)
}