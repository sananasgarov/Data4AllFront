import { Button } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Label } from '../ui/label'
import { IoClose } from 'react-icons/io5'
type PropsType = {
    setIsOpenLink: Dispatch<SetStateAction<boolean>>
}
function AnaliticsEmbedLinkForm({ setIsOpenLink }: PropsType) {
    return (
        <form className="absolute flex flex-col justify-between z-50 bg-[#070618] p-8 top-[20%] right-[6%] md:right-[30%] h-[429px] w-[340px] md:w-[454px] rounded-2xl border-[1.5px] border-[#686868]">

            <div className="flex flex-col gap-[10px]">
                <div className='flex justify-end text-[25px]'>
                    <IoClose className='cursor-pointer' onClick={() => setIsOpenLink(false)} />
                </div>
                <Label className="text-[20px] font-semibold text-white">Embed link</Label>
                <textarea placeholder="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet. Lorem ipsum" className="resize-none text-sm font-medium h-[90px] md:h-[70px] placeholder:text-[#B1B1B1] rounded-[6px] p-[10px] border border-[#C2C2C2] w-full" />
            </div>
            <div className='flex flex-col gap-[10px]'>
                <Label className="text-[20px] font-semibold">Dashboard ölçüsü</Label>
                <div className='h-[74px] border '></div>
            </div>
            {/* buttons */}
            <div className="flex w-full justify-end">
                <div className="flex items-center gap-[15px] text-[16px] font-semibold">
                    <p onClick={() => setIsOpenLink(false)} className="cursor-pointer">Ləğv et</p>
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

export default AnaliticsEmbedLinkForm