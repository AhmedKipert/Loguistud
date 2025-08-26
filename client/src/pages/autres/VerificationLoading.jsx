
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
export const VerificationLoading = () => {
  return (
      <main className="flex-grow flex items-center justify-center w-full h-screen py-10">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center animate-fade-in">
          <div className="mb-6 text-[#2C5CD5] animate-spin">
            <FontAwesomeIcon icon={faCircleNotch} size="4x" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Vérification en cours...
          </h1>
          
          <div className="space-y-4 text-gray-600">
            <p>
              Nous vérifions votre lien de confirmation.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-[#2C5CD5] h-2.5 rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: '0%' }}
                onAnimationStart={(e) => e.target.style.width = '100%'}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              Cette opération ne devrait pas prendre plus d'une seconde
            </p>
          </div>
        </div>
      </main>
  );
};