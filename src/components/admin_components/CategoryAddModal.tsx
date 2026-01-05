// components/CategoryAddModal.tsx
import { useState } from "react";

interface CategoryAddModalProps {
  onClose: () => void;
}

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      console.log("Yeni kateqoriya:", categoryName);
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
    <div className="fixed inset-0 z-50">
      {/* Blurlu arxa fon */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={handleCancel}
      ></div>
      
      {/* Modal məzmunu */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-black border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
            
            {/* Modal başlığı - sadə */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white text-center">
                Yeni kateqoriya əlavə et
              </h2>
            </div>

            {/* Modal gövdəsi */}
            <div className="px-6 pb-6">
              <form onSubmit={handleSubmit}>
                {/* Input sahəsi */}
                <div className="mb-8">
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Kateqoriya adını daxil edin"
                    disabled={isSubmitted}
                  />
                </div>

                {/* Uğur mesajı - vizual və gözəl */}
                {isSubmitted && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/30 border border-green-700/50 rounded-lg animate-pulse">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-green-400 text-lg font-medium">
                        Kateqoriya uğurla əlavə edildi!
                      </p>
                    </div>
                  </div>
                )}

                {/* Düymələr - sağ tərəfə və kiçildilmiş */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitted}
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!categoryName.trim() || isSubmitted}
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

export default CategoryAddModal;