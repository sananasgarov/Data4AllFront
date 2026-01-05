// components/InternManagementPanel.tsx
import React, { useState, useEffect } from 'react';
import { FiEdit, FiChevronDown, FiPlus, FiX } from 'react-icons/fi';
import InternAddPanel from './Addİnten';

interface Intern {
  id: number;
  name: string;
  surname: string;
  phone: string;
  level: 'Junior' | 'Middle' | 'Senior';
}

const InternManagementPanel: React.FC = () => {
  const [interns, setInterns] = useState<Intern[]>([
    { id: 1, name: 'Teyran', surname: 'Nağiyeva', phone: '055 323 29 23', level: 'Junior' },
    { id: 2, name: 'Əli', surname: 'Hüseynov', phone: '070 123 45 67', level: 'Middle' },
    { id: 3, name: 'Aysu', surname: 'Məmmədova', phone: '077 234 56 78', level: 'Senior' },
    { id: 4, name: 'Rəşad', surname: 'Əliyev', phone: '050 345 67 89', level: 'Junior' },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Escape tuşu ilə bağlama
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLevelChange = (id: number, newLevel: 'Junior' | 'Middle' | 'Senior') => {
    setInterns(interns.map(intern => 
      intern.id === id ? { ...intern, level: newLevel } : intern
    ));
    setOpenDropdownId(null);
  };

  const handleEdit = (id: number) => {
    console.log('Edit intern:', id);
  };

  const handleAddIntern = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  // Yeni intern əlavə etmə funksiyası
  const handleNewInternAdded = (newInternData: any) => {
    const newIntern: Intern = {
      id: interns.length + 1,
      name: newInternData.name,
      surname: newInternData.surname,
      phone: newInternData.phone,
      level: newInternData.experience as 'Junior' | 'Middle' | 'Senior'
    };
    
    setInterns([...interns, newIntern]);
    setShowAddForm(false);
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const getLevelColor = (level: 'Junior' | 'Middle' | 'Senior') => {
    switch (level) {
      case 'Junior': return 'bg-blue-900/30 text-blue-300 border-blue-700/40';
      case 'Middle': return 'bg-yellow-900/30 text-yellow-300 border-yellow-700/40';
      case 'Senior': return 'bg-purple-900/30 text-purple-300 border-purple-700/40';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Əsas panel */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
        onClick={handleBackdropClick}
      >
        {/* Üst sol küncdə başlıq */}
        <h1 className="absolute top-6 left-6 text-xl md:text-2xl font-bold text-white z-50">
          Göndərilən Datasetlər
        </h1>

        {/* Üst sağ küncdə bağlama düyməsi */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-300 hover:text-white hover:bg-gray-800/30 p-2 rounded-lg transition-colors z-50"
          aria-label="Bağla"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Təcrübəçi Siyahısı Kartı */}
        <div 
          className="w-full max-w-2xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gray-900/90 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden">
            {/* Kart Başlığı */}
            <div className="border-b border-gray-700/50 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  Təcrubəci siyahisi
                </h2>
                <button
                  onClick={handleAddIntern}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg hover:shadow-blue-500/20"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Əlavə et</span>
                </button>
              </div>
            </div>

            {/* Kart Gövdəsi */}
            <div className="p-5 max-h-[50vh] overflow-y-auto">
              {/* Alt Başlıq */}
              <h3 className="text-base font-medium text-gray-300 mb-4">
                Təcrubəciler
              </h3>

              {/* Təcrübəçi Cədvəli */}
              <div className="space-y-3">
                {interns.map((intern) => (
                  <div 
                    key={intern.id}
                    className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-4 hover:bg-gray-800/60 transition-colors group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Sol tərəf - Məlumatlar */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-medium text-sm">
                            {intern.name} {intern.surname}
                          </h4>
                          <button
                            onClick={() => handleEdit(intern.id)}
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg transition-colors opacity-80 group-hover:opacity-100"
                            title="Düzəliş et"
                          >
                            <FiEdit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-gray-400 text-xs">
                          📱 {intern.phone}
                        </p>
                      </div>

                      {/* Sağ tərəf - Səviyyə Dropdown */}
                      <div className="relative w-full sm:w-auto">
                        <button
                          onClick={() => toggleDropdown(intern.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getLevelColor(intern.level)} transition-all hover:opacity-90 min-w-[110px] justify-between`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{intern.level}</span>
                          </div>
                          <FiChevronDown className={`w-3 h-3 transition-transform ${openDropdownId === intern.id ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown menyusu */}
                        {openDropdownId === intern.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-20"
                              onClick={() => setOpenDropdownId(null)}
                            />
                            <div className="absolute z-30 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden right-0">
                              <button
                                onClick={() => handleLevelChange(intern.id, 'Junior')}
                                className={`w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-gray-800 transition-colors ${
                                  intern.level === 'Junior' ? 'bg-gray-800/60' : ''
                                }`}
                              >
                                <span className="text-xs font-medium text-blue-300">Junior</span>
                                {intern.level === 'Junior' && (
                                  <div className="ml-auto w-1 h-1 rounded-full bg-blue-400"></div>
                                )}
                              </button>
                              
                              <button
                                onClick={() => handleLevelChange(intern.id, 'Middle')}
                                className={`w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-gray-800 transition-colors ${
                                  intern.level === 'Middle' ? 'bg-gray-800/60' : ''
                                }`}
                              >
                                <span className="text-xs font-medium text-yellow-300">Middle</span>
                                {intern.level === 'Middle' && (
                                  <div className="ml-auto w-1 h-1 rounded-full bg-yellow-400"></div>
                                )}
                              </button>
                              
                              <button
                                onClick={() => handleLevelChange(intern.id, 'Senior')}
                                className={`w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-gray-800 transition-colors ${
                                  intern.level === 'Senior' ? 'bg-gray-800/60' : ''
                                }`}
                              >
                                <span className="text-xs font-medium text-purple-300">Senior</span>
                                {intern.level === 'Senior' && (
                                  <div className="ml-auto w-1 h-1 rounded-full bg-purple-400"></div>
                                )}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Əlavə Qeyd */}
              <div className="mt-6 pt-4 border-t border-gray-700/30">
                <p className="text-gray-400 text-xs text-center">
                  Cəmi {interns.length} təcrübəçi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İntern əlavə etmə formu */}
      {showAddForm && (
        <InternAddPanel 
          onClose={handleCloseAddForm}
          onInternAdded={handleNewInternAdded}
        />
      )}
    </>
  );
};

export default InternManagementPanel;