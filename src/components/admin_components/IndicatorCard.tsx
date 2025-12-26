import { IoMdArrowUp } from "react-icons/io"
import { FaManatSign } from "react-icons/fa6";

type dataType = {
  id: number,
  text: string,
  number: number,
  artim: number,
  img: string
}

function IndicatorCard({ data }: any) {
  return (
    <>
      {
        data.map((item: dataType) => {
          return (
            <div className="bg-black flex md:flex-row flex-col gap-3 justify-between items-center rounded-2xl px-5 py-8">
              <div className="flex flex-col gap-5">
                <p className="font-medium h-12">{item.text}</p>
                <p className="font-bold text-[32px] flex items-center gap-1">{item.number}
                  {
                    item.id == 3 ? (<FaManatSign className="text-[24px]" />
                    ) : null
                  }
                </p>
                <div className="flex items-center gap-1">
                  <IoMdArrowUp className="text-[#1EB564] font-medium" />
                  <p className="text-[#1EB564] font-medium">{item.artim}%</p>
                  <p>aylıq artım</p>
                </div>
              </div>
              <div className="w-[140px]">
                <img src={item.img} alt={item.text} />
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default IndicatorCard