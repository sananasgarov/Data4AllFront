import ReportCategoryCard from "@/components/admin_components/ReportCategoryCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cardData } from "@/constants/reports"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom"

function SingleReportPage() {
    const params = useParams()
    const clickedData = cardData.find((data) => data.subTitle == params.subTitle);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    return (
        <section>
            <div className="flex justify-end">
                <div className="relative w-fit">
                    <input type="text" placeholder="Dataset axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[260px] md:w-[356px] py-[10px]" />
                    <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
                </div>
            </div>
            <div className="flex justify-between items-center py-5">
                <h1 className="text-xl md:text-4xl font-semibold ">Araşdırma & Hesabatlar</h1>
                <button onClick={() => setIsOpenAdd(!isOpenAdd)} className="cursor-pointer hover:bg-blue-700 duration-300 flex justify-center p-2 h-[45px] items-center gap-[6px] w-[134px] rounded-[10px] bg-[#3460DC]">
                    <FaPlus />
                    <p>Əlavə et</p>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    clickedData?.categories.map((item) => {
                        return (
                            <ReportCategoryCard key={item.id} path={item.pathName} subTitle={item.title} />
                        )
                    })
                }
            </div>
            {
                isOpenAdd && (
                    <form className="z-50 absolute flex flex-col w-[330px] md:w-[428px] gap-10 border-[1.5px] border-[#686868] top-[30%] right-[8%] md:right-[28%] rounded-2xl pt-3 pb-10 px-6 bg-[#070618]">
                        <h2 className="text-[22px] font-semibold">Yeni hesabat yarat</h2>
                        <div className="flex flex-col gap-[10px]">
                            <Label htmlFor="title" className="font-semibold text-[20px]">Başlıq adı</Label>
                            <Input id="title" className="resize-none  h-[69px] px-[20px] border border-[#BABABA] rounded-[6px] placeholder:text-[#BABABA]" placeholder="Başlıq 1" />
                        </div>
                        <div className="flex justify-end">
                            <div className="flex items-center gap-[15px] text-[16px] font-semibold">
                                <button className="cursor-pointer">Ləğv et</button>
                                <button type="submit" className="bg-[#3460DC] hover:bg-blue-700 duration-300 cursor-pointer rounded-[10px] p-2 h-[46px] w-[125px]">Təsdiqlə</button>
                            </div>
                        </div>
                    </form>
                )
            }
            {
                isOpenAdd && (
                <div onClick={()=>setIsOpenAdd(!isOpenAdd)} className="inset-0 bg-black/40 opacity-70 backdrop-blur-sm absolute"></div>    
                )
            }
        </section>
    )
}

export default SingleReportPage