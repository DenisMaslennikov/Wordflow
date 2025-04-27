// Axios timout
export const AXIOS_TIMEOUT = 10_000;

// Настройка цветов.
export const BORDER_COLOR = "--color-grey-300";
export const BACKGROUND_COLOR = "--color-grey-0";
export const BUTTON_TEXT_COLOR = "--color-grey-500";
export const TEXT_MAIN_COLOR = "--color-grey-800";
export const HOVER_COLOR = "--color-grey-100";
export const LINK_COLOR = "--color-brand-500";

// Время на которое показывается вспывающее сообщение со статусом
export const SUCCESS_TOAST_DURATION = 3000;
export const ERROR_TOAST_DURATION = 5000;

// Ширина модального окна логина.
export const WIDTH_LOGIN_MODAL = "340px";

// Ширина модального окна регистрации.
export const WIDTH_REGISTRATION_MODAL = "340px";

// Размер аватара в хедере
export const IMG_HEADER_SIZE = "3rem";

// Максимальная ширина поста в ленте.
export const MAX_WIDTH_POST_IN_LIST = "900px";

// Максимальный размер превью изображения к посту в ленте
export const MAX_POST_PREVIEW_WIDTH = "700px";
export const MAX_POST_PREVIEW_HEIGHT = "700px";

// Ключи для хранения токенов в localStorage
export const ACCESS_KEY = "accessToken";
export const REFRESH_KEY = "refreshToken";

// Настройки времени жизни кеша react-query
export const DEFAULT_STALE_TIME = 0;
// Время жизни кеша для профиля пользователя и списка его блогов.
export const USER_PROFILE_STALE_TIME = 60 * 60 * 1000;

// За сколько до истечения срока жизни токена токен считается протухшим
export const TOKEN_REFRESH_THRESHOLD = 30_000;
// Через сколько времени (в пределах жизни access токена) пытаемся обновить токен в случае ошибки.
export const TOKEN_REFRESH_SLEEP_TIMOUT_IF_ERROR = 1_000;

// Базовый урл API
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// Минимальная длинна пароля
export const PASSWORD_MIN_LENGTH = 8;

// Количество постов по умолчанию на страницу
export const DEFAULT_POSTS_PER_PAGE = 10;
export const ITEMS_PER_PAGE_SELECTOR = [1, 5, 10, 20, 30, 50, 100];
