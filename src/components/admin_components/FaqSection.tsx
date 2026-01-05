import { FiEdit2, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

const FaqQuestions = () => {
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      question: "Qeydiyyat necə edim?",
      answer: "Ana səhifədə qeydiyyat düyməsinə basaraq, email və şifrə daxil edin.",
      isOpen: true 
    },
    { 
      id: 2, 
      question: "Ödənişi necə edə bilərəm?",
      answer: "Kredit kartı, bank kartı və ya elektron pul kisəsi ilə ödəniş edə bilərsiniz.",
      isOpen: true 
    },
    { 
      id: 3, 
      question: "Paketimi necə yeniləyə bilərəm?",
      answer: "Profil bölməsindən 'Paketlərim' sekmesinə keçin və istədiyiniz paketi seçin.",
      isOpen: true 
    },
  ]);

  const toggleQuestion = (id: number) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, isOpen: !q.isOpen } : q
    ));
  };

  return (
    <div className="space-y-2 xs:space-y-3">
      {questions.map((item) => (
        <div 
          key={item.id}
          className="bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-600 transition-colors"
        >
          {/* Sual başlığı */}
          <div 
            className="w-full p-2.5 xs:p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800/30 transition-colors group"
            onClick={() => toggleQuestion(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleQuestion(item.id);
              }
            }}
          >
            <div className="flex items-center gap-2 xs:gap-3 min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <span className="text-gray-200 text-xs xs:text-sm font-medium truncate block">
                  {item.question}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 block">
                  {item.isOpen ? 'Cavabı gizlət' : 'Cavabı göstər'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 ml-1 xs:ml-2 flex-shrink-0">
              <button 
                className="p-1 xs:p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors opacity-80 group-hover:opacity-100"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  console.log("Edit:", item.id);
                }}
                title="Düzəliş et"
                type="button"
                aria-label="Sualı düzəliş et"
              >
                <FiEdit2 className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
              </button>
              <button 
                className="p-1 xs:p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded transition-colors opacity-80 group-hover:opacity-100"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  console.log("Delete:", item.id);
                }}
                title="Sil"
                type="button"
                aria-label="Sualı sil"
              >
                <FiTrash2 className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
              </button>
              {item.isOpen ? (
                <FiChevronUp className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-gray-400 flex-shrink-0 ml-0.5 xs:ml-1" />
              ) : (
                <FiChevronDown className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-gray-400 flex-shrink-0 ml-0.5 xs:ml-1" />
              )}
            </div>
          </div>

          {/* Cavab hissəsi */}
          {item.isOpen && (
            <div className="px-3 xs:px-4 sm:px-5 pb-2.5 xs:pb-3 sm:pb-4 pt-2 xs:pt-2.5 sm:pt-3 border-t border-gray-800">
              <p className="text-gray-400 text-xs xs:text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqQuestions;