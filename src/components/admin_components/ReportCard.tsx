import { FaRegEdit } from "react-icons/fa"
import { FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
type CardProps = {
  title: string,
  text: string,
  path: string
}
function ReportCard({ title, text, path }: CardProps) {
  const nav = useNavigate()
  return (
    <div onClick={()=>nav(path)} className="flex cursor-pointer flex-col gap-2 rounded-2xl px-8 py-6 border bg-[#070618] md:w-[353px] border-[#686868]">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
        <FaRegEdit className="cursor-pointer" onClick={(e)=>{alert("btn edit"); e.stopPropagation()}} />
        <FiTrash2 onClick={(e)=>{alert("btn delete"); e.stopPropagation()}} className="cursor-pointer" />
      </div>
      </div>
      <h4 className="text-xl md:text-2xl font-bold">{title}</h4>
      <p className="text-[14px] font-medium">{text}</p>
    </div>
  )
}

export default ReportCard