import AltCategoryAddForm from "@/components/admin_components/AltCategoryAddForm";
import AltCategoryCard from "@/components/admin_components/AltCategoryCard";
import { cardData } from "@/constants/reports";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom"

function AltCategoryPage() {
  const params = useParams();
  
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const clickedData = cardData.find((item) => item.subTitle == params.subTitle);
  const clickedItems = clickedData?.categories.find((item) => item.pathName == params.path);

  return (
    <>
      {
        clickedItems ? (
          <section className="px-5">
            <div className="flex justify-end">
              <div className="relative w-fit">
                <input type="text" placeholder="Dataset axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[260px] md:w-[356px] py-[10px]" />
                <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-5 pb-10">
              <h1 className="text-xl md:text-4xl font-semibold ">{clickedItems.title}</h1>
              <button onClick={() => setIsOpenAdd(!isOpenAdd)} className="cursor-pointer hover:bg-blue-700 duration-300 flex justify-center p-2 h-[45px] items-center gap-[6px] w-[134px] rounded-[10px] bg-[#3460DC]">
                <FaPlus />
                <p>Əlavə et</p>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-3">
              <AltCategoryCard data={clickedItems.data} />
            </div>
            {
              isOpenAdd && (
                <AltCategoryAddForm setIsOpenAdd={setIsOpenAdd} />
              )
            }
            {
              isOpenAdd && (
                <div onClick={() => setIsOpenAdd(!isOpenAdd)} className="inset-0 bg-black/40 h-screen fixed"></div>
              )
            }
          </section>
        ) : (
          <div className="text-2xl flex justify-center items-center">
            Yüklənir...
          </div>
        )
      }
    </>
  )
}

export default AltCategoryPage