import { URL_MAIN } from './constants'

class Auth {
    constructor(url) {
        this._url = url;
    }

    async signUp(name, email, password) {
        const res = await fetch(`${this._url}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        });

        return this._checkResponce(res);
    }

    async signIn(email, password) {
        const res = await fetch(`${this._url}/api/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        return this._checkResponce(res);
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export default new Auth(URL_MAIN);