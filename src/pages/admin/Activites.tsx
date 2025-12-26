import { data } from "@/constants/users"
import { Link } from "react-router-dom"

function Activites() {

  return (
    <section className="bg-black h-fit px-6 py-5 rounded-2xl">
      <div className="flex justify-between pb-6  text-sm font-medium">
        <h4>Son Fəaliyyətlər</h4>
        <Link to="" className="text-[#3460DC]">Hamısını gör</Link>
      </div>
      <div className="flex justify-between text-[13px] md:w-[74%] py-3">
        <p>FƏALİYYƏTLƏR</p>
        <p>TARİX</p>
      </div>
      <div className="overflow-x-scroll">
        {
          data.map((item) => {
            return (
              <div className="flex text-[13px] justify-between w-[120vw] md:w-full border-y border-[#686868] py-1 md:py-4">
                <p className="w-[80vw] md:w-[40vw]">{item.name} adlı şəxs hesab yaratdı.</p>
                <p>{item.date}</p>
                <Link to='' className="text-[#3460DC]">Detallı bax</Link>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Activites