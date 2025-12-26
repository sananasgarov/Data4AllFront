import { Link } from "react-router-dom"

function AdminLogin_header() {
    return (
        <header className="pt-[30px] px-[30px] md:px-[72px]">
            <Link to={"/"}>
                <img src="/logo.svg" alt="Logo" className="logo" />
            </Link>
        </header>
    )
}

export default AdminLogin_header