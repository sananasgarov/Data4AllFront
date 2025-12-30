import { FiEdit, FiTrash2 } from "react-icons/fi"
import { LuDownload } from "react-icons/lu"
import { PiFilePdfLight } from "react-icons/pi"

type dataType = {
    title: string,
    text: string,
    path: string,
    id: number,
    link: string
}
interface dataTypeProps {
    data: dataType[]
}
function AltCategoryCard({ data }: dataTypeProps) {
    return (
        <>
            {
                data && data.map((item) => {
                    return (
                        <div className="rounded-[12px] md:h-[293px] justify-between flex flex-col gap-3 border py-6 px-6" key={item.id}>
                            <div className="flex justify-between items-center">
                                <p className="text-2xl md:text-4xl font-semibold">{item.title}</p>
                                <div className="flex gap-1 md:gap-3.5 items-center text-xl md:text-2xl">
                                    <FiEdit className="cursor-pointer" />
                                    <FiTrash2 className="cursor-pointer" />
                                    <LuDownload className="cursor-pointer" />
                                </div>
                            </div>
                            <p className="text-[16px] text-[#B2B1B6]">{item.text}</p>
                            <div className="flex gap-[10px]">
                                <PiFilePdfLight className=" cursor-pointer rounded-3xl  flex justify-center text-3xl text-[#5D80E3] backdrop-blur-sm bg-neutral-400/40 py-1 w-[45px] " />
                                <p className="rounded-3xl cursor-pointer  backdrop-blur-sm flex justify-center  bg-neutral-400/40 py-1 w-[45px] text-[#5D80E3]">CSV</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default AltCategoryCard