import { Link } from 'react-router-dom';

const LibraryArchive = ({ camNumber, bgColor }) => {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500">
            <Link to={`/practice/listening/cam-test/cam${camNumber}`} className="w-full flex items-center p-6 text-left transition-all duration-300 hover:bg-gray-50">
                <div className="relative mr-8 flex-shrink-0 group">
                    <div className="absolute top-1 -right-1 w-full h-full bg-gray-200 rounded-r-lg -z-10"></div>
                    <div className="absolute top-0.5 -right-0.5 w-full h-full bg-gray-100 rounded-r-lg -z-10"></div>
                    <div className={`w-16 h-20 ${bgColor} rounded-l-md rounded-r-lg shadow-[4px_0_15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                        <div className="absolute left-0 top-0 w-2 h-full bg-black/20 border-r border-white/10"></div>
                        <div className="absolute left-2.5 top-0 w-0.5 h-full bg-white/5"></div>
                        <div className="absolute left-0 top-4 w-2 h-[1px] bg-yellow-500/40"></div>
                        <div className="absolute left-0 bottom-4 w-2 h-[1px] bg-yellow-500/40"></div>
                        <span className="text-[8px] font-black uppercase opacity-60 tracking-[1px] mb-1">IELTS</span>
                        <span className="text-3xl font-black drop-shadow-md">{camNumber}</span>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-black text-[#1e3006] text-xl uppercase tracking-tight">Cambridge {camNumber}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 font-medium">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open w-3.5 h-3.5 mr-1.5" aria-hidden="true">
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg> 4 Tests
            </span>
                        <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones w-3.5 h-3.5 mr-1.5" aria-hidden="true">
                <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
              </svg> Listening
            </span>
                    </div>
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 transition-all duration-500 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-6 h-6" aria-hidden="true">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default LibraryArchive;