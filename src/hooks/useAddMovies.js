import { useState } from "react";

const useAddMovies = (width) => {
    
    const [getYetMovies, setGetYetMovies] = useState({
        "1280": 12,
        "768": 9,
        "320": 5
    })

    const addYetMovies = () => {
        if (width >= 1280) {
            setGetYetMovies({ ...getYetMovies, "1280": getYetMovies["1280"] + 4 })
        } else if (width >= 768) {
            setGetYetMovies({ ...getYetMovies, "768": getYetMovies["768"] + 3 })
        } else if (width >= 320) {
            setGetYetMovies({ ...getYetMovies, "320": getYetMovies["320"] + 1 })
        }
    }

    return [addYetMovies, getYetMovies];
}

export default useAddMovies;
