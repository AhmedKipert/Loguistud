
export const formaterPrix = (prix)=> {
    return Intl.NumberFormat('fr-Fr').format(prix);
}