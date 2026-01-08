import AnaliticsEmbedLinkForm from "@/components/admin_components/AnaliticsEmbedLinkForm";
import AnaliticsSwitchIcon from "@/components/admin_components/AnaliticsSwitchIcon";
import { Label } from "@/components/ui/label";
import { analiticsData } from "@/constants/analitics";
import { Button } from "@mui/material";
import { useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCheckBox } from "react-icons/md";
import { useParams } from "react-router-dom"

function AnaliticsDataPage() {
    const params = useParams()
    const clickedData = analiticsData.find((item) => item.path == params.subTitle);
    const clickedItems = clickedData?.analitic.find((item) => item.path == params.path);
    const data = [
        {
            id: 1,
            question: "Qeydiyyatı necə edim?",
            link: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
            icon: true
        },
        {
            id: 2,
            question: "Qeydiyyatı necə edim?",
            link: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
            icon: true
        }
    ]
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLink, setIsOpenLink] = useState(false);
    return (
        <section className="flex flex-col gap-[28px] px-3 pt-10">
            {/* header */}
            <div className="flex md:flex-row gap-5 md:gap-0 flex-col justify-between md:items-center">
                <h2 className="text-[30px] font-semibold">{clickedItems?.text}</h2>
                <div className="flex md:flex-row flex-col gap-3">
                    <button className="flex justify-center items-center gap-[6px] cursor-pointer rounded-[10px] bg-[#0638C6] px-4 py-2">
                        <img src="/icons/excel.svg" alt="icon" className="size-[22px]" />
                        <p className="text-[16px] font-medium">Excel ilə ixrac et</p>
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex justify-center items-center gap-[6px] rounded-[10px] bg-[#0638C6] px-4 py-2">
                        <FaPlus className="text-[12px]" />
                        <p className="font-medium">Əlavə et</p>
                    </button>
                </div>
            </div>

            <div className="bg-[#070618BF flex flex-col gap-10 rounded-[16px] p-8">
                <div className="flex justify-end">
                    <div className="relative w-fit">
                        <input type="text" placeholder="Analitika axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[260px] md:w-[356px] py-[10px]" />
                        <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
                    </div>
                </div>

                <div className="overflow-x-scroll md:overflow-x-hidden">
                    <div className="flex text-lg gap-10 items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <p className="font-semibold ">Analitikanın adı</p>
                            <img src="/icons/sort.svg" className="size-[20px] md:size-[29px]" alt="icon" />
                        </div>

                        <div className="flex gap-2 items-center md:overflow-x-hidden overflow-x-scroll">
                            <p className="font-medium">Tableau dashboard embed link</p>
                            <img src="/icons/sort.svg" className="size-[29px]" alt="icon" />
                        </div>
                        <p className="font-semibold">Saytda paylaş</p>
                        <p className="font-semibold">Əməliyyatlar</p>
                    </div>
                    <hr className="bg-[#D7D7D7] my-4 w-full h-[1px]" />

                    <div className="">
                        {
                            data.map((item) => {
                                return (
                                    <div className="flex flex-col md:gap-5">
                                        <div key={item.id} className="flex text-sm gap-16 font-medium text-[#B1B1B1] justify-between items-center">
                                            <div className="flex items-center gap-1">
                                                <MdOutlineCheckBox className="text-2xl text-white bg-[#070618BF]" />
                                                <p className="">{item.question}</p>
                                            </div>
                                            <p className="  md:w-[25vw]">{item.link}</p>
                                            <div className=" md:w-[9vw] ">
                                                <AnaliticsSwitchIcon />
                                            </div>
                                            <div className="flex gap-2 text-2xl text-white md:w-[5vw]">
                                                <FaRegEdit className="cursor-pointer" />
                                                <FiTrash2 className="cursor-pointer" />
                                            </div>
                                        </div>
                                        <hr className="w-full my-4 bg-[#7D7D7D9C] h-[1px]" />
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            {
                isOpen && (
                    <form className="absolute flex flex-col gap-4 items-center z-30 right-[5%] md:right-[26%] p-8 top-[10%] h-[529px] w-[340px] md:w-[494px] bg-[#070618] border-[1.5px] border-[#686868] rounded-2xl">
                        <div className="flex w-full flex-col gap-1">
                            <Label className="text-[20px] font-semibold">Analitika adı</Label>
                            <input type="text" placeholder="Analitika adı" className="border text-[16px] font-semibold placeholder:text-white w-full border-[#BABABA] rounded-[6px] px-[10px] py-3" />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <Label htmlFor="text" className="text-[20px] font-semibold">Embed link</Label>
                            <textarea name="text" id="text" className="w-full border md:h-[70px] h-[90px] text-sm font-medium resize-none border-[#C2C2C2] rounded-[6px] p-[10px]" placeholder="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet. Lorem ipsum" />
                        </div>
                        <div onClick={() => setIsOpenLink(!isOpenLink)} className="cursor-pointer flex items-center rounded-[10px] py-2 px-3 gap-[6px] bg-[#3460DC] text-sm font-medium">
                            <FaPlus />
                            <p>Embed linki əlavə et</p>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="file" className="font-semibold text-[20px]">Dataset faylı</Label>
                            <input className="hidden" type="file" id="file" name="file" />
                            <Label htmlFor="file" className="border-[1.5px] border-[#373641] cursor-pointer flex text-3xl items-center justify-center border-dashed h-[83px] rounded-[8px] w-full">
                                <IoCloudUploadOutline />
                            </Label>
                        </div>
                        {/* buttons */}
                        <div className="flex w-full justify-end">
                            <div className="flex items-center gap-[15px] text-[16px] font-semibold">
                                <p onClick={() => setIsOpen(false)} className="cursor-pointer">Ləğv et</p>
                                <Button style={{
                                    borderRadius: "10px",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    textTransform: "none"
                                }}
                                    type="submit"
                                    className="bg-[#3460DC] hover:bg-blue-700 duration-300 cursor-pointer rounded-[10px] p-2 h-[46px] w-[125px]"
                                    variant="contained"
                                >Təsdiqlə
                                </Button>
                            </div>
                        </div>

                    </form>
                )
            }
            {
                isOpen && (
                    <div onClick={() => setIsOpen(!isOpen)} className=" fixed inset-0 backdrop-blur-xs bg-black/10 z-20"></div>
                )
            }
            {
                isOpenLink && (
                    <AnaliticsEmbedLinkForm setIsOpenLink = {setIsOpenLink} />
                )
            }
            {
                isOpenLink && (
                    <div onClick={()=>setIsOpenLink(!isOpenLink)} className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"></div>
                )
            }
        </section>
    )
}

export default AnaliticsDataPage