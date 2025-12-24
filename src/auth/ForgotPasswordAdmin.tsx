import BackgroundVideo from "@/components/bg-video/BackgroundVideo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

const ForgotPasswordAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    navigate("/login1/forgot-password/otp-code")
  }
  return (
    <section className="text-white flex justify-center items-center h-[80vh] ">
      <div className="video-background">
        <BackgroundVideo videoSrc="/about/bg-about.mp4" />
      </div>

      <div className="bg-[#070618D9] md:w-[626px] p-[50px] flex flex-col items-center gap-11 rounded-2xl">
        <Link to="/login1" className="flex w-full justify-start">
          <FaChevronLeft className="text-2xl" />
        </Link>
        <h2 className="text-2xl md:text-3xl font-medium">Şifrənizi sıfırlayın</h2>
        <h4>Təsdiq kodunu almaq üçün e-poçt ünvanınızı daxil edin.</h4>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-9">
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">E-poçt ünvanınız</Label>
            <Input
              id="email"
              className="bg-white w-full h-12 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full text-[18px] font-medium h-12 duration-300 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            Kodu göndərin
          </Button>
        </form>
      </div>
    </section>
  )
}

export default ForgotPasswordAdmin