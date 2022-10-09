import { useEffect } from "react";

import { useState } from "react";
import { WIDTH_L, WIDTH_M, WIDTH_S } from "../utils/constants";
import useScreenSize from "./useScreenSize";

const useAddMovies = (filtredMovies) => {
    const width = useScreenSize();
    const [renderMovies, setRenderMovies] = useState([]);
    const [getYetMovies, setGetYetMovies] = useState({
        "WIDTH_L": 12,
        "WIDTH_M": 9,
        "WIDTH_S": 5
    })
    const [isLoadingAddMovies, setIsLoadingAddMovies] = useState(false);

    const addYetMovies = () => {
        if (width >= Number(WIDTH_L)) {
            setGetYetMovies({ ...getYetMovies, WIDTH_L: getYetMovies["WIDTH_L"] + 4 })
        } else if (width >= Number(WIDTH_M)) {
            setGetYetMovies({ ...getYetMovies, WIDTH_M: getYetMovies["WIDTH_M"] + 3 })
        } else if (width >= Number(WIDTH_S)) {
            setGetYetMovies({ ...getYetMovies, WIDTH_S: getYetMovies["WIDTH_S"] + 1 })
        }
    }

    useEffect(() => {
        setIsLoadingAddMovies(true)
        if (width >= Number(WIDTH_L)) {
            setRenderMovies(filtredMovies.slice(0, getYetMovies["WIDTH_L"]))
        } else if (width >= Number(WIDTH_M)) {
            setRenderMovies(filtredMovies.slice(0, getYetMovies["WIDTH_M"]))
        } else if (width >= Number(WIDTH_S)) {
            setRenderMovies(filtredMovies.slice(0, getYetMovies["WIDTH_S"]))
        }
        setIsLoadingAddMovies(false)
    }, [width, filtredMovies, getYetMovies])


    return [renderMovies, addYetMovies, isLoadingAddMovies];
}

export default useAddMovies;
