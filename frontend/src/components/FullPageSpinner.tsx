import Loading from "./Loading"

const FullPageSpinner: React.FC = () => {

    return (
        <div className="loadingFullPageContainer">
            <Loading />
            <div className="pt_50px">Loading...</div>
        </div>
    )
}

export default FullPageSpinner