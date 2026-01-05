// components/PackageCard.tsx
import { useState } from "react";
import { FiX, FiEdit, FiCheck } from "react-icons/fi";

interface PackageCardProps {
  packageType?: 'standard' | 'premium';
  onClose?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  packageType = 'standard', 
  onClose 
}) => {
  const [selectedPackage, setSelectedPackage] = useState<'standard' | 'premium'>(packageType);

  const packages = {
    standard: {
      title: "Standard",
      price: "15 AZN",
      features: [
        "15 AZN aylıq",
        "50 dataset yükləmə", 
        "Bütün mövzu izahları",
        "Nəticə təhlili"
      ]
    },
    premium: {
      title: "Premium",
      price: "30 AZN",
      features: [
        "30 AZN aylıq",
        "100 dataset yükləmə",
        "Bütün mövzu izahları",
        "Nəticə təhlili",
        "Prioritet dəstək",
        "Xüsusi analitikalar"
      ]
    }
  };

  // Bağlama funksiyası
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // X düyməsinə klikləndikdə
  const handleXClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) onClose();
  };

  const currentPackage = packages[selectedPackage];
  const isStandard = selectedPackage === 'standard';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Əsas konteyner */}
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        {/* Blurlu arxa fon */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        ></div>

        {/* X düyməsi - Responsiv */}
        <button
          onClick={handleXClick}
          className="fixed top-4 right-4 md:top-8 md:right-8 bg-gray-800 hover:bg-gray-700 text-white p-2 md:p-3 rounded-full transition-colors border border-gray-600 z-30"
          aria-label="Bağla"
          type="button"
        >
          <FiX className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* "Yeni paket yarat" başlığı - Responsiv */}
        <div className="fixed top-4 left-4 md:top-8 md:left-8 z-20">
          <h1 className="text-2xl md:text-4xl font-bold text-white">Yeni paket yarat</h1>
        </div>

        {/* ƏSAS KART - Responsiv */}
        <div className="relative w-full max-w-[95vw] md:max-w-[380px] z-10">
          <div className="bg-[#0F0F1A] border border-gray-700 rounded-xl w-full p-4 md:p-6 shadow-2xl">
            {/* Paket adı */}
            <h2 className={`text-lg md:text-xl font-bold mb-2 ${isStandard ? 'text-blue-400' : 'text-purple-400'}`}>
              {currentPackage.title}
            </h2>

            {/* MƏBLƏĞ */}
            <div className="mb-3 md:mb-4">
              <p className="text-white text-base md:text-lg font-semibold">{currentPackage.price} aylıq</p>
            </div>

            {/* Edit düyməsi */}
            <div className="mb-4 md:mb-5">
              <button 
                className="text-gray-400 hover:text-white text-xs md:text-sm font-medium flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-gray-800 transition-colors border border-gray-600 w-full md:w-auto justify-center md:justify-start"
                type="button"
              >
                <FiEdit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Edit
              </button>
            </div>

            {/* Xüsusiyyətlər siyahısı */}
            <div className="space-y-2 md:space-y-2.5 mb-4 md:mb-5">
              {currentPackage.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-white text-xs" />
                  </div>
                  <span className="text-gray-300 text-xs md:text-sm flex-1">{feature}</span>
                </div>
              ))}
            </div>

            {/* Ayrıcı xətt */}
            <div className="border-t border-gray-800 my-3 md:my-4"></div>

            {/* Təsdiqlə düyməsi */}
            <button 
              className={`w-full ${isStandard ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white font-semibold py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base`}
              type="button"
            >
              Təsdiqlə
            </button>
          </div>
        </div>

        {/* MOBİL PLANŞET ÜÇÜN PAKET SEÇİMİ - Yalnız mobil/planşet üçün */}
        <div className="fixed bottom-4 left-0 right-0 z-20 px-4 md:hidden">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setSelectedPackage('standard')}
              className={`px-3 py-2 rounded-lg transition-colors ${selectedPackage === 'standard' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
              type="button"
            >
              Standard
            </button>
            <button
              onClick={() => setSelectedPackage('premium')}
              className={`px-3 py-2 rounded-lg transition-colors ${selectedPackage === 'premium' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'}`}
              type="button"
            >
              Premium
            </button>
          </div>
        </div>

        {/* YAN KARTLAR - Yalnız Desktop üçün (LG breakpoint-dən böyük) */}
        {/* SOL TƏRƏF KARTI - Standard */}
        <div className="hidden lg:block absolute top-1/2 left-[calc(50%-210px)] transform -translate-x-full -translate-y-1/2 z-0">
          <div className="bg-[#0F0F1A] border border-gray-700 rounded-xl w-[380px] p-6 blur-[8px] opacity-40">
            <h2 className="text-xl font-bold mb-2 text-blue-400">Standard</h2>
            <div className="mb-4">
              <p className="text-white text-lg font-semibold">15 AZN aylıq</p>
            </div>
            <div className="mb-5">
              <button className="text-gray-400 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600" type="button">
                <FiEdit className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-2.5 mb-5">
              {packages.standard.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-white text-xs" />
                  </div>
                  <span className="text-gray-300 text-sm flex-1">{feature}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 my-4"></div>
            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg text-base" type="button">
              Təsdiqlə
            </button>
          </div>
        </div>

        {/* SAĞ TƏRƏF KARTI - Premium */}
        <div className="hidden lg:block absolute top-1/2 right-[calc(50%-210px)] transform translate-x-full -translate-y-1/2 z-0">
          <div className="bg-[#0F0F1A] border border-gray-700 rounded-xl w-[380px] p-6 blur-[8px] opacity-40">
            <h2 className="text-xl font-bold mb-2 text-purple-400">Premium</h2>
            <div className="mb-4">
              <p className="text-white text-lg font-semibold">30 AZN aylıq</p>
            </div>
            <div className="mb-5">
              <button className="text-gray-400 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600" type="button">
                <FiEdit className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-2.5 mb-5">
              {packages.premium.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-white text-xs" />
                  </div>
                  <span className="text-gray-300 text-sm flex-1">{feature}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 my-4"></div>
            <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg text-base" type="button">
              Təsdiqlə
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;