// pages/FaqDashboard.tsx
import { useState } from "react";
import FaqQuestions from "../../components/admin_components/FaqSection";
import ChatbotCategories from "../../components/admin_components/ChatbotCategories";
import CategoryAddModal from "../../components/admin_components/CategoryAddModal";
import QuestionAddModal from "../../components/admin_components/QuestionAddModal";

const FaqDashboard = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-4 sm:p-6 md:p-8">
     
      {/* İki sütunlu layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 xl:gap-20 max-w-7xl mx-auto">
        {/* Sol sütun - FAQ Suallar */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              FAQ Suallar
            </h2>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto text-center"
              type="button"
              onClick={() => setIsQuestionModalOpen(true)}
            >
              + Sual Əlavə et
            </button>
          </div>
          <div className="mt-2 sm:mt-4">
            <FaqQuestions />
          </div>
        </div>

        {/* Sağ sütun - Chatbot Kateqoriyaları */}
        <div className="space-y-4 md:space-y-6 mt-8 xl:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Chatbot Kateqoriyaları
            </h2>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto text-center"
              type="button"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              + Kateqoriya Əlavə et
            </button>
          </div>
          <div className="mt-2 sm:mt-4">
            <ChatbotCategories />
          </div>
        </div>
      </div>

      {/* Kateqoriya Modalı */}
      {isCategoryModalOpen && (
        <CategoryAddModal onClose={handleCloseCategoryModal} />
      )}

      {/* Sual Modalı */}
      {isQuestionModalOpen && (
        <QuestionAddModal onClose={handleCloseQuestionModal} />
      )}
    </div>
  );
};

export default FaqDashboard;