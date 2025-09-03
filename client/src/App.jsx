
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { EtudiantInscription } from './pages/etudiants/EtudiantInscription'
import { Connexion } from './pages/authentification/Connexion'
import EtudiantDashboard from './pages/etudiants/EtudiantDashboard'
import Chargement from './components/Chargement'
import Conditions from './pages/etudiants/Conditions'
import Politiques from './pages/autres/politiques'
import CentreAide from './pages/autres/aide'
import NotFoundPage from './pages/autres/404'
import Accueil from './pages/Accueil'
import FAQPage from './pages/FAQ'
import ContactPage from './pages/autres/Contact'
import Conseils from './pages/autres/conseils'
import ProprietaireDashboard from './pages/proprietaires/ProprietaireDashboard'
import Annonce from './pages/autres/Annonce'
import ChoixProfil from './pages/autres/ChoixProfil'
import ProprietaireInscription from './pages/proprietaires/ProprietaireInscription'
import About from './pages/autres/About'
import CreationAnnonce from './pages/autres/CreationAnnonce'
import DetailAnnonce from './pages/autres/DetailsAnnonce'
import EtudiantProfile from './pages/etudiants/EtudiantProfile'
import ResetPasswordInstructions from './pages/autres/ResetPasswordInstructions'
import ForgotPassword from './pages/autres/ForgotPassword'
import CommentCaMarche from './pages/autres/CommentCaMarche'
import { ConfirmationEmail } from './components/autres/ConfirmationEmail'
import { Verification } from './components/autres/Verification'
import { VerificationFailed } from './pages/autres/VerificationFailed'
import { VerificationLoading } from './pages/autres/VerificationLoading'
import VerificationSuccess from './components/autres/VerificationSuccess'
import ServerErrorPage from './pages/autres/500'
import EtudiantParametres from './pages/etudiants/EtudiantParametres'
import EtudiantDocuments from './pages/etudiants/EtudiantDocuments'
import Messagerie from './pages/Messagerie'
import PageFavories from './pages/etudiants/EtudiantFavoris'
import AdminDashboard from './pages/admin/AdminDashboard'
import SkeletonLoading from './pages/SkeletonLoading'
import PreferencesCookies from './pages/PreferencesCookies'
import BanniereCookies from './pages/BanniereCookies'
import PolitiquesCookies from './pages/PolitiquesCookies'
import EtudiantFavoris from './pages/etudiants/EtudiantFavoris'
import InformationProfil from './pages/etudiants/EtudiantInformationProfile'
import EtudiantAccueil from './pages/etudiants/EtudiantAccueil'
import { Loading } from './pages/autres/Loading'
import AuthProvider from './context/AuthProvider'
import Navbar from './pages/autres/Navbar'
import Footer from './components/Footer'
import RoutePrivee from './pages/RoutePrivee'
import EspaceEtudiants from './pages/EspaceEtudiants'
import ProprietaireAnnonces from './pages/proprietaires/ProprietaireAnnonces'
import Chat from './pages/Chat'
import Ctest from './pages/proprietaires/Ctest'
import CtestAccueil from './CtestAccueil'
import Conversation from './pages/proprietaires/Conversation'
import { ProprietaireAccueil } from './pages/proprietaires/ProprietaireAccueil'
import ProprietaireAnnoncesTest from './pages/proprietaires/ProprietaireStatistiques'
import ProprietaireStatistiques from './pages/proprietaires/ProprietaireStatistiques'
import ProprietaireReservations from './pages/proprietaires/ProprietaireReservations'
import ProprietaireParametres from './pages/proprietaires/ProprietaireParametres'
import FormulaireLogement from './pages/autres/GeminiTest'
import './App.css';
import ProprietaireDetailsAnnonce from './pages/proprietaires/ProprietaireDetailsAnnonce'
import AdminAccueil from './pages/admin/AdminAccueil'
import AdminUtilisateurs from './pages/admin/AdminUtilisateurs'
import AdminProprietaires from './pages/admin/AdminProprietaires'
import AdminEtudiants from './pages/admin/AdminEtudiants'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}

          <Route path='/etudiant/inscription' element={<EtudiantInscription />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/testgemini' element={<FormulaireLogement />} />
          <Route path='/chargement' element={<Chargement />} />
          <Route path='/conditions' element={<Conditions />} />
          <Route path='/annonces-test' element={<ProprietaireAnnoncesTest />} />

          <Route path='/politiques' element={<Politiques />} />
          <Route path='/aide' element={<CentreAide />} />
          <Route path='/ctest' element={<Ctest />} />
          <Route path='/accueil' element={<Accueil />} />
          <Route path='/' element={<Accueil />} />
          <Route path='/proprietaire/inscription' element={<ProprietaireInscription />} />
          <Route path='/annonces' element={<Annonce />} />
          <Route path='/etudiant/profil' element={<EtudiantProfile />} />

          <Route path='/annonces/:id' element={<DetailAnnonce />} />
          <Route path='/about' element={<About />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password-instructions' element={<ResetPasswordInstructions />} />
          <Route path='/choix-profile' element={<ChoixProfil />} />
          <Route path='/conseils' element={<Conseils />} />
          <Route path='/etudiant/parametre' element={<EtudiantParametres />} />
          <Route path='/etudiant/documents' element={<EtudiantDocuments />} />
          <Route path='/messagerie' element={<Messagerie />} />
          <Route path='/politiques-cookies' element={<PolitiquesCookies />} />
          <Route path='/banniere-cookies' element={<BanniereCookies />} />
          <Route path='/preferences-cookies' element={<PreferencesCookies />} />
          <Route path='/skeleton' element={<SkeletonLoading />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/etudiant/favories' element={<PageFavories />} />
          <Route path='/confirmation' element={<ConfirmationEmail />} />
          <Route path='/verification-loading' element={<VerificationLoading />} />
          <Route path='/verification' element={<Verification />} />
          <Route path='/verification-failed' element={<VerificationFailed />} />
          <Route path='/verification-success' element={<VerificationSuccess />} />
          <Route path='/fonctionnement' element={<CommentCaMarche />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/espace-etudiants' element={<EspaceEtudiants />} />
          <Route path='/loading' element={<Loading />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/details' element={<ProprietaireDetailsAnnonce />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/espace-etudiants' element={<EspaceEtudiants />} />


          {/* ROUTES PRIVÉES */}
          <Route element={<RoutePrivee />}>
            <Route path='/proprietaire/annonces' element={<ProprietaireAnnonces />} />
            <Route path='/proprietaire/messages' element={<Messagerie />} />
            {/* Tableau de bord etudiant */}
            <Route path='/etudiant/dashboard' element={<EtudiantDashboard />}>
              <Route index element={<EtudiantAccueil />} />
              <Route path='parametres' element={<EtudiantParametres />} />
              <Route path='favories' element={<EtudiantFavoris />} />
              <Route path='documents' element={<EtudiantDocuments />} />
              <Route path='modifier-profil' element={<InformationProfil />} />
              <Route path='messagerie' element={<Messagerie />}>
                <Route index element={<CtestAccueil />} />
                <Route path=":id" element={<Conversation />} />
              </Route>
              <Route path='parametres' element={<EtudiantParametres />} />
            </Route>

            {/* Tableau de bord propriétaire */}
            <Route path='/proprietaire/dashboard' element={<ProprietaireDashboard />}>
              <Route index element={<ProprietaireAccueil />} />
              <Route path='annonces' >
                <Route index element={<ProprietaireAnnonces />} />
                <Route path=':id' element={<ProprietaireDetailsAnnonce />} />
                <Route path=':id/modifier' element={<CreationAnnonce />} />
              </Route>
              <Route path='annonces/creer' element={<CreationAnnonce />} />
              <Route path='statistiques' element={<ProprietaireStatistiques />} />
              <Route path='reservations' element={<ProprietaireReservations />} />
              <Route path='parametres' element={<ProprietaireParametres />} />
              <Route path='messagerie' element={<Messagerie />}>
                <Route path=':id' element={<Conversation />} />
              </Route>
            </Route>

            {/* Tableau de bord admin */}
            <Route path='/admin/dashboard' element={<AdminDashboard />}>
              <Route index element={<AdminAccueil />} />
                <Route index element={<ProprietaireAnnonces />} />
              <Route path='utilisateurs' element={<AdminUtilisateurs/>} />
              <Route path='etudiants' element={<AdminEtudiants />} />
              <Route path='proprietaires' element={<AdminProprietaires />} />
              {/* <Route path='annonces' element={<AdminA />} /> */}
              {/* <Route path='parametres' element={<ProprietaireParametres />} /> */}
            </Route>
          </Route>
          <Route path='adminaccueil' element={<AdminAccueil />} />

          {/* ERREUR 404 ET 500  */}
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/500' element={<ServerErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
