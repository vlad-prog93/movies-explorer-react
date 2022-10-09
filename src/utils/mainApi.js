import { URL_MAIN } from './constants'
import {token} from './local';

class MainApi {
    constructor(url) {
        this._url = url;
    }

    async getUser() {
        const res = await fetch(`${this._url}/api/users/me`, {
            method: "GET",
            headers: this._headers()
        });

        return this._checkResponce(res);
    }

    async updateUser(name, email) {
        const res = await fetch(`${this._url}/api/users/me`, {
            method: "PATCH",
            headers: this._headers(),
            body: JSON.stringify({
                name, email
            })
        });

        return this._checkResponce(res);
    }

    async getMovies() {
        const res = await fetch(`${this._url}/api/movies`, {
            method: "GET",
            headers: this._headers(),
        });

        return this._checkResponce(res);
    }

    async saveMovie(infoMovie) {
        const res = await fetch(`${this._url}/api/movies`, {
            method: "POST",
            headers: this._headers(),
            body: JSON.stringify({
                ...infoMovie
            })
        });

        return this._checkResponce(res);
    }

    async removeMovie(id) {
        const res = await fetch(`${this._url}/api/movies/${id}`, {
            method: "DELETE",
            headers: this._headers(),
        });

        return this._checkResponce(res);
    }

    _headers() {
        return {
            "Content-Type": "application/json",
            authorization: `Bearer ${token.get()}`
        }
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    }
}

export default new MainApi(URL_MAIN);