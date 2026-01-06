import { Button } from "@mui/material"
import { Label } from "../ui/label"
import { Dispatch, SetStateAction } from "react"
type propsType = {
    title:string | null;
    setIsOpen:Dispatch<SetStateAction<boolean>>
}
function TitleAddComponent({ title,setIsOpen }:propsType) {
    return (
        <form className="flex z-50 border-[#686868] flex-col gap-4 justify-between  md:w-[428px] absolute border-[1.5px] rounded-2xl top-[30%] p-8 bg-[#070618] right-[5%] md:right-[33%]">
            {title && <p className="text-[22px] font-semibold">{title}</p>}
            <div className="flex flex-col gap-2">
                <Label className="text-[20px] font-semibold">Başlıq adı</Label>
                <textarea className="resize-none p-3 h-[80px] rounded-[6px] border border-[#BABABA]" placeholder="Başlıq 1" />
            </div>
            <div className="flex justify-end">
                <div className="flex items-center gap-[15px] text-[16px] font-semibold">
                    <p onClick={()=>setIsOpen(false)} className="cursor-pointer">Ləğv et</p>
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

export default TitleAddComponent