import { sidebar } from "@/constants/sitebar";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"

function SideBar() {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className={`${isOpen ? "w-[50vw] md:w-[18vw]" : "w-[18vw]"} z-10 duration-300 fixed flex flex-col  justify-between text-white bg-[#070618]  md:pr-5 min-h-screen`}>


            <div className="flex flex-col md:-mr-5">
                <Link to={"/admin"} className="md:block hidden">
                    <img src="/logo.svg" alt="Logo" className="logo p-4" />
                    <hr className="h-[1px] w-full  bg-[#93939321]" />
                </Link>
                <div className="md:hidden flex justify-center gap-3 items-center pt-6 pb-3" onClick={() => setIsOpen(!isOpen)}>
                    {
                        isOpen ? (
                            <FaChevronLeft />
                        ) : (
                            <FaChevronRight />

                        )
                    }
                </div>
                <div className="flex flex-col pt-3">
                    {
                        sidebar.map((item) => {
                            const isActive = pathname == item.path
                            return (
                                <Link key={item.id} to={item.path} className={`${isActive ? "bg-[#3460DC]" : ""} hover:bg-[#3460DC] px-6 py-2 flex gap-3 items-center`}>
                                    <img src={item.icon} alt={item.text} />
                                    <p onClick={() => setIsOpen(!isOpen)} className={`text-[16px]  md:flex md:translate-x-0 ${isOpen ? "translate-x-0" : "translate-x-[-70vw]"}`}>{item.text}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            <div>
                <Link to="/admin" onClick={() => setIsOpen(!isOpen)} className="md:-mr-5 flex items-center gap-3 hover:bg-[#3460DC] px-6 py-2">
                    <img src="/icons/profil.svg" alt="icon" />
                    <p className={`${isOpen ? "translate-x-0" : "translate-x-[-70vw]"} md:translate-x-0 text-[16px] md:flex`}>Profil</p>
                </Link>

                <Link to="/admin" onClick={() => setIsOpen(!isOpen)} className="md:-mr-5 flex items-center gap-3 hover:bg-[#3460DC] px-6 py-3">
                    <img src="/icons/logout.svg" alt="icon" />
                    <p className={`${isOpen ? "translate-x-0" : "translate-x-[-70vw]"} md:translate-x-0 md:flex  text-[16px]`}>Çıxış</p>
                </Link>
            </div>



        </header>
    )
}

export default SideBar