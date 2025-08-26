class Movies {
    constructor(movies) {
        this._movies = movies
    }

    get() {
        return localStorage.getItem(this._movies)
    }

    set(movies) {
        return localStorage.setItem(this._token, movies)
    }

    remove() {
        return localStorage.removeItem(this._movies)
    }
}
export const Movies = new Movies("movies")

class IsShortMovies {
    constructor(short) {
        this._short = short
    }

    get() {
        return localStorage.getItem(this._short)
    }

    set(short) {
        return localStorage.setItem(this._token, short)
    }

    remove() {
        return localStorage.removeItem(this._short)
    }
}
export const isShortMovies = new IsShortMovies("short")

class ValueInputSearchMovies {
    constructor(valueInput) {
        this._short = valueInput
    }

    get() {
        return localStorage.getItem(this._valueInput)
    }

    set(valueInput) {
        return localStorage.setItem(this._token, valueInput)
    }

    remove() {
        return localStorage.removeItem(this._valueInput)
    }
}
export const valueInputSearchMovies = new ValueInputSearchMovies("valueInput")