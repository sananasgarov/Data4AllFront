import BackgroundVideo from "@/components/bg-video/BackgroundVideo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { MdDone } from "react-icons/md";

function NewPasswordAdmin() {
    const [showPopUp, setShowPopUp] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false);
    const [againShowPassword, setAgainShowPassword] = useState(false);
    const [msg, setMsg] = useState<null | string>()
    const [newData, setNewData] = useState({
        password: "",
        againPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setNewData((prev) => ({ ...prev, [id]: value }))
    }

    const handleChangeInputType = (e: React.MouseEvent<HTMLButtonElement>, field: string) => {
        e.preventDefault();
        if (field == "password") {
            setShowPassword(!showPassword)
        }
        else {
            setAgainShowPassword(!againShowPassword)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (againShowPassword != showPassword) {
            setMsg("Şifrələrdə fərqlilik var.")
        }
        else {
            setShowPopUp(true);
            setMsg(null)
            setNewData({
                password: "",
                againPassword: ""
            })
        }
    }

    return (
        <section className="flex flex-col justify-center h-[80vh] items-center text-white">
            <div className="video-background">
                <BackgroundVideo videoSrc="/about/bg-about.mp4" />
            </div>

            <div className="bg-[#202C3F] flex flex-col items-center gap-[44px] p-[30px] md:w-[614px] rounded-2xl">
                <div className="flex items-center flex-col gap-4">
                    <h2 className="text-3xl font-medium">Yeni şifrə yaradın</h2>
                    <h4 className="text-[16px]">Yeni şifrənizi təyin edin və yenidən daxil edin.</h4>
                </div>

                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-9">
                    <div className="relative w-full flex flex-col gap-2">
                        <Label htmlFor="password">Yeni şifrə</Label>
                        <Input
                            onChange={handleChange}
                            id="password"
                            value={newData.password}
                            type={showPassword ? "text" : "password"}
                            className="bg-white h-[52px] w-full px-4 text-black" />
                        <button onClick={(e) => handleChangeInputType(e, "password")} className="absolute cursor-pointer top-1/2 right-5">
                            {
                                showPassword ? <Eye className="text-neutral-500 " /> : <EyeOff className="text-neutral-500 " />
                            }
                        </button>
                    </div>

                    <div className="relative flex flex-col gap-2">
                        <Label htmlFor="againPassword">Şifrəni təsdiq edin</Label>
                        <Input
                            onChange={handleChange}
                            value={newData.againPassword}
                            id="againPassword" type={againShowPassword ? "text" : "password"} className="bg-white w-full h-[52px] px-4 text-black" />
                        <button onClick={(e) => handleChangeInputType(e, "againPassword")} className="cursor-pointer absolute top-1/2 right-5">
                            {
                                againShowPassword ? <Eye className="text-neutral-500 " /> : <EyeOff className="text-neutral-500 " />
                            }
                        </button>
                    </div>
                    {msg && <span className="text-red-500">{msg}</span>}
                    <Button type="submit" className="cursor-pointer w-full bg-[#3460DC] hover:bg-blue-500 duration-300 h-[54px] text-white font-medium rounded-[8px]">Yadda saxlayın</Button>
                </form>

            </div>
            {showPopUp &&
                <div className="absolute top-[30%] flex flex-col justify-around items-center left-[7%] md:left-[33%] bg-[#070618] w-[85vw] md:w-[35vw] h-[50vh] rounded-2xl p-5">
                    <p className="text-3xl font-medium">Şifrəniz Yeniləndi!</p>
                    <MdDone className="size-[86px] text-green-600" />
                    <Button onClick={() => setShowPopUp(false)} className=" cursor-pointer rounded-[8px] w-full bg-blue-600 hover:bg-blue-500 duration-300 text-white">Bağla</Button>
                </div>}
        </section>
    )
}

export default NewPasswordAdmin