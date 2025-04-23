// Настройка цветов.
export const BORDER_COLOR = "--color-grey-300";
export const BACKGROUND_COLOR = "--color-grey-0";
export const BUTTON_TEXT_COLOR = "--color-grey-500";
export const TEXT_MAIN_COLOR = "--color-grey-800";
export const HOVER_COLOR = "--color-grey-100";

// Ключи для хранения токенов в localStorage
export const ACCESS_KEY = "accessToken";
export const REFRESH_KEY = "refreshToken";

// Настройки времени жизни кеша react-query
export const DEFAULT_STALE_TIME = 0;
export const USER_PROFILE_STALE_TIME = 60 * 60 * 1000;

// За сколько до истечения срока жизни токена токен считается протухшим
export const TOKEN_REFRESH_THRESHOLD = 30_000;
// Через сколько времени (в пределах жизни access токена) пытаемся обновить токен в случае ошибки.
export const TOKEN_REFRESH_SLEEP_TIMOUT_IF_ERROR = 1_000;
