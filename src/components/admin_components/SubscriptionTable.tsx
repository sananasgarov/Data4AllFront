import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import PackageCard from "../../components/admin_components/CreatePackageForm";

const SubscriptionTable = () => {
  const [showPackageCard, setShowPackageCard] = useState(false);
  const [selectedPackageType, setSelectedPackageType] = useState<'standard' | 'premium'>('standard');
  const [isMobile, setIsMobile] = useState(false);
  
  const allUsers = [
    { id: 1, name: "Ali Aliyev", email: "ali@example.com", currentPlan: "Standart paket", subscriptionDate: "15.10.2025", status: "Standart" },
    { id: 2, name: "Ayşə Məmmədova", email: "ayse@example.com", currentPlan: "Premium paket", subscriptionDate: "15.10.2025", status: "Premium" },
    { id: 3, name: "Kənan Həsənov", email: "kenan@example.com", currentPlan: "Standart paket", subscriptionDate: "10.10.2025", status: "Standart" },
    { id: 4, name: "Leyla Quliyeva", email: "leyla@example.com", currentPlan: "Premium paket", subscriptionDate: "05.10.2025", status: "Premium" },
    { id: 5, name: "Rəşad Abdullayev", email: "resad@example.com", currentPlan: "Standart paket", subscriptionDate: "20.10.2025", status: "Standart" },
    { id: 6, name: "Nərminə Əliyeva", email: "nermine@example.com", currentPlan: "Premium paket", subscriptionDate: "25.10.2025", status: "Premium" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4; // Bütün cihazlarda daha çox göstərmək

  // Ekran ölçüsünü izlə
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Statusa klikləndikdə paket komponentini aç
  const handleStatusClick = (status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (status === "Standart") {
      setSelectedPackageType('standard');
    } else if (status === "Premium") {
      setSelectedPackageType('premium');
    }
    
    setShowPackageCard(true);
  };

  // Paket komponentini bağla
  const handleClosePackageCard = () => {
    setShowPackageCard(false);
  };

  // Mobil üçün qısaldılmış adlar
  const getShortName = (name: string) => {
    if (window.innerWidth < 640) { // sm breakpoint
      const parts = name.split(' ');
      return parts.length > 1 ? `${parts[0]} ${parts[1].charAt(0)}.` : name;
    }
    return name;
  };

  // Responsiv users per page
  const getUsersPerPage = () => {
    if (window.innerWidth < 640) return 2; // Mobil
    if (window.innerWidth < 1024) return 3; // Tablet
    return 4; // Desktop
  };

  // Pagination hesablamaları
  const currentUsersPerPage = getUsersPerPage();
  const indexOfLastUser = currentPage * currentUsersPerPage;
  const indexOfFirstUser = indexOfLastUser - currentUsersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allUsers.length / currentUsersPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Ekran ölçüsünə görə sütun sayı
  const getTableColumns = () => {
    if (window.innerWidth < 768) return 1; // Mobil - kart görünüşü
    if (window.innerWidth < 1024) return 3; // Tablet - az sütun
    return 5; // Desktop - bütün sütunlar
  };

  return (
    <>
      <div className="bg-[#0F0F1A] border border-gray-800 rounded-lg overflow-hidden w-full">
        {/* Desktop cədvəli - Tablet və Desktop üçün */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="p-3 sm:p-4 text-left font-medium text-gray-300 border-r border-gray-700 text-xs sm:text-sm">İstifadəçi</th>
                <th className="p-3 sm:p-4 text-left font-medium text-gray-300 border-r border-gray-700 text-xs sm:text-sm">Email</th>
                {getTableColumns() > 2 && (
                  <th className="p-3 sm:p-4 text-left font-medium text-gray-300 border-r border-gray-700 text-xs sm:text-sm">Cari Plan</th>
                )}
                {getTableColumns() > 3 && (
                  <th className="p-3 sm:p-4 text-left font-medium text-gray-300 border-r border-gray-700 text-xs sm:text-sm">Abunə Tarixi</th>
                )}
                <th className="p-3 sm:p-4 text-left font-medium text-gray-300 text-xs sm:text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 sm:p-4 border-r border-gray-700 text-xs sm:text-sm">{getShortName(user.name)}</td>
                  <td className="p-3 sm:p-4 border-r border-gray-700 text-xs sm:text-sm truncate max-w-[150px]" title={user.email}>
                    {user.email}
                  </td>
                  {getTableColumns() > 2 && (
                    <td className="p-3 sm:p-4 border-r border-gray-700 text-xs sm:text-sm">{user.currentPlan}</td>
                  )}
                  {getTableColumns() > 3 && (
                    <td className="p-3 sm:p-4 border-r border-gray-700 text-xs sm:text-sm">{user.subscriptionDate}</td>
                  )}
                  <td className="p-3 sm:p-4">
                    <button
                      onClick={(e) => handleStatusClick(user.status, e)}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group w-full justify-start"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        user.status === 'Premium' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}></span>
                      <span className={`text-xs sm:text-sm font-medium truncate ${
                        user.status === 'Premium' 
                          ? 'text-purple-300 group-hover:text-purple-200' 
                          : 'text-blue-300 group-hover:text-blue-200'
                      }`}>
                        {user.status}
                      </span>
                      <span className="text-xs opacity-0 group-hover:opacity-70 transition-opacity ml-auto">
                        →
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobil kartlar - Kiçik ekranlar üçün */}
        <div className="sm:hidden">
          {currentUsers.map((user) => (
            <div key={user.id} className="border-b border-gray-800 p-3 hover:bg-gray-900/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{getShortName(user.name)}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{user.email}</p>
                </div>
                <button
                  onClick={(e) => handleStatusClick(user.status, e)}
                  className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0 ml-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    user.status === 'Premium' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}></span>
                  <span className={`text-xs font-medium ${
                    user.status === 'Premium' 
                      ? 'text-purple-300' 
                      : 'text-blue-300'
                  }`}>
                    {user.status}
                  </span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-400">Plan</p>
                  <p className="font-medium truncate">{user.currentPlan}</p>
                </div>
                <div>
                  <p className="text-gray-400">Abunə Tarixi</p>
                  <p className="font-medium">{user.subscriptionDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Hər iki görünüş üçün */}
        <div className="flex flex-col xs:flex-row items-center justify-between p-3 sm:p-4 border-t border-gray-800 gap-3">
          <div className="text-xs sm:text-sm text-gray-400 text-center xs:text-left order-2 xs:order-1">
            <span className="hidden xs:inline">{allUsers.length} istifadəçidən </span>
            {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, allUsers.length)} göstərilir
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 order-1 xs:order-2">
            <button 
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Əvvəlki səhifə"
            >
              <FiChevronLeft className="text-gray-400" size={18} />
            </button>
            
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline px-2 text-sm text-gray-300">Səhifə</span>
              <span className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded-md text-xs sm:text-sm font-medium min-w-[60px] text-center">
                {currentPage} / {totalPages}
              </span>
            </div>
            
            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Növbəti səhifə"
            >
              <FiChevronRight className="text-gray-400" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* PAKET KOMPONENTİ - TƏK VƏ DÜZGÜN YERDƏ */}
      {showPackageCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <PackageCard 
              packageType={selectedPackageType}
              onClose={handleClosePackageCard}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionTable;