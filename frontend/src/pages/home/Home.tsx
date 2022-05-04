import React from 'react'
import CustomInput from '../../components/CustomInput'
import { apiCall } from '../../utils/helpers'
import { constants } from '../../utils/constants'
import { ISearchFilm, ISearchFilmData, IStateSubmit, IList, IPagination } from '../../utils/interfaces'
import SkeletonFilm from '../../components/SkeletonFilm'
import { useNavigate } from 'react-router-dom'
import './home.css'



const submitReducer = (state: IStateSubmit, action: { type: 'loading' | 'success' | 'error' }) => {
    switch (action.type) {
        case 'loading': {
            return { loading: true, message: null }
        }
        case 'success': {
            return { loading: false, message: null }
        }
        case 'error': {
            return { loading: false, message: "Film not found!" }
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}

const initialState: IStateSubmit = {
    loading: false,
    message: null
}

const useSubmit = () => {
    const [films, setFilms] = React.useState<ISearchFilm>()
    const [state, dispatch] = React.useReducer(submitReducer, initialState)

    const onSubmit = (inputValue: string, page: number = 1) => {
        if (inputValue) {
            dispatch({ type: "loading" })
            const endpoint = `${constants.endpoints.findFilm}?filmName=${inputValue}&page=${page}`
            apiCall(endpoint)
                .then(
                    response => {
                        if (response.message?.Error) {
                            dispatch({ type: "error" })
                        } else {
                            const filmsTmp: ISearchFilm = {
                                totalResults: response.message?.totalResults,
                                films: response.message?.Search
                            }
                            setFilms(filmsTmp)
                            dispatch({ type: "success" })
                        }
                    },
                    error => {
                        dispatch({ type: "error" })
                    })
        } else {
            setFilms(undefined)
        }
    }

    return [onSubmit, films, state] as const
}

const FilmList: React.FC<IList> = ({ filmsList }) => {
    const navigate = useNavigate()

    const clickFilm = (film: ISearchFilmData) => {
        navigate(`/film/${film.imdbID}`)
    }

    return (
        <div className='filmList'>
            {filmsList.films.map(film =>
                <span className='imgWrap' key={film.Title} onClick={() => clickFilm(film)}>
                    <img src={film.Poster} alt={film.Title} className="posterImg" />
                    <div className="imgDescription">
                        <p className="fontXLarge">{film.Year}</p>
                        <p>{film.Title}</p>
                    </div>
                </span>)}
        </div>
    )
}


const Pagination: React.FC<IPagination> = ({ filmsList, filmName, onSubmit }) => {
    const [page, setPage] = React.useState(1)

    const changePage = (newPage: number) => {
        setPage(newPage)
        onSubmit(filmName, newPage)
    }

    return (
        <div className='paginationContainer'>
            <b>Total results: {filmsList.totalResults}</b>
            <div>
                {page > 1 && <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => changePage(page - 1)} />}
                <span className='pageIndex'>{page}</span>
                {page * 10 < Number(filmsList.totalResults) && <i className="fa fa-arrow-right" aria-hidden="true" onClick={() => changePage(page + 1)} />}
            </div>
        </div>
    )
}

const Home: React.FC = () => {
    const [onSubmit, films, submitState] = useSubmit()
    const [filmFinded, setFilmFinded] = React.useState<string>("")

    const submitCall = (filmName: string) => {
        setFilmFinded(filmName)
        onSubmit(filmName)
    }

    return (
        <div className='homeContainer'>
            <CustomInput label='Film' onSubmit={submitCall} value={filmFinded} setValue={setFilmFinded} />
            {submitState.loading && <div className='filmList'>{Array.from({ length: 10 }, (_, i) => i + 1).map(e => <SkeletonFilm key={e} />)}</div>}
            {!submitState.loading && !submitState.message && films ?
                <FilmList filmsList={films} />
                :
                <span>{submitState.message}</span>
            }
            {films?.totalResults && Number(films.totalResults) > 10 && <Pagination filmsList={films} filmName={filmFinded} onSubmit={onSubmit} />}
        </div>
    )
}

export default Home