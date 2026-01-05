import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiUpload, FiUser, FiPhone, FiFile, FiCheckCircle, FiClock, FiDatabase, FiDownload } from 'react-icons/fi';

interface DatasetDetailPanelProps {
  onClose: () => void;
  datasetData?: {
    id: string;
    fullName: string;
    status: 'təyin olunub' | 'təyin olunmayıb' | 'icradadır';
    fileSize: string;
    phone: string;
    mentorName: string;
  };
}

const DatasetDetailPanel: React.FC<DatasetDetailPanelProps> = ({ onClose, datasetData }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default məlumatlar
  const defaultData = {
    id: '1',
    fullName: 'Əli Hüseynov',
    status: 'icradadır' as const,
    fileSize: '2.4 GB',
    phone: '+994 55 123 45 67',
    mentorName: 'Ayşə Məmmədova'
  };

  const data = datasetData || defaultData;

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

  // Kartdan kənara kliklə bağlama
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Fayl seçmək üçün ikona kliklədikdə
  const handleFileIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      console.log('Seçilmiş fayl:', file);
    }
  };

  // Faylı endirmək funksiyası
  const handleDownloadFile = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = uploadedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const statusConfig = {
    'təyin olunub': {
      text: 'Təyin Olunub',
      icon: FiCheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-700'
    },
    'təyin olunmayıb': {
      text: 'Təyin Olunmayıb',
      icon: FiClock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-700'
    },
    'icradadır': {
      text: 'İcradadır',
      icon: FiDatabase,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-700'
    }
  };

  const StatusIcon = statusConfig[data.status].icon;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      {/* Kart */}
      <div 
        ref={cardRef}
        className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl h-auto min-h-[400px] sm:min-h-[450px] md:min-h-[500px] bg-black border border-gray-700 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden relative flex flex-col"
      >
        {/* Kart Başlığı - Ortada */}
        <div className="flex-shrink-0 flex items-center justify-center p-3 sm:p-4 border-b border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-white text-center">
            Dataset haqqında Məlumat
          </h2>
        </div>

        {/* Çıxmaq işarəsi - Sağ yuxarı küncdə */}
        <button
          onClick={onClose}
          className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 text-gray-300 hover:text-white hover:bg-gray-800/30 p-1.5 xs:p-2 rounded-lg transition-colors z-[61]"
          aria-label="Bağla"
        >
          <FiX className="w-4 h-4 xs:w-5 xs:h-5" />
        </button>

        {/* Kartın Gövdəsi - Responsiv flex/grid layout */}
        <div className="flex-grow flex flex-col md:flex-row">
          {/* Sol tərəf */}
          <div className="w-full md:w-1/2 p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col border-b md:border-b-0 md:border-r border-gray-700">
            {/* Ad Soyad */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 flex items-center">
                <FiUser className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                Ad Soyad
              </h3>
              <div className="bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <p className="text-white font-medium text-sm sm:text-base">{data.fullName}</p>
              </div>
            </div>

            {/* Status */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Status</h3>
              <div className={`${statusConfig[data.status].bgColor} border ${statusConfig[data.status].borderColor} rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between`}>
                <div className="flex items-center">
                  <StatusIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 ${statusConfig[data.status].color}`} />
                  <span className={`font-medium text-sm sm:text-base ${statusConfig[data.status].color}`}>
                    {statusConfig[data.status].text}
                  </span>
                </div>
              </div>
            </div>

            {/* Ölçü */}
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 flex items-center">
                <FiFile className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                Ölçü
              </h3>
              <div className="bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <p className="text-white font-medium text-sm sm:text-base">{data.fileSize}</p>
              </div>
            </div>
          </div>

          {/* Sağ tərəf */}
          <div className="w-full md:w-1/2 p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col">
            {/* Əlaqə Nömrəsi */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 flex items-center">
                <FiPhone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                Əlaqə Nömrəsi
              </h3>
              <div className="bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <p className="text-white font-medium text-sm sm:text-base">{data.phone}</p>
              </div>
            </div>

            {/* Təcrübəçi */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Təcrübəçi</h3>
              <div className="bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <p className="text-white font-medium text-sm sm:text-base">{data.mentorName}</p>
              </div>
            </div>

            {/* Dataset File */}
            <div className="flex-grow flex flex-col">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Dataset File</h3>
              <div className="flex-grow flex flex-col items-center justify-center">
                {/* Sadə ikonla fayl upload hissəsi */}
                <div 
                  onClick={handleFileIconClick}
                  className={`w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center rounded-lg sm:rounded-xl border-2 border-dashed cursor-pointer transition-all hover:scale-105 hover:border-blue-500 hover:bg-blue-900/10 ${
                    uploadedFile 
                      ? 'border-green-500 bg-green-900/10' 
                      : 'border-gray-600'
                  }`}
                >
                  {uploadedFile ? (
                    <>
                      <FiFile className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-green-400 mb-1 xs:mb-2" />
                      <span className="text-xs text-gray-300 text-center px-1 xs:px-2 truncate w-full text-[10px] xs:text-xs">
                        {uploadedFile.name.length > 15 
                          ? uploadedFile.name.substring(0, 12) + '...' 
                          : uploadedFile.name}
                      </span>
                      <span className="text-[10px] xs:text-xs text-gray-400 mt-0.5 xs:mt-1">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <FiUpload className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-gray-400 mb-1 xs:mb-2" />
                      <span className="text-xs text-gray-400">Fayl yüklə</span>
                    </>
                  )}
                </div>

                {/* Fayl adı göstərici */}
                {uploadedFile && (
                  <div className="mt-3 sm:mt-4 text-center">
                    <button
                      onClick={handleDownloadFile}
                      className="px-2.5 xs:px-3 py-1 xs:py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 mx-auto"
                    >
                      <FiDownload className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                      <span className="text-[10px] xs:text-xs">Endir</span>
                    </button>
                  </div>
                )}

                {/* Fayl tipi məlumatı */}
                <div className="mt-2 xs:mt-3 text-center">
                  <p className="text-[10px] xs:text-xs text-gray-500">
                    Dəstəklənən formatlar: PNG, JPG, CSV, PDF, Excel, Word, TXT
                  </p>
                </div>

                {/* Gizli file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".png,.jpg,.jpeg,.csv,.pdf,.xlsx,.docx,.txt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetailPanel;