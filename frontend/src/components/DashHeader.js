import {Link} from 'react-router-dom';

const DashHeader = () => {
    const content = (
        <header className='dash-header'>
            <div className='dash-header_container'>
                <Link to="/dash/notes">
                    <h1 className='dash-header_title'>Notes</h1>
                </Link>
                <nav className='dash-header_nav'>
                    nav
                </nav>
            </div>
        </header>
    )
    return content;
}

export default DashHeader