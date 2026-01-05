import React, { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  FiUpload, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiFileText, 
  FiCheck, 
  FiChevronDown, 
  FiAlertCircle,
  FiLock
} from 'react-icons/fi';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  requirement: string;
  notes: string;
  file: File | null;
  recaptchaToken: string;
}

interface RequirementOption {
  id: string;
  label: string;
  icon: string;
}

interface Errors {
  [key: string]: string;
}

const DatasetProcessingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    requirement: '',
    notes: '',
    file: null,
    recaptchaToken: ''
  });

  const [selectedRequirement, setSelectedRequirement] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const requirementOptions: RequirementOption[] = [
    { id: 'visualization', label: 'Vizuallaşdırma', icon: '📊' },
    { id: 'report', label: 'Report hazırlaması', icon: '📝' },
    { id: 'cleaning', label: 'Data səliqəsi', icon: '🧹' }
  ];

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Ad və soyad tələb olunur';
        if (value.trim().length < 3) return 'Minimum 3 simvol';
        return '';
      case 'email':
        if (!value.trim()) return 'Email tələb olunur';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Düzgün email daxil edin';
        return '';
      case 'phone':
        if (!value.trim()) return 'Telefon tələb olunur';
        if (!/^[\d\s+()-]{9,}$/.test(value)) return 'Düzgün nömrə daxil edin';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleRequirementSelect = (requirement: string) => {
    setSelectedRequirement(requirement);
    setFormData(prev => ({ ...prev, requirement }));
    setIsDropdownOpen(false);
    setErrors(prev => ({ ...prev, requirement: '' }));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    const validTypes = ['.csv', '.xlsx', '.xls', '.json', '.txt', '.pdf', '.png', '.jpg', '.jpeg'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(fileExt)) {
      setErrors(prev => ({ ...prev, file: 'Yalnız CSV, Excel, JSON, PDF və ya şəkil faylları' }));
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: 'Fayl ölçüsü 50MB-dan çox ola bilməz' }));
      return;
    }
    
    setFormData(prev => ({ ...prev, file }));
    setIsUploaded(true);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setIsUploaded(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setRecaptchaVerified(true);
      setFormData(prev => ({ ...prev, recaptchaToken: token }));
      setErrors(prev => ({ ...prev, recaptcha: '' }));
    } else {
      setRecaptchaVerified(false);
      setFormData(prev => ({ ...prev, recaptchaToken: '' }));
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaVerified(false);
    setFormData(prev => ({ ...prev, recaptchaToken: '' }));
  };

  const handleSubmit = async () => {
    const newErrors: Errors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Ad və soyad tələb olunur';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Düzgün email daxil edin';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefon tələb olunur';
    if (!selectedRequirement) newErrors.requirement = 'Tələb seçilməlidir';
    if (!formData.file) newErrors.file = 'Fayl yüklənməlidir';
    if (!recaptchaVerified) newErrors.recaptcha = 'Təsdiqləmə tələb olunur';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form data:', formData);
      
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          requirement: '',
          notes: '',
          file: null,
          recaptchaToken: ''
        });
        setSelectedRequirement('');
        setIsUploaded(false);
        setRecaptchaVerified(false);
        setSubmitSuccess(false);
        setErrors({});
        
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }, 2000);
      
    } catch (error) {
      setErrors({ submit: 'Xəta baş verdi' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      requirement: '',
      notes: '',
      file: null,
      recaptchaToken: ''
    });
    setSelectedRequirement('');
    setIsUploaded(false);
    setRecaptchaVerified(false);
    setErrors({});
    
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-3 xs:p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Uğurlu!</h3>
          <p className="text-gray-400 text-sm sm:text-base">Müraciətiniz qəbul edildi. Tezliklə əlaqə saxlanılacaq.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-3 xs:p-4 sm:p-6">
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-700/50 rounded-xl sm:rounded-2xl shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8">
          
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Dataset Emal Xidməti</h2>
            <p className="text-gray-400 text-xs sm:text-sm">Müraciət forması</p>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-6">
            
            {/* Ad Soyad */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 flex items-center">
                <FiUser className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-blue-400" />
                Ad və Soyad <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                placeholder="Adınız və soyadınız"
                disabled={isLoading}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 flex items-center">
                <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-blue-400" />
                Email <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                placeholder="email@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 flex items-center">
                <FiPhone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-blue-400" />
                Telefon <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full bg-gray-800/50 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                placeholder="+994 55 123 45 67"
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Xidmet novu */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Tələb <span className="text-red-400 ml-1">*</span>
              </label>
              <button
                type="button"
                onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)}
                disabled={isLoading}
                className={`w-full bg-gray-800/50 border ${errors.requirement ? 'border-red-500' : 'border-gray-700'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base flex items-center justify-between hover:border-gray-600 transition-all`}
              >
                <span className={`truncate ${selectedRequirement ? 'text-white' : 'text-gray-500'}`}>
                  {selectedRequirement || 'Xidmət seçin'}
                </span>
                <FiChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 sm:mt-2 bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
                  {requirementOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleRequirementSelect(option.label)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-gray-800 transition-all flex items-center justify-between ${
                        selectedRequirement === option.label ? 'bg-blue-900/30 text-blue-300' : 'text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2 sm:gap-3">
                        <span className="text-base sm:text-lg">{option.icon}</span>
                        <span className="text-sm sm:text-base">{option.label}</span>
                      </span>
                      {selectedRequirement === option.label && (
                        <FiCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
              {errors.requirement && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  {errors.requirement}
                </p>
              )}
            </div>

          </div>

          {/* Qeydler */}
          <div className="mb-4 sm:mb-5">
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 flex items-center">
              <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-blue-400" />
              Əlavə qeydlər
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
              placeholder="Əlavə məlumat..."
              disabled={isLoading}
            />
          </div>

          {/* File Upload & Recaptcha */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-6">
            
            {/* File Upload */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Dataset faylı <span className="text-red-400 ml-1">*</span>
              </label>
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isLoading && !isUploaded && fileInputRef.current?.click()}
                className={`relative rounded-lg sm:rounded-xl border-2 border-dashed cursor-pointer transition-all p-3 sm:p-4 ${
                  isDragging ? 'border-blue-500 bg-blue-500/10' : 
                  isUploaded ? 'border-green-500 bg-green-500/10' : 
                  errors.file ? 'border-red-500 bg-red-500/5' :
                  'border-gray-600 hover:border-blue-500/50'
                }`}
              >
                {isUploaded ? (
                  <div className="text-center">
                    <FiCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white text-xs sm:text-sm font-medium mb-1 truncate" title={formData.file?.name}>
                      {formData.file?.name}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      {(formData.file!.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-xs transition-all"
                    >
                      Sil
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <FiUpload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-white text-xs sm:text-sm font-medium mb-1">Fayl yüklə</p>
                    <p className="text-xs text-gray-400">CSV, Excel, JSON, PDF</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv,.xlsx,.xls,.json,.txt,.pdf,.png,.jpg,.jpeg"
                  disabled={isLoading}
                />
              </div>
              {errors.file && (
                <p className="mt-1 text-xs text-red-400 flex items-center">
                  <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  {errors.file}
                </p>
              )}
            </div>

            {/* ReCAPTCHA */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Təhlükəsizlik <span className="text-red-400 ml-1">*</span>
              </label>
              <div className={`bg-gray-800/30 border ${errors.recaptcha ? 'border-red-500' : 'border-gray-700'} rounded-lg sm:rounded-xl p-3 sm:p-4 h-full flex flex-col justify-center`}>
                <div className="flex flex-col space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <FiLock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
                    <span className="text-white text-xs sm:text-sm">Robot deyiləm</span>
                  </div>
                  
                  {/* Google reCAPTCHA bileşeni */}
                  <div className="flex justify-center transform scale-90 sm:scale-100">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      onExpired={handleRecaptchaExpired}
                      theme="dark"
                      size={window.innerWidth < 640 ? "compact" : "normal"}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-gray-300 transition-colors text-xs"
                    >
                      Privacy
                    </a>
                    <span>•</span>
                    <a 
                      href="https://policies.google.com/terms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-gray-300 transition-colors text-xs"
                    >
                      Terms
                    </a>
                  </div>
                </div>
                
                {errors.recaptcha && (
                  <p className="mt-2 text-xs text-red-400 flex items-center">
                    <FiAlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                    {errors.recaptcha}
                  </p>
                )}
                
                {recaptchaVerified && (
                  <p className="mt-2 text-xs text-green-400 flex items-center">
                    <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                    Təsdiqləndi
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-20">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !recaptchaVerified}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs sm:text-sm">Göndərilir...</span>
                </>
              ) : (
                'Göndər'
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="px-4 sm:px-6 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg sm:rounded-xl font-medium transition-all border border-gray-700 text-sm sm:text-base py-2.5 sm:py-3 xs:w-auto w-full"
            >
              Təmizlə
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DatasetProcessingForm;