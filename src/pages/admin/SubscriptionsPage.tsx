// pages/SubscriptionPage.tsx
import SubscriptionTable from "../../components/admin_components/SubscriptionTable";

function SubscriptionPage() {
  return (
    <section className="min-h-screen bg-black text-white p-5">
      <h1 className="text-3xl font-bold mb-6">Abunelik Planları</h1>
      <h2 className="text-xl font-semibold mb-8">İstifcdeçiler ve Planları</h2>
      
      <SubscriptionTable />
    </section>
  );
}

export default SubscriptionPage;