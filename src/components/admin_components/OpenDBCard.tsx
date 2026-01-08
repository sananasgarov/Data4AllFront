import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import AnaliticsSwitchIcon from "./AnaliticsSwitchIcon";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { openDBData } from "@/constants/openDB";

function OpenDBCard() {
  const nav = useNavigate()
  return (
    <>
      {
        openDBData.map((item) => {
          return (
            <div onClick={()=>nav(item.path)} className='cursor-pointer bg-[#070618]  border-[1.5px] border-[#686868] rounded-2xl px-6 py-5 flex flex-col gap-4'>
              <div>
                <div className="flex justify-end pb-2">
                  <div className="flex items-center gap-2 text-lg">
                    <FaRegEdit className="cursor-pointer" onClick={(e) => { alert("btn edit"); e.stopPropagation() }} />
                    <FiTrash2 onClick={(e) => { alert("btn delete"); e.stopPropagation() }} className="cursor-pointer" />
                  </div>
                </div>
                <img src={item.img} alt="image" className='size-[70px]' />
              </div>
              <p className="font-bold text-2xl">{item.title}</p>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{item.number} hesabat</p>
                  <FaArrowRightLong />
                </div>
                <AnaliticsSwitchIcon />
              </div>
            </div>
          )
        })
      }

      <div className='bg-[#070618] h-[250px] border-dashed  border-[1.5px] border-[#686868] rounded-2xl px-6 py-5 flex justify-center items-center gap-4'>
        <FaPlus className="text-3xl" />
      </div>
    </>
  )
}

export default OpenDBCard