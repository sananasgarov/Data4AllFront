// components/InternAddPanel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';

interface InternAddPanelProps {
  onClose: () => void;
  onInternAdded?: (internData: any) => void;
  onInternUpdated?: (updatedIntern: any) => void;
  initialData?: any;
}

const InternAddPanel: React.FC<InternAddPanelProps> = ({ onClose, onInternAdded, onInternUpdated, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Junior'
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      // Ensure surname validation checks for string "undefined" or "null" which might come from backend or previous errors
      const safeSurname = (initialData.surname && initialData.surname !== 'undefined' && initialData.surname !== 'null') 
        ? initialData.surname 
        : '';
        
      const fullName = safeSurname 
        ? `${initialData.name} ${safeSurname}` 
        : initialData.name;

      setFormData({
        name: fullName.trim(),
        email: initialData.email || '',
        phone: initialData.phone || '',
        experience: initialData.status 
          ? initialData.status.charAt(0).toUpperCase() + initialData.status.slice(1).toLowerCase() 
          : 'Junior'
      });
    }
  }, [initialData]);

  // Escape tuşu ilə bağlama
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Kliklə dropdown bağlama
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExperienceSelect = (level: string) => {
    setFormData(prev => ({
      ...prev,
      experience: level
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    
    try {
      // Use exact schema provided: { name, email, phone, status }
      const apiPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.experience.toUpperCase()
      };

      const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyMzRAZ21haWwuY29tIiwiaWF0IjoxNzcyMDQzNjEyLCJleHAiOjE3NzIwNDcyMTJ9.-bezA_y_b1MEL5L20d0yvx7YQP9sdTCQXP7oyZW0On4";
      
      let responseData;

      if (initialData) {
        // Edit mode
        const response = await axios.put(`http://45.94.4.187:8081/api/v1/intern/${initialData.id}`, apiPayload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        responseData = response.data;
        
        if (onInternUpdated) {
          // Prefer server response, fallback to payload + id
          const updatedIntern = responseData || { ...apiPayload, id: initialData.id };
          // Ensure status matches if server returns something else or nothing
          if (!updatedIntern.status) updatedIntern.status = apiPayload.status;
          
          onInternUpdated(updatedIntern);
        }
      } else {
        // Add mode
        // Change this URL if you have a base URL config or environment variable
        const response = await axios.post("http://45.94.4.187:8081/api/v1/intern", apiPayload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        responseData = response.data;

        if (onInternAdded) {
          onInternAdded(responseData || apiPayload);
        }
      }
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: 'Junior'
      });
      onClose();
    } catch (error) {
      console.error(initialData ? "Error updating intern:" : "Error adding intern:", error);
      // Optionally handle error display here
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const experienceOptions = [
    { value: 'Junior', label: 'Junior' },
    { value: 'Middle', label: 'Middle' },
    { value: 'Senior', label: 'Senior' }
  ];

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      {/* Üst sol küncdə başlıq */}
      <h1 className="absolute top-6 left-6 text-xl md:text-2xl font-bold text-white z-[61]">
        Göndərilən Datasetlər
      </h1>

      {/* Üst sağ küncdə bağlama düyməsi */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-300 hover:text-white hover:bg-gray-800/30 p-2 rounded-lg transition-colors z-[61]"
        aria-label="Bağla"
      >
        <FiX className="w-5 h-5" />
      </button>

      {/* Form Kartı */}
      <div 
        className="w-full max-w-[300px] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="bg-black border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            {/* Kart Başlığı */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white text-center">
                {initialData ? 'İntern Düzəliş Et' : 'İntern Əlavə Et'}
              </h2>
            </div>

            {/* Ağ nazik xətt */}
            <div className="border-t border-gray-700"></div>

            {/* Form Gövdəsi */}
            <div className="p-4 space-y-4">
              {/* Ad Inputu */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Ad və Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınızı daxil edin"
                  required
                />
              </div>

              {/* Email Inputu */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email daxil edin"
                  required
                />
              </div>

              {/* Əlaqə Nömrəsi Inputu */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Əlaqə Nömrəsi
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="055 123 45 67"
                  required
                />
              </div>

              {/* Təcrübəsi Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Təcrübəsi
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white flex items-center justify-between hover:border-gray-600 transition-colors"
                  >
                    <span className={formData.experience ? 'text-white' : 'text-gray-500'}>
                      {formData.experience || 'Seçin'}
                    </span>
                    <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown menyusu */}
                  {isDropdownOpen && (
                    <div className="absolute z-[70] w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden bottom-full mb-1">
                      {experienceOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleExperienceSelect(option.value)}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-800 transition-colors ${
                            formData.experience === option.value 
                              ? 'bg-blue-900/50 text-blue-300' 
                              : 'text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option.label}</span>
                            {formData.experience === option.value && (
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Kartın sağ yarısını əhatə edən düymələr */}
            <div className="p-4 pt-2">
              <div className="flex justify-end space-x-2">
                {/* Ləğv et düyməsi */}
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors border border-gray-700"
                >
                  Ləğv et
                </button>

                {/* Təsdiq et düyməsi */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Təsdiq et
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternAddPanel;