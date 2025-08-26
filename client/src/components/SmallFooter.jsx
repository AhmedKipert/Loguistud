import { Link } from 'react-router-dom'

const SmallFooter = () => {
  return (
    <footer className="bg-white py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 LoguiStud. Tous droits réservés.</p>
          <p className="mt-1">
            <Link to="/conditions" className="hover:text-[#2C5CD5]">Conditions d'utilisation</Link> | 
            <Link to="/politiques" className="hover:text-[#2C5CD5]"> Politique de confidentialité</Link>
          </p>
        </div>
      </footer>
  )
}

export default SmallFooter