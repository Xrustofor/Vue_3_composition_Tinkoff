const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
    INVALID_PASSWORD: 'Не верный пароль',
}

export function error(code){
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Что то пошло не так';
}