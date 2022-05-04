import React from 'react'
import { apiCall } from '../../utils/helpers'
import { constants } from '../../utils/constants'
import { IDataFilm, IStateSubmit, ICardFilm, ICardSection } from '../../utils/interfaces'
import FullPageSpinner from '../../components/FullPageSpinner'
import { useNavigate } from 'react-router-dom'
import './filsm.css'

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
    const [filmData, setFilmData] = React.useState<IDataFilm>()
    const [state, dispatch] = React.useReducer(submitReducer, initialState)

    const onSubmit = (imdbID: string) => {
        dispatch({ type: "loading" })
        const endpoint = `${constants.endpoints.findById}?imdbID=${imdbID}`
        apiCall(endpoint)
            .then(
                response => {
                    if (response.message?.Error) {
                        dispatch({ type: "error" })
                    } else {
                        setFilmData(response.message)
                        dispatch({ type: "success" })
                    }
                },
                error => {
                    dispatch({ type: "error" })
                })
    }

    return [onSubmit, filmData, state] as const
}

const CardSection: React.FC<ICardSection> = ({ head, body, split = false }) => {
    return (
        <div>
            <div className='headCardSection'>{head}</div>
            {split ? body.split(", ").map(e => <div key={e}>{e}</div>) : <div>{body}</div>}
        </div>
    )
}

const CardFilm: React.FC<ICardFilm> = ({ filmData }) => {
    const [isFavorite, setIsFavorite] = React.useState()
    const navigate = useNavigate()

    React.useEffect(() => {
        const endpoint = `${constants.endpoints.isFavorite}?imdbID=${filmData.imdbID}`
        apiCall(endpoint)
            .then(
                response => {
                    setIsFavorite(response.message)
                }
            )
    }, [])

    const addFavorite = (imdbID: string) => {
        apiCall(constants.endpoints.rateFilm, { data: { imdbID } })
            .then(
                response => {
                    setIsFavorite(response.message)
                }
            )
    }

    return (
        <div>
            <button type='button' className='customButton' onClick={() => navigate('/')}><i className="fa fa-arrow-left" aria-hidden="true" /> <span>Go Back</span></button>
            <div className='cardContainer' >
                <div className='cardInfo'>
                    <div className="square">
                        <div className="squareTitle">{filmData.Title}</div>
                        <div className="squareBody">
                            <b>{filmData.Runtime} - {filmData.Released}</b>
                            <CardSection head='Plot' body={filmData.Plot} />
                            <div className='peopleColumns'>
                                <CardSection head='Cast' body={filmData.Actors} split />
                                <CardSection head='Genre' body={filmData.Genre} split />
                                <CardSection head='Director' body={filmData.Director} split />
                            </div>
                            <div className='buttonsRateContainer'>
                                <span className='rateContainer'>
                                    <img src="/logo-imdb.svg" alt="logo-imdb" />
                                    <span className='ml_15px'>{filmData.Ratings.find(rat => rat.Source === "Internet Movie Database")?.Value}</span>
                                </span>
                                <span className='rateContainer'>
                                    <img src="/logo-rotten-tomatoes.svg" alt="logo-rotten-tomatoes" />
                                    <span className='ml_15px'>{filmData.Ratings.find(rat => rat.Source === "Internet Movie Database")?.Value}</span>
                                </span>
                                {isFavorite !== undefined && <button className='customButton' name='rateButton' type='button' onClick={() => addFavorite(filmData.imdbID)}><i className={isFavorite ? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true" /><span className='ml_5px'>{isFavorite ? "Delete from favourites" : "Add to favourites"}</span></button>}
                            </div>
                        </div>
                    </div>
                </div>
                <img src={filmData.Poster} alt={filmData.Title} className="posterImgCard" />
            </div>
        </div>
    )
}

const Films: React.FC = () => {
    const [onSubmit, filmData, submitState] = useSubmit()

    React.useEffect(() => {
        const idFilm = window.location.pathname.split("/").pop()
        if (idFilm) onSubmit(idFilm)
    }, [])

    return (
        <div className='filmContainer'>
            {submitState.loading && <FullPageSpinner />}
            {!submitState.loading && !submitState.message && filmData ?
                <CardFilm filmData={filmData} />
                :
                <span>{submitState.message}</span>
            }
        </div>
    )
}

export default Films