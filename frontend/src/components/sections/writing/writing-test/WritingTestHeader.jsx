function WritingTestHeader({ test }) {
  return (
    <div className="flex items-center justify-between mb-2 mt-3">
      <div className="flex items-center gap-3 text-white">
        <h1 className="text-5xl font-bold tracking-tight" 
            style={{
                fontFamily: 'Playfair Display',
                }}>
          Writing test
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex bg-white/25 p-1 rounded-lg backdrop-blur-sm">
          <span className="px-4 py-1.5 rounded-md text-sm font-bold bg-white text-brand shadow-sm">
            {test.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default WritingTestHeader