import IndicatorCard from "./IndicatorCard"

function Indicators() {
  const data = [
    {
      id:1,
      text:"Toplam istifadəçi",
      number:11210,
      artim:3,
      img:"/admin/qrafik-2.png"
    },
        {
      id:2,
      text:"Abunəliyi sonlandıranlar",
      number:11210,
      artim:3,
      img:"/admin/qrafik-1.png"
    },
        {
      id:3,
      text:"Aylıq qazanc",
      number:11210,
      artim:3,
      img:"/admin/qrafik-1.png"
    },
  ]
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <IndicatorCard data={data} />
    </section>
  )
}

export default Indicators