import Spinner from 'react-bootstrap/Spinner';
import './SpinnerLoader.css'

function SpinnerLoader() {
    return (
        <div className='SpinnerLoader'>
            <Spinner animation="grow" />
        </div>
    )
}

export default SpinnerLoader;