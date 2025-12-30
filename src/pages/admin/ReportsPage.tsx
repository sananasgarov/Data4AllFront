import ReportCard from "@/components/admin_components/ReportCard";
import { Input } from "@/components/ui/input";
import { cardData } from "@/constants/reports";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
function ReportsPage() {
    
    const [title, setTitle] = useState("")
    const [isOpenBtn, setIsOpenBtn] = useState(false)
    return (
        <section className="px-5">
            <div className="flex justify-end">
                <div className="relative w-fit">
                    <input type="text" placeholder="Dataset axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[260px] md:w-[356px] py-[10px]" />
                    <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
                </div>
            </div>
            <h1 className="text-4xl font-semibold py-5">Araşdırma & Hesabatlar</h1>
            <div className="flex md:flex-row flex-col gap-4">
                {
                    cardData.map((item) => {
                        return (
                            <ReportCard title={item.title} text={item.text} path={item.subTitle} key={item.id} />
                        )
                    })
                }
                <button onClick={() => setIsOpenBtn(!isOpenBtn)} className="cursor-pointer flex justify-center items-center rounded-2xl p-8 border border-dashed bg-[#070618] md:w-[353px] border-[#686868]">
                    <FaPlus className="text-[21px]" />
                </button>
                {
                    isOpenBtn && (
                        <form className="z-50 absolute flex flex-col w-[330px] md:w-[428px] gap-10 border-[1.5px] border-[#686868] top-[30%] right-[8%] md:right-[30%] rounded-2xl p-10 bg-[#070618]">
                            <div className="flex flex-col gap-[10px]">
                                <h2 className="font-semibold text-[20px]">Başlıq adı</h2>
                                <Input value={title} onChange={(e) => { setTitle(e.target.value) }} className="resize-none  h-[69px] px-[20px] border border-[#BABABA] rounded-[6px] placeholder:text-[#BABABA]" placeholder="Başlıq 1" />
                            </div>
                            <div className="flex justify-end">
                                <div className="flex items-center gap-[15px] text-[16px] font-semibold">
                                    <button onClick={() => setIsOpenBtn(!isOpenBtn)} className="cursor-pointer">Ləğv et</button>
                                    <button type="submit" onClick={() => setIsOpenBtn(!isOpenBtn)} className="bg-[#3460DC] cursor-pointer rounded-[10px] p-2 h-[46px] w-[125px]">Təsdiqlə</button>
                                </div>
                            </div>
                        </form>
                    )
                }
                {
                    isOpenBtn && (
                        <div onClick={() => setIsOpenBtn(!isOpenBtn)} className="inset-0 backdrop-blur-3xl absolute bg-black/40 opacity-50"></div>
                    )
                }
            </div>
        </section>
    )
}

export default ReportsPage