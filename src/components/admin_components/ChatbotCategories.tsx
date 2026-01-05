import { FiEdit2, FiTrash2, FiFolder } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ChatbotCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      id: 1, 
      name: "Ümumi Suallar", 
      description: "Ümumi istifadəçi sualları",
      questionCount: 12,
      color: "bg-blue-900/20",
      borderColor: "border-blue-900/30",
      route: "/admin/questionPage"
    },
    { 
      id: 2, 
      name: "Texniki Dəstək", 
      description: "Texniki problemlər və dəstək",
      questionCount: 9,
      color: "bg-purple-900/20", 
      borderColor: "border-purple-900/30",
      route: "/admin/chatbots"
    },
  ];

  const handleCategoryClick = (category: typeof categories[0]) => {
    navigate(category.route);
  };

  return (
    <div className="space-y-2 xs:space-y-3">
      {categories.map((category) => (
        <div 
          key={category.id}
          className={`${category.color} border ${category.borderColor} rounded-lg sm:rounded-xl p-2.5 xs:p-3 hover:bg-gray-800/20 transition-colors group cursor-pointer active:scale-[0.98]`}
          onClick={() => handleCategoryClick(category)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCategoryClick(category);
            }
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 xs:gap-3 flex-1 min-w-0">
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-900/50 flex items-center justify-center flex-shrink-0">
                <FiFolder className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-white font-medium text-xs xs:text-sm truncate">
                    {category.name}
                  </h3>
                  <span className="text-xs text-gray-400 bg-gray-900/50 px-1.5 py-0.5 rounded flex-shrink-0">
                    {category.questionCount} sual
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-0.5 truncate">
                  {category.description}
                </p>
              </div>
            </div>
            
            {/* Action düymələri */}
            <div 
              className="flex items-center gap-0.5 xs:gap-1 ml-1 xs:ml-2 flex-shrink-0" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="p-1 xs:p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-900/50 rounded transition-colors opacity-70 group-hover:opacity-100 active:scale-95"
                title="Düzəliş et"
                type="button"
                aria-label="Kateqoriyanı düzəliş et"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Düzəliş:", category.id);
                }}
              >
                <FiEdit2 className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button 
                className="p-1 xs:p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-900/50 rounded transition-colors opacity-70 group-hover:opacity-100 active:scale-95"
                title="Sil"
                type="button"
                aria-label="Kateqoriyanı sil"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Sil:", category.id);
                }}
              >
                <FiTrash2 className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatbotCategories;