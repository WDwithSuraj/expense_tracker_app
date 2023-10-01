
import { Link } from 'react-router-dom'


export const Toggle = () => {


    return (<>
        <div>
            <Link to={"/dashboard/stats"}>
                <div className="char-container">
                    Stats
                </div>
            </Link>
            <Link to={"/dashboard/recent"}>
                <div className="history-container">
                    Recent
                </div>
            </Link>
        </div>
    </>
    )
}
