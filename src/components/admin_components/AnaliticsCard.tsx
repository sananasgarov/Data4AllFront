import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import AnaliticsSwitchIcon from "./AnaliticsSwitchIcon";
import { useNavigate } from "react-router-dom";

type AnaliticCardType = {
    title: string,
    text: string,
    analiz: number,
    id: number,
    path:string
}
function AnaliticsCard({ title, text, analiz, id,path }: AnaliticCardType) {
    const cardId = id;
    console.log(cardId);
    const nav = useNavigate()
    return (
        <div onClick={()=>nav(path)} className="cursor-pointer rounded-[16px] border-[1.5px] bg-[#070618] py-8 px-5 border-[#686868]">
            <div className="flex justify-end pb-2">
                <div className="flex items-center gap-2">
                    <FaRegEdit className="cursor-pointer" onClick={(e) => { alert("btn edit"); e.stopPropagation() }} />
                    <FiTrash2 onClick={(e) => { alert("btn delete"); e.stopPropagation() }} className="cursor-pointer" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
                <p className="text-sm font-light">{text}</p>
            </div>
            <div className="flex items-center pt-4 gap-2 text-sm font-medium">
                <p>{analiz} analiz</p>
                <GoArrowRight />
            </div>
            <div className="flex justify-end">
                <AnaliticsSwitchIcon />
            </div>
        </div>
    )
}

export default AnaliticsCard