// pages/DatasetsPage.tsx
import DatasetProcessingForm from "@/components/admin_components/QuestionTable";

const QuestionPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DatasetProcessingForm />
      </div>
    </div>
  );
};

export default QuestionPage;