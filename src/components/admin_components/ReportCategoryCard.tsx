import { FaRegEdit } from "react-icons/fa"
import { FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

function ReportCategoryCard({ subTitle, path }: { path: string, subTitle: string }) {
  const nav = useNavigate()
  return (
    <div onClick={() => nav(path)} className="rounded-[20px] cursor-pointer p-5 md:h-[112px] border text-white border-white">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <FaRegEdit onClick={(e) => { e.stopPropagation(); alert("active edit") }} className="cursor-pointer" />
          <FiTrash2 onClick={(e) => { e.stopPropagation(); alert("active delete") }} className="cursor-pointer" />
        </div>
      </div>
      <p className="font-medium">{subTitle}</p>
    </div>
  )
}

export default ReportCategoryCard