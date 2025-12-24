import BackgroundVideo from "@/components/bg-video/BackgroundVideo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom"

function Login1() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    return (
        <section className="text-white flex items-center justify-center h-[90vh] md:h-[80vh]">
            <div className="video-background">
                <BackgroundVideo videoSrc="/about/bg-about.mp4" />
            </div>

            <form className="bg-[#070618D9] p-[30px] rounded-2xl w-[614px] h-fit flex flex-col gap-7 md:gap-10">
                <legend className="text-3xl font-medium text-center">Daxil ol</legend>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">
                        E-poçt ünvanı qeyd edin
                    </Label>
                    <div>
                        <Input
                            id="email"
                            type="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="h-12 bg-white text-black"
                            required />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">
                        Şifrəniz    
                    </Label>
                    <div className="relative">
                        <Input
                            value={formData.password}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            className="h-12 border-2 pr-10 bg-white text-black"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>

                    </div>
                </div>
                <div className="flex justify-end">
                    <Link to="/login1/forgot-password" className="underline">Şifrəni unutdum</Link>
                </div>
                <Button
                    type="submit"
                    className="w-full text-[18px] font-medium h-12 duration-300 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                    Daxil olun
                </Button>
            </form>

        </section>
    )
}

export default Login1