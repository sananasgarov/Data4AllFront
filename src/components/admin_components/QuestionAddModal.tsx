import { useState } from "react";

interface QuestionAddModalProps {
  onClose: () => void;
}

const QuestionAddModal: React.FC<QuestionAddModalProps> = ({ onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      console.log("Yeni sual:", question);
      console.log("Cavab:", answer);
      setIsSubmitted(true);
      
      // 2 saniyədən sonra modalı bağla
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurlu arxa fon */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={handleCancel}
      ></div>
      
      {/* Modal məzmunu */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          <div className="bg-black border border-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
            
            {/* Modal başlığı */}
            <div className="p-4 sm:p-5 md:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center">
                Yeni Sual Əlavə Et
              </h2>
            </div>

            {/* Modal gövdəsi */}
            <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
              <form onSubmit={handleSubmit}>
                {/* Sual input sahəsi */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Sual
                  </label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Sualı daxil edin"
                    disabled={isSubmitted}
                  />
                </div>

                {/* Cavab textarea sahəsi */}
                <div className="mb-6 sm:mb-7 md:mb-8">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Cavab
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none min-h-[100px] sm:min-h-[120px] md:min-h-[140px] transition-colors"
                    placeholder="Cavabı daxil edin"
                    disabled={isSubmitted}
                    rows={window.innerWidth < 640 ? 3 : window.innerWidth < 768 ? 4 : 5}
                  />
                </div>

                {/* Uğur mesajı */}
                {isSubmitted && (
                  <div className="mb-6 sm:mb-7 md:mb-8 p-3 sm:p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/30 border border-green-700/50 rounded-lg animate-pulse">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-green-400 text-sm sm:text-base md:text-lg font-medium text-center sm:text-left">
                        Sual uğurla əlavə edildi!
                      </p>
                    </div>
                  </div>
                )}

                {/* Düymələr - Responsiv düzülüş */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-2 sm:order-1"
                    disabled={isSubmitted}
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2"
                    disabled={!question.trim() || !answer.trim() || isSubmitted}
                  >
                    Təsdiq et
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAddModal;