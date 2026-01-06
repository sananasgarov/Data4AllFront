import OpenDBCard from "@/components/admin_components/OpenDBCard"
import { FiSearch } from "react-icons/fi"

function OpenDBPage() {
 
  return (
    <section className="p-5">
      <div className="flex justify-end">
        <div className="relative w-fit">
          <input type="text" placeholder="Dataset axtar..." className="rounded-[26px] border border-white pl-5 pr-12 placeholder:text-white placeholder:font-medium w-[260px] md:w-[356px] py-[10px]" />
          <FiSearch className="absolute right-5 text-white font-semibold text-xl top-3" />
        </div>
      </div>
        <h2 className="text-2xl md:text-4xl font-semibold py-5 md:pb-9">Açıq Məlumatlar Bazası</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OpenDBCard />
        </div>
    </section>
  )
}

export default OpenDBPage