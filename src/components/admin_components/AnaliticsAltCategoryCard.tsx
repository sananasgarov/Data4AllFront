import { FaRegEdit } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import AnaliticsSwitchIcon from './AnaliticsSwitchIcon';
import { useNavigate } from 'react-router-dom';

type CategoryProps = {
    text: string,
    path: string
}
function AnaliticsAltCategoryCard({ text, path }: CategoryProps) {
    const nav = useNavigate()
    return (
        <div onClick={()=>nav(path)} className='flex flex-col gap-2 cursor-pointer rounded-[20px] border p-5'>
            <div className="flex justify-end">
                <div className="flex items-center gap-2">
                    <FaRegEdit className="cursor-pointer" onClick={(e) => { alert("btn edit"); e.stopPropagation() }} />
                    <FiTrash2 onClick={(e) => { alert("btn delete"); e.stopPropagation() }} className="cursor-pointer" />
                </div>
            </div>
                <p className='font-medium'>{text}</p>
                <div className='flex justify-end'>
                    <AnaliticsSwitchIcon />
                </div>
        </div>
    )
}

export default AnaliticsAltCategoryCard