import {Spinner} from 'react-bootstrap'

function SpinnerLoader (props){
    if (props.dataLoaded){
        return null
    }else {
    return(
        <div style={{position:'fixed', top:'50%', left:'50%'}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        )
    }
}

export default SpinnerLoader