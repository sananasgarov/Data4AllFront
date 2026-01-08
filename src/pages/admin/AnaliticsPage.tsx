import AnaliticsCard from "@/components/admin_components/AnaliticsCard"
import TitleAddComponent from "@/components/admin_components/TitleAddComponent"
import { analiticsData } from "@/constants/analitics"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"

function AnaliticsPage() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <section className="px-5">
            <div className="flex justify-end">
                <div className="relative w-fit">
                    <input type="text" placeholder="Analitika axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[260px] md:w-[356px] py-[10px]" />
                    <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
                </div>
            </div>
            <h1 className="text-4xl font-semibold py-5">Analitika</h1>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {
                    analiticsData.map((item) => {
                        return (
                            <AnaliticsCard key={item.id} path={item.path} title={item.title} text={item.text} id={item.id} analiz={item.analiz} />
                        )
                    })
                }
                <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer bg-[#070618] flex justify-center text-2xl md:text-3xl items-center  rounded-[16px] border-[1.5px] py-8 px-5 border-[#686868]">
                    <FaPlus />
                </button>
            </div>
            {
                isOpen && (
                    <TitleAddComponent setIsOpen = {setIsOpen} title={null} />
                )
            }
            {
                    isOpen && (
                        <div onClick={() => setIsOpen(!isOpen)} className="inset-0 backdrop-blur-3xl absolute bg-black/40 opacity-50"></div>
                    )
                }
        </section>
    )
}

export default AnaliticsPage