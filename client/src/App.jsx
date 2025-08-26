
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { InscriptionEtudiant } from './pages/etudiants/InscriptionEtudiant'
import { Connexion } from './pages/authentification/Connexion'
import TableauDeBordEtudiant from './pages/etudiants/Dashboard'
import Chargement from './components/Chargement'
import Conditions from './pages/etudiants/Conditions'
import Politiques from './pages/autres/politiques'
import CentreAide from './pages/autres/aide'
import NotFoundPage from './pages/autres/404'
import Home from './pages/Home'
import FAQPage from './pages/FAQ'
import ContactPage from './pages/autres/Contact'
import Conseils from './pages/autres/conseils'
import TableauDeBordProprietaire from './pages/proprietaires/DashboardProprietaire'
import Annonce from './pages/autres/Annonce'
import ChoixProfil from './pages/autres/ChoixProfil'
import InscriptionProprietaire from './pages/proprietaires/InscriptionProprietaire'
import About from './pages/autres/About'
import CreationAnnonce from './pages/autres/CreationAnnonce'
import DetailAnnonce from './pages/autres/DetailsAnnonce'
import ProfilEtudiant from './pages/etudiants/ProfilEtudiant'
import ResetPasswordInstructions from './pages/autres/ResetPasswordInstructions'
import ForgotPassword from './pages/autres/ForgotPassword'
import CommentCaMarche from './pages/autres/CommentCaMarche'
import { ConfirmationEmail } from './components/autres/ConfirmationEmail'
import { Verification } from './components/autres/Verification'
import { VerificationFailed } from './pages/autres/VerificationFailed'
import { VerificationLoading } from './pages/autres/VerificationLoading'
import VerificationSuccess from './components/autres/VerificationSuccess'
import ServerErrorPage from './pages/autres/500'
import ParametreCompte from './pages/etudiants/EtudiantParametre'
import PageDocument from './pages/etudiants/EtudiantDocument'
import Messagerie from './pages/Messagerie'
import PageFavories from './pages/etudiants/EtudiantFavoris'
import TableauDeBordAdmin from './pages/admin/DashboardAdmin'
import SkeletonLoading from './pages/SkeletonLoading'
import PreferencesCookies from './pages/PreferencesCookies'
import BanniereCookies from './pages/BanniereCookies'
import PolitiquesCookies from './pages/PolitiquesCookies'
import EtudiantFavories from './pages/etudiants/EtudiantFavoris'
import InformationProfil from './pages/etudiants/EtudiantInformationProfil'
import AccueilDashboard from './pages/etudiants/AccueilDashboard'
import { Loading } from './pages/autres/Loading'
import AuthProvider from './context/AuthProvider'
import Navbar from './pages/autres/Navbar'
import Footer from './components/Footer'
import RoutePrivee from './pages/RoutePrivee'
import EspaceEtudiants from './pages/EspaceEtudiants'
import AnnoncesProprietaire from './pages/proprietaires/AnnoncesPropretaire'
import MesAnnonces from './pages/proprietaires/AnnoncesPropretaire'
import MessageProprietaire from './pages/proprietaires/MessageProprietaire'
import Chat from './pages/Chat'
import Ctest from './pages/proprietaires/Ctest'
import CtestAccueil from './CtestAccueil'
import Conversation from './pages/proprietaires/Conversation'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}

          <Route path='/etudiant/inscription' element={<InscriptionEtudiant />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/chargement' element={<Chargement />} />
          <Route path='/conditions' element={<Conditions />} />

          <Route path='/politiques' element={<Politiques />} />
          <Route path='/aide' element={<CentreAide />} />
          <Route path='/accueil' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/proprietaire/inscription' element={<InscriptionProprietaire />} />
          <Route path='/annonces' element={<Annonce />} />
          <Route path='/etudiant/profil' element={<ProfilEtudiant />} />

          <Route path='/annonces/:id' element={<DetailAnnonce />} />
          <Route path='/about' element={<About />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password-instructions' element={<ResetPasswordInstructions />} />
          <Route path='/choix-profile' element={<ChoixProfil />} />
          <Route path='/conseils' element={<Conseils />} />
          <Route path='/etudiant/parametre' element={<ParametreCompte />} />
          <Route path='/etudiant/documents' element={<PageDocument />} />
          <Route path='/messagerie' element={<Messagerie />} />
          <Route path='/politiques-cookies' element={<PolitiquesCookies />} />
          <Route path='/banniere-cookies' element={<BanniereCookies />} />
          <Route path='/preferences-cookies' element={<PreferencesCookies />} />
          <Route path='/skeleton' element={<SkeletonLoading />} />
          <Route path='/admin/dashboard' element={<TableauDeBordAdmin />} />
          <Route path='/etudiant/favories' element={<PageFavories />} />
          <Route path='/confirmation' element={<ConfirmationEmail />} />
          <Route path='/verification-loading' element={<VerificationLoading />} />
          <Route path='/verification' element={<Verification />} />
          <Route path='/verification-failed' element={<VerificationFailed />} />
          <Route path='/verification-success' element={<VerificationSuccess />} />
          <Route path='/fonctionnement' element={<CommentCaMarche />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/loading' element={<Loading />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/espace-etudiants' element={<EspaceEtudiants />} />

          {/* ROUTES PRIVÉES */}
          <Route element={<RoutePrivee />}>
          <Route path='/proprietaire/annonces' element={<MesAnnonces />} />
          <Route path='/proprietaire/messages' element={<MessageProprietaire />} />
            {/* Tableau de bord etudiant */}
            <Route path='/etudiant/dashboard' element={<TableauDeBordEtudiant />}>
              <Route index element={<AccueilDashboard />} />
              <Route path='parametres' element={<ParametreCompte />} />
              <Route path='favories' element={<EtudiantFavories />} />
              <Route path='documents' element={<PageDocument />} />
              <Route path='modifier-profil' element={<InformationProfil />} />
              <Route path='messagerie' element={<MessageProprietaire />}>
                <Route index element={<CtestAccueil/>}/>
                <Route path=":id" element={<Conversation/>}/>
              </Route>
              <Route path='parametres' element={<ParametreCompte />} />
            </Route>
            {/* Tableau de bord propriétaire */}
            <Route path='/proprietaire/dashboard' element={<TableauDeBordProprietaire />} />
            <Route path='/annonces/creer' element={<CreationAnnonce />} />
          </Route>

          {/* ERREUR 404 ET 500  */}
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/500' element={<ServerErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
