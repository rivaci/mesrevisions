// Merlin en histoire SI : il ne fait qu'une chose, corriger les écrits.
//
// Le moteur d'appel est dans commun/merlin.js. La clé se règle sur la page
// commune commun/merlin.html (lien en bas de l'accueil) : toutes les pages du
// site partagent le même stockage, donc la même configuration.

import * as moteur from '../../../commun/merlin.js';
import { evaluerEcrit } from './ecrit.js';

export const { disponible } = moteur;

const APPLI = 'histoiresi3e';

export const corrigerEcrit = ({ item, texte, profil }) =>
  evaluerEcrit({ item, texte, profil }, { appeler: moteur.appeler, appli: APPLI });
