// pages/DatasetsPage.tsx
import DatasetsTable from "../../components/admin_components/DatasetsTable";

const DatasetsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DatasetsTable />
      </div>
    </div>
  );
};

export default DatasetsPage;