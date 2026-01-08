import AnaliticsSwitchIcon from "@/components/admin_components/AnaliticsSwitchIcon";
import { Label } from "@/components/ui/label";
import { openDBData } from "@/constants/openDB";
import { Button } from "@mui/material";
import { useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCheckBox } from "react-icons/md";
import { useParams } from "react-router-dom"

function OpenDBSinglePage() {
    const params = useParams()
    const [isOpen, setIsOpen] = useState(false)
    console.log(params);
    const clickedCard = openDBData.find((item) => item.path == params.path)

    return (
        <section>
            {
                clickedCard ? (
                    <section className="px-5 py-5 md:py-9 flex flex-col gap-10">
                        <div className="flex md:flex-row flex-col gap-5 md:gap-0 justify-between md:items-center">
                            <h2 className="text-2xl md:text-4xl font-semibold">Açıq Məlumat Bazası</h2>
                            <div className="flex md:flex-row flex-col gap-3">
                                <button className="flex justify-center items-center border border-[#4072FF] gap-[6px] cursor-pointer rounded-[10px] bg-[#0638C6] px-4 py-2">
                                    <img src="/icons/excel.svg" alt="icon" className="size-[22px]" />
                                    <p className="text-[16px]">Excel ilə ixrac et</p>
                                </button>
                                <button onClick={() => setIsOpen(!isOpen)} className="text-[16px] cursor-pointer flex justify-center items-center gap-[6px] rounded-[10px] bg-[#0638C6] px-4 py-2">
                                    <FaPlus className="text-[12px]" />
                                    <p className="font-semibold">Dataset əlavə et</p>
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#070618] flex flex-col gap-9 border-[1.5px] border-[#686868] p-8 rounded-2xl">
                            <div className="flex md:flex-row flex-col-reverse gap-4 justify-between items-center">
                                <div className="flex  items-center gap-3 md:gap-6">
                                    <img src={clickedCard.img} className="size-[50px]" alt={clickedCard.path} />
                                    <p className="text-md md:text-2xl font-bold">{clickedCard.title}</p>
                                </div>
                                <div className="relative w-fit">
                                    <input type="text" placeholder="Analitika axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[200px] md:w-[356px] py-[10px]" />
                                    <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
                                </div>
                            </div>

                            <div className="w-full overflow-x-auto">
                                <div className="min-w-[900px]">

                                    {/* HEADER */}
                                    <div className="flex text-sm md:text-lg gap-10 items-center px-2">
                                        <div className="flex gap-2 items-center  md:w-[20%]">
                                            <p className="font-semibold">Dataset adı</p>
                                            <img src="/icons/sort.svg" className="size-[20px] md:size-[29px]" alt="icon" />
                                        </div>

                                        <div className="flex gap-2 items-center md:w-[25%]">
                                            <p className="font-semibold">Dataset kontenti</p>
                                            <img src="/icons/sort.svg" className="size-[20px] md:size-[29px]" alt="icon" />
                                        </div>

                                        <div className="flex gap-2 items-center md:w-[15%]">
                                            <p className="font-semibold">Dataset faylı</p>
                                            <img src="/icons/sort.svg" className="size-[20px] md:size-[29px]" alt="icon" />
                                        </div>

                                        <p className="font-semibold md:w-[15%] text-center">Saytda paylaş</p>
                                        <p className="font-semibold md:w-[15%] text-center">Əməliyyatlar</p>
                                    </div>

                                    <hr className="bg-[#D7D7D7] my-4 h-[1px]" />

                                    {/* BODY */}
                                    <div className="flex flex-col gap-4">
                                        {clickedCard.data.map((item, index) => (
                                            <div key={index}>
                                                <div className="flex items-center text-[#B1B1B1] px-2">

                                                    {/* Dataset adı */}
                                                    <div className="flex items-center gap-2  md:w-[23%] w-[20%]">
                                                        <MdOutlineCheckBox className="text-2xl text-white shrink-0" />
                                                        <p className="truncate">{item.name}</p>
                                                    </div>

                                                    {/* Kontent */}
                                                    <p className="md:w-[27%] w-[25%] truncate">{item.content}</p>

                                                    {/* Fayl */}
                                                    <p className="w-[15%] truncate">{item.file}</p>

                                                    {/* Switch */}
                                                    <div className="md:w-[20%] w-[15%] flex justify-center">
                                                        <AnaliticsSwitchIcon />
                                                    </div>

                                                    {/* Əməliyyatlar */}
                                                    <div className="w-[15%] flex justify-center gap-3 text-xl">
                                                        <FaRegEdit className="cursor-pointer" />
                                                        <FiTrash2 className="cursor-pointer" />
                                                    </div>

                                                </div>

                                                <hr className="mt-4 h-[1px] bg-[#7D7D7D9C]" />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>
                ) : (
                    <div className="flex justify-center items-center text-xl">
                        Yüklənir...
                    </div>
                )
            }
            {
                isOpen && (
                    <div className="absolute z-20 top-[4%] md:top-[3%] w-[300px] md:w-[444px] right-[12%] md:right-[35%] rounded-2xl border-[1.5px] bg-[#070618] border-[#686868] p-8 flex flex-col gap-4 ">
                        <div className="flex flex-col gap-[10px]">
                            <Label className="text-[20px] font-semibold">Dataset adı</Label>
                            <textarea className="border resize-none rounded-[6px] h-[69px] border-[#BABABA] p-[10px]" placeholder="Dataset adı-1" />
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            <Label className="text-[20px] font-semibold">Dataset təsviri</Label>
                            <textarea className="text-sm resize-none font-medium border rounded-[6px] h-[110px] md:h-[69px] border-[#BABABA] p-[10px]" placeholder="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet. Lorem ipsum" />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <Label className="text-[20px] font-semibold">Dataset kontenti</Label>
                            <textarea name="" id="" placeholder="Mətn" className="text-sm h-[100px] md:h-[69px] resize-none font-medium border rounded-[6px] border-[#C2C2C2] p-[10px]" />
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            <Label className="text-[20px] font-semibold">Dataset faylı</Label>
                            <input type="file" className="hidden" id="file" />
                            <Label htmlFor="file" className="border-2 hover:border-blue-600 dration-300 cursor-pointer border-[#373641] h-[70px] text-3xl flex justify-center items-center border-dashed rounded-[8px]">
                                <IoCloudUploadOutline />
                            </Label>
                        </div>
                        <div className="flex justify-end">
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
                    </div>
                )
            }
            {
                isOpen && (
                    <div onClick={() => setIsOpen(!isOpen)} className="inset-0 backdrop-blur-sm fixed bg-black/40 z-10"></div>
                )
            }
        </section>
    )
}

export default OpenDBSinglePage