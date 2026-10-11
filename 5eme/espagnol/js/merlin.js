// Merlin en espagnol : il ne fait qu'une chose, corriger les textes écrits.
//
// Le moteur d'appel est dans commun/merlin.js. La clé se règle sur la page
// commune commun/merlin.html (lien en bas de l'accueil) : toutes les pages du
// site partagent le même stockage, donc la même configuration.

import * as moteur from '../../../commun/merlin.js';
import { evaluerDescription } from './ecrit.js';

export const { disponible } = moteur;

const APPLI = 'espagnol5e';

export const corrigerDescription = ({ item, texte, profil }) =>
  evaluerDescription({ item, texte, profil }, { appeler: moteur.appeler, appli: APPLI });
