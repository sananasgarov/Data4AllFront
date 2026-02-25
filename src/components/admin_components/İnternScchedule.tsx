// components/InternManagementPanel.tsx
import React, { useState, useEffect } from 'react';
import { FiEdit, FiChevronDown, FiPlus, FiX, FiTrash2 } from 'react-icons/fi';
import InternAddPanel from './Addİnten';
import axios from 'axios';

interface Intern {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  status: 'JUNIOR' | 'MIDDLE' | 'SENIOR';
}

const InternManagementPanel: React.FC = () => {
  const [interns, setInterns] = useState<Intern[]>([]);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyMzRAZ21haWwuY29tIiwiaWF0IjoxNzcyMDQzNjEyLCJleHAiOjE3NzIwNDcyMTJ9.-bezA_y_b1MEL5L20d0yvx7YQP9sdTCQXP7oyZW0On4";
        const response = await axios.get("http://45.94.4.187:8081/api/v1/intern", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
        const fetchedInterns = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          surname: item.surname,
          phone: item.phone || "",
          email: item.email || "",
          status: (item.status ? item.status.toUpperCase() : 'JUNIOR') as 'JUNIOR' | 'MIDDLE' | 'SENIOR'
        }));
        
        setInterns(fetchedInterns);
      } catch (error) {
        console.error("Error fetching interns:", error);
      }
    };

    fetchInterns();
  }, []);

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIntern, setEditingIntern] = useState<Intern | null>(null);

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

  const handleStatusChange = async (id: number, newStatus: 'JUNIOR' | 'MIDDLE' | 'SENIOR') => {
    try {
      const intern = interns.find(i => i.id === id);
      if (!intern) return;

      const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyMzRAZ21haWwuY29tIiwiaWF0IjoxNzcyMDQzNjEyLCJleHAiOjE3NzIwNDcyMTJ9.-bezA_y_b1MEL5L20d0yvx7YQP9sdTCQXP7oyZW0On4";
      
      const safeSurname = (intern.surname && intern.surname !== 'undefined' && intern.surname !== 'null') ? intern.surname : '';
      const fullName = safeSurname ? `${intern.name} ${safeSurname}` : intern.name;

      await axios.put(`http://45.94.4.187:8081/api/v1/intern/${id}`, {
        name: fullName.trim(),
        email: intern.email,
        phone: intern.phone,
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setInterns(interns.map(intern => 
        intern.id === id ? { ...intern, status: newStatus } : intern
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setOpenDropdownId(null);
  };

  const handleEdit = (id: number) => {
    const internToEdit = interns.find(intern => intern.id === id);
    if (internToEdit) {
      setEditingIntern(internToEdit);
      setShowAddForm(true);
    }
  };

  const handleAddIntern = () => {
    setEditingIntern(null);
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setEditingIntern(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu intern-i silmək istədiyinizə əminsiniz?")) return;

    try {
      const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyMzRAZ21haWwuY29tIiwiaWF0IjoxNzcyMDQzNjEyLCJleHAiOjE3NzIwNDcyMTJ9.-bezA_y_b1MEL5L20d0yvx7YQP9sdTCQXP7oyZW0On4";
      await axios.delete(`http://45.94.4.187:8081/api/v1/intern/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setInterns(interns.filter(intern => intern.id !== id));
    } catch (error) {
      console.error("Error deleting intern:", error);
      alert("Xəta baş verdi: İntern silinə bilmədi.");
    }
  };

  // Yeni intern əlavə etmə funksiyası
  const handleNewInternAdded = (newInternData: any) => {
    // Check if name/surname are already separated
    let firstName, lastName;
    
    if (newInternData.surname !== undefined) {
      firstName = newInternData.name;
      lastName = newInternData.surname;
    } else {
      // Legacy fallback
      const nameParts = newInternData.name.split(' ');
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ') || '';
    }

    const newIntern: Intern = {
      // Prioritize the ID returned from server, fallback to generated one only if necessary
      id: newInternData.id ? newInternData.id : (interns.length > 0 ? Math.max(...interns.map(i => i.id)) + 1 : 1),
      name: firstName,
      surname: lastName,
      phone: newInternData.phone,
      email: newInternData.email,
      status: (newInternData.status ? newInternData.status.toUpperCase() : 'JUNIOR') as 'JUNIOR' | 'MIDDLE' | 'SENIOR'
    };
    
    setInterns([...interns, newIntern]);
    setShowAddForm(false);
  };

  const handleInternUpdated = (updatedData: any) => {
    let firstName, lastName;
    
    if (updatedData.surname !== undefined) {
      firstName = updatedData.name;
      lastName = updatedData.surname;
    } else {
      const nameParts = updatedData.name.split(' ');
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(' ') || '';
    }

    setInterns(interns.map(intern => 
      intern.id === updatedData.id 
        ? {
            ...intern,
            name: firstName,
            surname: lastName,
            phone: updatedData.phone,
            email: updatedData.email,
            status: (updatedData.status ? updatedData.status.toUpperCase() : 'JUNIOR') as 'JUNIOR' | 'MIDDLE' | 'SENIOR'
          }
        : intern
    ));
    setShowAddForm(false);
    setEditingIntern(null);
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

  const getStatusColor = (status: 'JUNIOR' | 'MIDDLE' | 'SENIOR') => {
    switch (status) {
      case 'JUNIOR': return 'bg-blue-900/30 text-blue-300 border-blue-700/40';
      case 'MIDDLE': return 'bg-yellow-900/30 text-yellow-300 border-yellow-700/40';
      case 'SENIOR': return 'bg-purple-900/30 text-purple-300 border-purple-700/40';
      default: return 'bg-gray-900/30 text-gray-300 border-gray-700/40';
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
                          <button
                            onClick={() => handleDelete(intern.id)}
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors opacity-80 group-hover:opacity-100"
                            title="Sil"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
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
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor(intern.status)} transition-all hover:opacity-90 min-w-[110px] justify-between`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{intern.status}</span>
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
                                onClick={() => handleStatusChange(intern.id, 'JUNIOR')}
                                className={`w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-gray-800 transition-colors ${
                                  intern.status === 'JUNIOR' ? 'bg-gray-800/60' : ''
                                }`}
                              >
                                <span className="text-xs font-medium text-blue-300">JUNIOR</span>
                                {intern.status === 'JUNIOR' && (
                                  <div className="ml-auto w-1 h-1 rounded-full bg-blue-400"></div>
                                )}
                              </button>
                              
                              <button
                                onClick={() => handleStatusChange(intern.id, 'MIDDLE')}
                                className={`w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-gray-800 transition-colors ${
                                  intern.status === 'MIDDLE' ? 'bg-gray-800/60' : ''
                                }`}
                              >
                                <span className="text-xs font-medium text-yellow-300">MIDDLE</span>
                                {intern.status === 'MIDDLE' && (
                                  <div className="ml-auto w-1 h-1 rounded-full bg-yellow-400"></div>
                                )}
                              </button>
                              
                              <button
                                onClick={() => handleStatusChange(intern.id, 'SENIOR')}
                                className={`w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-gray-800 transition-colors ${
                                  intern.status === 'SENIOR' ? 'bg-gray-800/60' : ''
                                }`}
                              >
                                <span className="text-xs font-medium text-purple-300">SENIOR</span>
                                {intern.status === 'SENIOR' && (
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
          onInternUpdated={handleInternUpdated}
          initialData={editingIntern}
        />
      )}
    </>
  );
};

export default InternManagementPanel;