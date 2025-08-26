class Local {
    constructor(value) {
        this._value = value
    }

    get() {
        return localStorage.getItem(this._value)
    }

    set(value) {
        return localStorage.setItem(this._value, value)
    }

    remove() {
        return localStorage.removeItem(this._value)
    }
}

export const token =  new Local("token")

export const moviesLC = new Local("movies")

export const isShortLC = new Local("short")

export const valueInputLC = new Local("valueInput")