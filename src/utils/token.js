class Token {
    constructor(token) {
        this._token = token;
    }

    get() {
        return localStorage.getItem(this._token);
    }

    set(token) {
        return localStorage.setItem(this._token, token);
    }

    remove() {
        return localStorage.removeItem(this._token);
    }
}

export default new Token('token');