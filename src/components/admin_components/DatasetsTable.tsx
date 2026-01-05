import { useState } from "react";
import InternManagementPanel from "../../components/admin_components/İnternScchedule";
import DatasetDetailPanel from "./DatasetDetailPanel";
import { useNavigate } from 'react-router-dom';

interface Dataset {
  id: number;
  name: string;
  surname: string;
  fileName: string;
  status: 'not_assigned' | 'in_progress' | 'completed';
  interns: string[];
}

const DatasetsTable = () => {
      const navigate = useNavigate(); // Hook-u istifadə edin

  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: 1,
      name: "Əli",
      surname: "Məmmədov",
      fileName: "müştəri_məlumatları.xlsx",
      status: 'in_progress',
      interns: ["Aydın Əliyev", "Nərmin Həsənova"]
    },
    {
      id: 2,
      name: "Leyla",
      surname: "Hüseynova",
      fileName: "satış_statistikası.csv",
      status: 'not_assigned',
      interns: ["Aydın Əliyev", "Nərmin Həsənova"]
    },
    {
      id: 3,
      name: "Rəşad",
      surname: "Quliyev",
      fileName: "məhsul_kataloqu.pdf",
      status: 'completed',
      interns: ["Kəmalə Əhmədova"]
    },
    {
      id: 4,
      name: "Günay",
      surname: "Ələkbərova",
      fileName: "audit_hesabatı.docx",
      status: 'in_progress',
      interns: ["Elvin Məmmədov", "Səbinə Rzayeva"]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);
  const [selectedInterns, setSelectedInterns] = useState<{[key: number]: string}>({});
  const [selectedStatuses, setSelectedStatuses] = useState<{[key: number]: string}>({});
  const [selectedDatasets, setSelectedDatasets] = useState<Set<number>>(new Set());
  const [showInternPanel, setShowInternPanel] = useState(false);
  const [showDatasetDetail, setShowDatasetDetail] = useState(false);
  const [showProcessingForm, setShowProcessingForm] = useState(false); // Yeni state əlavə edin
  const [selectedDatasetId, setSelectedDatasetId] = useState<number | null>(null);
  const [selectedDatasetForEdit, setSelectedDatasetForEdit] = useState<Dataset | null>(null); // Redaktə üçün dataset

  // DatasetDetailPanel-i açmaq üçün funksiya
    const handleEditClick = (dataset: Dataset) => {
    navigate('/admin/commonQuestion', { 
      state: { dataset } // İstəyə görə dataset məlumatlarını da göndərə bilərsiniz
    });
  };
  const handleViewDatasetDetails = (datasetId: number) => {
    setSelectedDatasetId(datasetId);
    setShowDatasetDetail(true);
  };

  // DatasetDetailPanel-i bağlamaq üçün funksiya
  const handleCloseDatasetDetail = () => {
    setShowDatasetDetail(false);
    setSelectedDatasetId(null);
  };

  // DatasetProcessingForm açmaq üçün funksiya
  const handleEditDataset = (dataset: Dataset) => {
    setSelectedDatasetForEdit(dataset);
    setShowProcessingForm(true);
  };

  // DatasetProcessingForm bağlamaq üçün funksiya
  const handleCloseProcessingForm = () => {
    setShowProcessingForm(false);
    setSelectedDatasetForEdit(null);
  };

  // DatasetProcessingForm göndərildikdə
//Seçilmiş dataset-in məlumatlarını almaq
  const getSelectedDatasetData = () => {
    if (!selectedDatasetId) return undefined;
    
    const dataset = datasets.find(d => d.id === selectedDatasetId);
    if (!dataset) return undefined;

    const statusMap = {
      'not_assigned': 'təyin olunmayıb',
      'in_progress': 'icradadır',
      'completed': 'təyin olunub'
    } as const;

    return {
      id: dataset.id.toString(),
      fullName: `${dataset.name} ${dataset.surname}`,
      status: statusMap[dataset.status],
      fileSize: "2.4 GB",
      phone: "+994 55 123 45 67",
      mentorName: dataset.interns.length > 0 ? dataset.interns[0] : "Təyin edilməyib"
    };
  };


  // Qalan kodlar eyni qalır...
  const sortDatasets = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedDatasets = [...datasets].sort((a, b) => {
      if (key === 'name' || key === 'fileName') {
        const aValue = key === 'name' ? `${a.name} ${a.surname}` : a.fileName;
        const bValue = key === 'name' ? `${b.name} ${b.surname}` : b.fileName;
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      }
      if (key === 'status') {
        const statusOrder = { 'not_assigned': 0, 'in_progress': 1, 'completed': 2 };
        const aValue = statusOrder[a.status];
        const bValue = statusOrder[b.status];
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    setDatasets(sortedDatasets);
  };

  const toggleDatasetSelection = (id: number) => {
    const newSelected = new Set(selectedDatasets);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedDatasets(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedDatasets.size === filteredDatasets.length) {
      setSelectedDatasets(new Set());
    } else {
      setSelectedDatasets(new Set(filteredDatasets.map(d => d.id)));
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'not_assigned':
        return {
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          icon: '🔴',
          text: 'Təyin olunmayıb'
        };
      case 'in_progress':
        return {
          color: 'text-green-400',
          bg: 'bg-green-400/10',
          icon: '🟢',
          text: 'İcradadır'
        };
      case 'completed':
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          icon: '⚪',
          text: 'Tamamlanıb'
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          icon: '⚪',
          text: status
        };
    }
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return (
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const filteredDatasets = datasets.filter(dataset => 
    `${dataset.name} ${dataset.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.interns.some(intern => intern.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInternSelect = (datasetId: number, intern: string) => {
    setSelectedInterns(prev => ({
      ...prev,
      [datasetId]: intern
    }));
  };

  const handleStatusSelect = (datasetId: number, status: string) => {
    setSelectedStatuses(prev => ({
      ...prev,
      [datasetId]: status
    }));
  };

  const CustomCheckbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
    return (
      <div 
        onClick={onChange}
        className="w-4 h-4 rounded border-2 border-white bg-black cursor-pointer flex items-center justify-center transition-colors"
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    );
  };

  const InternDropdown = ({ datasetId, interns }: { datasetId: number, interns: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedValue = selectedInterns[datasetId] || (interns.length > 0 ? interns[0] : "");

    return (
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white cursor-pointer hover:border-blue-500 transition-colors flex justify-between items-center group"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className={`text-sm ${selectedValue ? "text-white" : "text-gray-500"}`}>
              {selectedValue || "Seçin"}
            </span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""} group-hover:text-blue-400`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
              {interns.map((intern, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleInternSelect(datasetId, intern);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer hover:bg-blue-500/10 transition-colors flex items-center gap-3 ${
                    selectedValue === intern ? "bg-blue-500/20 text-blue-400" : "text-white hover:text-blue-300"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-xs text-blue-400">{intern.charAt(0)}</span>
                  </div>
                  <span className="flex-1">{intern}</span>
                  {selectedValue === intern && (
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const StatusDropdown = ({ datasetId, currentStatus }: { datasetId: number, currentStatus: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedValue = selectedStatuses[datasetId] || getStatusConfig(currentStatus).text;
    const statusOptions = [
      { value: 'not_assigned', label: 'Təyin olunmayıb', icon: '🔴', color: 'text-red-400' },
      { value: 'in_progress', label: 'İcradadır', icon: '🟢', color: 'text-green-400' },
      { value: 'completed', label: 'Tamamlanıb', icon: '⚪', color: 'text-gray-400' }
    ];

    const currentConfig = getStatusConfig(currentStatus);

    return (
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer inline-block"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${currentConfig.bg} border border-gray-700 hover:border-blue-500 transition-colors group`}>
            <span className="text-sm">{currentConfig.icon}</span>
            <span className={`text-sm font-medium ${currentConfig.color}`}>
              {selectedValue}
            </span>
            <svg 
              className={`w-3 h-3 ${currentConfig.color} transition-transform ${isOpen ? "rotate-180" : ""} group-hover:text-blue-400`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-50 w-48 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    handleStatusSelect(datasetId, option.label);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer hover:bg-blue-500/10 transition-colors flex items-center gap-3 ${
                    selectedValue === option.label ? "bg-blue-500/20" : ""
                  }`}
                >
                  <span className="text-sm">{option.icon}</span>
                  <span className={`text-sm font-medium ${option.color} ${selectedValue === option.label ? 'text-blue-400' : ''}`}>
                    {option.label}
                  </span>
                  {selectedValue === option.label && (
                    <svg className="w-4 h-4 text-blue-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const handleShowInternPanel = () => {
    setShowInternPanel(true);
  };

  const handleCloseInternPanel = () => {
    setShowInternPanel(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseInternPanel();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4 sm:p-6">
        <div className="max-w-[1400px] mx-auto space-y-4 sm:space-y-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Göndərilən Datasetlər</h2>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">Bütün datasetlərin siyahısı və idarə edilməsi</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Excel İlə İxrac et
                </button>
                <button 
                  onClick={handleShowInternPanel}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Təcrübəçiləri göstər
                </button>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800 overflow-x-auto">
            <div className="mb-4 sm:mb-6 flex justify-end">
              <div className="relative w-full sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Datasetləri axtar..."
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-3 font-semibold text-gray-300 w-10 sm:w-12">
                      <CustomCheckbox
                        checked={selectedDatasets.size === filteredDatasets.length && filteredDatasets.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-3 font-semibold text-gray-300 w-40 sm:w-52">
                      <div 
                        className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                        onClick={() => sortDatasets('name')}
                      >
                        <span>Ad Soyad</span>
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-3 font-semibold text-gray-300 w-40 sm:w-64">
                      <div 
                        className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                        onClick={() => sortDatasets('fileName')}
                      >
                        <span>Fayl</span>
                        {getSortIcon('fileName')}
                      </div>
                    </th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-3 font-semibold text-gray-300 w-32 sm:w-44">
                      <div 
                        className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                        onClick={() => sortDatasets('status')}
                      >
                        <span>Status</span>
                        {getSortIcon('status')}
                      </div>
                    </th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-3 font-semibold text-gray-300 w-40 sm:w-52">
                      <span className="text-sm sm:text-base">Intern</span>
                    </th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-3 font-semibold text-gray-300 w-32 sm:w-44">
                      <span className="text-sm sm:text-base">Əməliyyatlar</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDatasets.map((dataset) => {
                    return (
                      <tr key={dataset.id} className="border-b border-gray-900 hover:bg-gray-900/30 transition-colors group">
                        <td className="py-2 sm:py-3 px-2 sm:px-3">
                          <CustomCheckbox
                            checked={selectedDatasets.has(dataset.id)}
                            onChange={() => toggleDatasetSelection(dataset.id)}
                          />
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-3">
                          <p className="text-white font-medium text-xs sm:text-sm">{dataset.name} {dataset.surname}</p>
                        </td>
                        
                        <td className="py-2 sm:py-3 px-2 sm:px-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-300 text-xs sm:text-sm truncate" title={dataset.fileName}>{dataset.fileName}</p>
                          </div>
                        </td>
                        
                        <td className="py-2 sm:py-3 px-2 sm:px-3">
                          <StatusDropdown datasetId={dataset.id} currentStatus={dataset.status} />
                        </td>
                        
                        <td className="py-2 sm:py-3 px-2 sm:px-3">
                          <InternDropdown datasetId={dataset.id} interns={dataset.interns} />
                        </td>
                        
                        <td className="py-2 sm:py-3 px-2 sm:px-3">
                          <div className="flex gap-1">
                            {/* Göz düyməsi - DatasetDetailPanel-i açır */}
                            <button 
                              onClick={() => handleViewDatasetDetails(dataset.id)}
                              className="p-1 sm:p-2 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 rounded-lg transition-colors"
                              title="Dataset məlumatlarına bax"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            
                            {/* Redaktə düyməsi - DatasetProcessingForm-u açır */}
                            <button 
                                              onClick={() => handleEditClick(dataset)} // Burada handleEditClick istifadə edin

                              className="p-1 sm:p-2 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 rounded-lg transition-colors"
                              title="Redaktə et - Dataset Emal Xidməti"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            
                            <button 
                              onClick={() => console.log(`Sil: ${dataset.id}`)}
                              className="p-1 sm:p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            
                            <button 
                              onClick={() => console.log(`Endir: ${dataset.fileName}`)}
                              className="p-1 sm:p-2 hover:bg-green-500/10 text-gray-400 hover:text-green-400 rounded-lg transition-colors"
                              title="Endir"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredDatasets.length === 0 && (
              <div className="text-center py-8 sm:py-16">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">Heç bir dataset tapılmadı</h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">Axtarış kriteriyasına uyğun dataset mövcud deyil.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Təcrübəçiləri Göstər Modal */}
      {showInternPanel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleBackdropClick}
        >
          <div className="w-full max-w-full sm:max-w-3xl mx-auto">
            <InternManagementPanel />
          </div>
        </div>
      )}

      {/* Dataset Detail Panel */}
      {showDatasetDetail && (
        <DatasetDetailPanel
          onClose={handleCloseDatasetDetail}
          datasetData={getSelectedDatasetData()}
        />
      )}

      {/* Dataset Processing Form */}
      {showProcessingForm && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative w-full max-w-full sm:max-w-3xl mx-auto">
          <button
            onClick={handleCloseProcessingForm}
            className="absolute -top-8 sm:-top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
            style={{
              position: 'absolute',
              top: '-32px',
              right: '0',
              color: 'white',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
        </div>
      </div>
    )}
  </>
);
};

export default DatasetsTable;