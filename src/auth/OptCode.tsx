import BackgroundVideo from "@/components/bg-video/BackgroundVideo"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OTPInput from "react-otp-input"
import { useNavigate } from "react-router-dom";
function OptCode() {
    const [otp, setOtp] = useState('');
    const [msg, setMsg] = useState<null | string>()
    const otpCode = "123456"
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (otp == otpCode) {
            navigate("/login1/forgot-password/new-password")
        }
        else {
            setMsg("Təsdiq kodu səhvdir.")
        }
    }
    return (
        <section className="text-white flex h-[80vh] items-center rounded-2xl justify-center">
            <div className="video-background">
                <BackgroundVideo videoSrc="/about/bg-about.mp4" />
            </div>

            <form onSubmit={handleSubmit} className="flex rounded-2xl flex-col items-center gap-11 bg-[#070618D9] py-[50px] px-9">
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-3xl font-medium">Kodu təsdiqləyin</h3>
                    <p className="text-[16px]">Zəhmət olmasa e-poçtunuza göndərilən kodu daxil edin və təsdiq edin.</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <OTPInput
                            inputStyle={{
                                width: "50px",
                                height: "50px",
                                color: "black",
                                borderRadius: "8px",
                                border: "1px solid",
                                textAlign: "center",
                                fontSize: "1.25rem",
                                backgroundColor: "#fff",
                            }}
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className="px-[2px]"></span>}
                            renderInput={(props) => <input  {...props} className="" />}
                        />
                    </div>
                    {msg && <span className="text-red-500">{msg}</span>}
                </div>
                <Button type="submit" className="text-white text-[18px] font-medium w-full bg-[#3460DC] rounded-[8px] h-12 cursor-pointer hover:bg-blue-500 duration-300">Təsdiq edin</Button>
            </form>
        </section>
    )
}

export default OptCode