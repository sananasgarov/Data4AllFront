import AnaliticsAltCategoryCard from "@/components/admin_components/AnaliticsAltCategoryCard";
import TitleAddComponent from "@/components/admin_components/TitleAddComponent";
import { analiticsData } from "@/constants/analitics";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom"


function AnaliticsAltCategory() {
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const clickedAnalitics = analiticsData.find((item) => item.path == params.subTitle);

  return (
    <>
      {
        clickedAnalitics ? (
          <section className="px-5">
            <div className="flex justify-end">
              <div className="relative w-fit">
                <input type="text" placeholder="Dataset axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[260px] md:w-[356px] py-[10px]" />
                <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-5 pb-10">
              <h1 className="text-xl md:text-4xl font-semibold ">{clickedAnalitics.title}</h1>
              <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer hover:bg-blue-700 duration-300 flex justify-center p-2 h-[45px] items-center gap-[6px] w-[134px] rounded-[10px] bg-[#3460DC]">
                <FaPlus />
                <p>Əlavə et</p>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {
                clickedAnalitics.analitic.map((item) => {
                  return (
                    <AnaliticsAltCategoryCard text={item.text} key={item.id} path={item.path} />
                  )
                })
              }
            </div>
            {
              isOpen && (
                <TitleAddComponent setIsOpen={setIsOpen} title="Yeni Hesabat yarat" />
              )
            }
            {
              isOpen && (
                <div onClick={() => setIsOpen(!isOpen)} className="inset-0 bg-black/40 fixed h-screen"></div>
              )
            }
          </section>
        ) : (<> </>)
      }
    </>
  )
}

export default AnaliticsAltCategory