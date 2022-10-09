import { URL_MOVIES } from './constants'

class MainApi {
    constructor(url) {
        this._url = url;
    }

    async get() {
        const res = await fetch(`${this._url}/beatfilm-movies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return this._checkResponce(res);
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export default new MainApi(URL_MOVIES);