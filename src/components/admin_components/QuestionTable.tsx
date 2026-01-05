import { useState } from "react";
import QuestionAddModal from "./QuestionAddModal";

interface Question {
  id: number;
  question: string;
  answer: string;
  isPublished: boolean;
}

const QuestionsTable = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "Saytınızda necə qeydiyyatdan keçə bilərəm?",
      answer: "Ana səhifədə 'Qeydiyyat' düyməsini klikləyib, şəxsi məlumatlarınızı dolduraraq qeydiyyatdan keçə bilərsiniz.",
      isPublished: true
    },
    {
      id: 2,
      question: "Ödənişi hansı üsullarla edə bilərəm?",
      answer: "Kart ilə ödəniş, bank köçürməsi və elektron pul kisələri ilə ödəniş edə bilərsiniz.",
      isPublished: false
    },
    {
      id: 3,
      question: "Çatdırılma müddəti nə qədərdir?",
      answer: "Çatdırılma müddəti ünvandan asılı olaraq 2-5 iş günü arasında dəyişir.",
      isPublished: true
    },
  ]);

  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sıralama funksiyası
  const sortQuestions = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedQuestions = [...questions].sort((a, b) => {
      if (key === 'question' || key === 'answer') {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    });

    setQuestions(sortedQuestions);
  };

  // Yayınlama durumunu değiştir
  const togglePublish = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, isPublished: !q.isPublished } : q
    ));
  };

  // Silme işlemi
  const handleDelete = (id: number) => {
    if (window.confirm("Bu sualı silmək istədiyinizə əminsiniz?")) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  // Yeni sual ekleme
  const handleAddQuestion = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Sıralama oku için icon
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Başlık ve Buton - Cədvəldən kənarda */}
      <div className="bg-black rounded-xl p-4 sm:p-6 border border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Umumi Suallar</h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1">Bütün sualların siyahısı və idarə edilməsi</p>
          </div>
          <button
            onClick={handleAddQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Sual Əlavə et</span>
          </button>
        </div>
      </div>

      {/* Cədvəl hissəsi */}
      <div className="bg-black rounded-xl p-4 sm:p-6 border border-gray-800 overflow-hidden">
        {/* Desktop cədvəli */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th 
                  className="text-left py-3 px-4 font-semibold text-gray-300 cursor-pointer hover:bg-gray-900 transition-colors text-sm"
                  onClick={() => sortQuestions('question')}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span>Suallar</span>
                    <span className="text-sm">{getSortIcon('question')}</span>
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 font-semibold text-gray-300 cursor-pointer hover:bg-gray-900 transition-colors text-sm"
                  onClick={() => sortQuestions('answer')}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span>Cavablar</span>
                    <span className="text-sm">{getSortIcon('answer')}</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm min-w-[120px]">
                  Saytda Paylaş
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm min-w-[100px]">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((item) => (
                <tr key={item.id} className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors">
                  {/* Sual sütunu */}
                  <td className="py-3 sm:py-4 px-3 sm:px-4">
                    <div className="max-w-xs sm:max-w-md">
                      <p className="text-white text-sm sm:text-base line-clamp-2 sm:line-clamp-3">{item.question}</p>
                    </div>
                  </td>
                  
                  {/* Cavab sütunu */}
                  <td className="py-3 sm:py-4 px-3 sm:px-4">
                    <div className="max-w-xs sm:max-w-xl">
                      <p className="text-gray-300 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">{item.answer}</p>
                    </div>
                  </td>
                  
                  {/* Paylaşma toggle */}
                  <td className="py-3 sm:py-4 px-3 sm:px-4">
                    <div 
                      onClick={() => togglePublish(item.id)}
                      className="relative inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isPublished}
                        readOnly
                      />
                      <div className="w-10 h-5 sm:w-12 sm:h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </td>
                  
                  {/* Əməliyyatlar butonları */}
                  <td className="py-3 sm:py-4 px-3 sm:px-4">
                    <div className="flex gap-1 sm:gap-2">
                      <button className="p-1.5 sm:p-2 hover:bg-gray-800 text-gray-400 hover:text-blue-400 rounded-lg transition-colors">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 sm:p-2 hover:bg-gray-800 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablet görünüşü (md:lg) */}
        <div className="hidden md:block lg:hidden">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th 
                  className="text-left py-3 px-4 font-semibold text-gray-300 cursor-pointer hover:bg-gray-900 transition-colors text-sm"
                  onClick={() => sortQuestions('question')}
                >
                  <div className="flex items-center gap-1">
                    <span>Suallar</span>
                    <span>{getSortIcon('question')}</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm min-w-[100px]">
                  Paylaş
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm min-w-[80px]">
                  Əməliyyatlar
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((item) => (
                <tr key={item.id} className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white text-sm font-medium line-clamp-2">{item.question}</p>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-1">{item.answer}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div 
                      onClick={() => togglePublish(item.id)}
                      className="relative inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isPublished}
                        readOnly
                      />
                      <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-blue-400 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobil kartlar */}
        <div className="md:hidden">
          <div className="space-y-3">
            {questions.map((item) => (
              <div key={item.id} className="border-b border-gray-800 pb-3 last:border-0">
                <div className="mb-2">
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{item.question}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2">{item.answer}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div 
                    onClick={() => togglePublish(item.id)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isPublished}
                        readOnly
                      />
                      <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {item.isPublished ? 'Paylaşılıb' : 'Paylaşılmır'}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-blue-400 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Boş tablo mesajı */}
        {questions.length === 0 && (
          <div className="text-center py-8 sm:py-12 text-gray-500">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-600 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-base sm:text-lg font-medium text-gray-400 mb-2">Heç bir sual tapılmadı</p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs sm:max-w-md mx-auto">
              Yeni sual əlavə etmək üçün yuxarıdakı "Sual Əlavə et" düyməsini klikləyin.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <QuestionAddModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default QuestionsTable;