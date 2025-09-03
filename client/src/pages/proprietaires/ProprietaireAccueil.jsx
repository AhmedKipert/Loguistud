
import AuthContext from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useContext } from 'react';
import { 
  faHome, faBell, faChevronDown, faUser, faCog, faSignOutAlt, 
  faTachometerAlt, faPlusCircle, faEnvelope, faCalendarAlt, 
  faChartLine, faWallet, faQuestionCircle, faHeadset, 
  faPlus, faArrowUp, faCircle, faCheckCircle, faArrowRight, 
  faEye, faEdit
} from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../autres/Navbar';
import { Loading } from '../autres/Loading';


export const ProprietaireAccueil = () => {

    const { user } = useContext(AuthContext);

    return (
        <main className="flex-1">
            {/* En-tête */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Bienvenue, M. {user.compte.nom}</h1>
                        <p className="text-gray-600">Voici un résumé de votre activité sur LoguiStud</p>
                    </div>
                    <Link to={'/annonces/creer'} className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Nouvelle annonce
                    </Link>
                </div>
            </div>

            {/* Cartes statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* {statistiques && statistiques.map((stat, index) => (
                    <div
                        key={index}
                        className="animate-fade-in bg-white rounded-xl shadow-sm p-6 card-hover"
                        style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.titre}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.valeur}</h3>
                                <p className={`text-${stat.tendance === 'positive' ? '[#3CB371]' : stat.tendance === 'negative' ? 'red-500' : '[#F6A34A]'} text-xs mt-1 flex items-center`}>
                                    {stat.tendance === 'positive' && <FontAwesomeIcon icon={faArrowUp} className="mr-1" />}
                                    {stat.tendance === 'neutre' && <FontAwesomeIcon icon={faCircle} className="mr-1 text-xs" />}
                                    {stat.tendance === 'positive' && stat.variation.includes('confirmées') && <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />}
                                    {stat.variation}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${stat.couleur}10` }}
                            >
                                <FontAwesomeIcon
                                    icon={stat.icone}
                                    className="text-xl"
                                    style={{ color: stat.couleur }}
                                />
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>

            {/* Graphique et annonces récentes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Graphique */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800">Statistiques des vues</h2>
                        <select className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent">
                            <option>7 derniers jours</option>
                            <option>30 derniers jours</option>
                            <option>3 derniers mois</option>
                            <option>Cette année</option>
                        </select>
                    </div>

                    <div className="chart-container">
                        <div className="w-full h-full flex items-end justify-between pt-4">
                            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                                <div
                                    key={index}
                                    className="flex-1 mx-1 bg-[#2C5CD5]/20 rounded-t barre-graphique"
                                    style={{ height: '0%', transition: 'height 0.6s ease' }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                        <span>Lun</span>
                        <span>Mar</span>
                        <span>Mer</span>
                        <span>Jeu</span>
                        <span>Ven</span>
                        <span>Sam</span>
                        <span>Dim</span>
                    </div>
                </div>

                {/* Derniers messages */}
                <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Derniers messages</h2>

                    <div className="space-y-4">
                        {/* {derniersMessages.map((message, index) => (
                            <div key={index} className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                                    <img src={message.avatar} alt="Étudiant" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">{message.nom}</h4>
                                    <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{message.date}</p>
                                </div>
                                {message.nonLu && (
                                    <span className="ml-auto w-2 h-2 rounded-full bg-[#F6A34A]"></span>
                                )}
                            </div>
                        ))} */}
                    </div>

                    <a href="#" className="block text-center text-[#2C5CD5] hover:text-[#2351C0] font-medium mt-4 text-sm">
                        Voir tous les messages <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                    </a>
                </div>
            </div>

            {/* Annonces récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Vos annonces récentes</h2>
                    <a href="#" className="text-[#2C5CD5] hover:text-[#2351C0] text-sm font-medium">
                        Voir toutes <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                    </a>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annonce</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vues</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* {annoncesRecentes.map((annonce, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden">
                                                <img className="h-full w-full object-cover" src={annonce.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{annonce.titre}</div>
                                                <div className="text-sm text-gray-500">{annonce.lieu}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${annonce.statut === "Active"
                                                ? "bg-[#3CB371]/10 text-[#3CB371]"
                                                : "bg-[#F0F0F0] text-gray-600"
                                            }`}>
                                            {annonce.statut}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{annonce.vues}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{annonce.messages}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="#" className="text-[#2C5CD5] hover:text-[#2351C0] mr-3">
                                            <FontAwesomeIcon icon={faEye} />
                                        </a>
                                        <a href="#" className="text-[#3CB371] hover:text-[#2E9E64] mr-3">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </a>
                                        <a href="#" className="text-[#F6A34A] hover:text-[#E5943A]">
                                            <FontAwesomeIcon icon={faChartLine} />
                                        </a>
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Réservations récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Réservations récentes</h2>
                    <a href="#" className="text-[#2C5CD5] hover:text-[#2351C0] text-sm font-medium">
                        Voir toutes <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                    </a>
                </div>

                <div className="space-y-4">
                    {/* {reservationsRecentes.map((reservation, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
                                <img className="w-full h-full object-cover" src={reservation.image} alt="" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{reservation.titre}</h4>
                                <p className="text-sm text-gray-600">Réservé par {reservation.client}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-800">{reservation.prix}</p>
                                <p className={`text-sm ${reservation.statut === "Confirmée"
                                        ? "text-[#3CB371]"
                                        : "text-[#F6A34A]"
                                    }`}>
                                    {reservation.statut}
                                </p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </main>
    )
}
