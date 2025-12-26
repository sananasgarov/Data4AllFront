import Activites from "@/pages/admin/Activites"
import Indicators from "@/components/admin_components/indicators"

function AdminPage() {
  return (
    <section className="flex flex-col gap-10 min-h-[90vh] justify-between">
            <div className="bg-black rounded-2xl py-[17px] px-[28px] flex flex-col gap-6">
                <div className="flex gap-1">
                    <h2>Xoş gəlmisiniz,</h2>
                    <h2 className="font-medium">Admin!</h2>
                </div>
                <p>Aşağıdakı göstəricilər vasitəsilə platformada baş verən bütün fəaliyyətləri izləyə, statistik göstəriciləri analiz edə və idarəetmə prosesini daha səmərəli şəkildə həyata keçirə bilərsiniz.</p>
            </div>
            <Indicators />
            <Activites />
        </section>
  )
}

export default AdminPage