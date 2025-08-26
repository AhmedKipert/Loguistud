
export const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center gap-5'>
        <div className="bg-blue-700 shadow-lg shadow-blue-400 transition w-20 h-20 animate-bounce text-white flex justify-center items-center rounded-full">
            <p className='font-bold text-3xl'>LS</p>
        </div>
        <div className="texte">
            <p className='text-4xl font-bold'>Logui<span className='text-blue-700 animate-pulse'>Stud</span></p>
        </div>
    </div>
  )
};
