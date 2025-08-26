import React from 'react';
import { Link } from 'react-router-dom';

const PolitiquesCookies = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#2C5CD5] mb-4">Politique de Cookies</h1>
        <p className="text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#2C5CD5] mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          LoguiStud ("nous", "notre", "nos") utilise des cookies et technologies similaires sur notre plateforme 
          (loguistud.fr) pour améliorer votre expérience utilisateur. Cette politique explique en détail ce que sont 
          les cookies, comment nous les utilisons et comment vous pouvez gérer vos préférences.
        </p>
      </section>

      {/* Qu'est-ce qu'un cookie */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#2C5CD5] mb-4">2. Qu'est-ce qu'un cookie ?</h2>
        <p className="text-gray-700 mb-4">
          Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. 
          Les cookies permettent au site de mémoriser vos actions et préférences (comme la connexion, 
          la langue, les paramètres d'affichage) pendant un certain temps, pour que vous n'ayez pas à 
          les réinsérer à chaque fois que vous revenez sur le site ou naviguez d'une page à l'autre.
        </p>
      </section>

      {/* Types de cookies utilisés */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#2C5CD5] mb-4">3. Types de cookies utilisés</h2>
        
        <div className="bg-[#F0F0F0]/50 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-medium text-[#2C5CD5] mb-2">Cookies essentiels</h3>
          <p className="text-gray-700 mb-2">
            Ces cookies sont indispensables au fonctionnement de la plateforme et ne peuvent pas être désactivés.
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-1">Authentification et sécurité</li>
            <li className="mb-1">Mémorisation de session</li>
            <li>Fonctionnalités de base du site</li>
          </ul>
        </div>

        <div className="bg-[#F0F0F0]/50 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-medium text-[#2C5CD5] mb-2">Cookies de performance et analytics</h3>
          <p className="text-gray-700 mb-2">
            Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-1">Google Analytics (mesure d'audience)</li>
            <li className="mb-1">Suivi des erreurs et performances</li>
            <li>Amélioration de l'expérience utilisateur</li>
          </ul>
        </div>

        <div className="bg-[#F0F0F0]/50 p-4 rounded-lg">
          <h3 className="text-xl font-medium text-[#2C5CD5] mb-2">Cookies de personnalisation</h3>
          <p className="text-gray-700 mb-2">
            Ces cookies mémorisent vos préférences pour personnaliser votre expérience.
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-1">Paramètres d'affichage</li>
            <li className="mb-1">Filtres de recherche sauvegardés</li>
            <li>Préférences linguistiques</li>
          </ul>
        </div>
      </section>

      {/* Gestion des cookies */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#2C5CD5] mb-4">4. Comment gérer vos cookies</h2>
        <p className="text-gray-700 mb-4">
          Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez 
          supprimer tous les cookies déjà stockés sur votre ordinateur et configurer la plupart des 
          navigateurs pour qu'ils les bloquent. Cependant, dans ce cas, vous devrez peut-être indiquer 
          manuellement certaines préférences à chaque visite.
        </p>
        
        <h3 className="text-xl font-medium text-[#2C5CD5] mb-2">Paramètres par navigateur :</h3>
        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li className="mb-1"><a href="https://support.google.com/chrome/answer/95647" className="text-[#2C5CD5] hover:underline">Chrome</a></li>
          <li className="mb-1"><a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" className="text-[#2C5CD5] hover:underline">Firefox</a></li>
          <li className="mb-1"><a href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-[#2C5CD5] hover:underline">Internet Explorer</a></li>
          <li className="mb-1"><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="text-[#2C5CD5] hover:underline">Safari</a></li>
          <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" className="text-[#2C5CD5] hover:underline">Opera</a></li>
        </ul>

        <p className="text-gray-700">
          Vous pouvez également gérer vos préférences directement sur notre site via notre 
          <Link to="/preferences-cookies" className="text-[#2C5CD5] font-semibold hover:underline ml-1">outil de gestion des cookies</Link>.
        </p>
      </section>

      {/* Modifications */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#2C5CD5] mb-4">5. Modifications de la politique</h2>
        <p className="text-gray-700">
          Nous pouvons occasionnellement mettre à jour cette politique. Nous vous encourageons à 
          consulter cette page régulièrement pour prendre connaissance des éventuelles modifications. 
          Nous vous informerons également des changements importants via notre plateforme ou par email.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold text-[#2C5CD5] mb-4">6. Nous contacter</h2>
        <p className="text-gray-700 mb-2">
          Pour toute question concernant cette politique de cookies, vous pouvez nous contacter à :
        </p>
        <p className="text-[#2C5CD5] font-medium">
          contact@loguistud.fr
        </p>
      </section>
    </div>
  );
};

export default PolitiquesCookies;