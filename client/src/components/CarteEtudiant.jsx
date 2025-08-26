import React from 'react'
import photo from '../assets/img/fondateur.jpg'

const CarteEtudiant = () => {
    return (
        <div className='h-50 w-60 rounded-md p-3 flex'>
            {/* photo */}
            <div>
                <img src={photo} alt="photo" />
            </div>
            {/* texte */}
            <div>
                <div className="text">
                    <h1>Ahmed Kipertino</h1>
                    <p>UGLC-SC (Sociologie)</p>
                    <p>Quartier: Kipé / Nongo</p>
                    <p>Budget: 200.000 GNF</p>
                    <p>préférence: Calme, non-fumeur</p>
                </div>
                <Link>Contacter</Link>
            </div>
        </div>
    )
}

export default CarteEtudiant