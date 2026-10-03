// Merlin en SVT : il ne fait qu'une chose, corriger les réponses rédigées.
//
// Le moteur d'appel est dans commun/merlin.js. La clé se règle dans l'appli de
// maths 3e du même appareil (Suivi → « Merlin et clé d'API ») : toutes les
// pages du site partagent le même stockage, donc la même configuration.

import * as moteur from '../../../commun/merlin.js';
import { evaluerEcrit } from './ecrit.js';

export const { disponible } = moteur;

const APPLI = 'svt3e';

export const corrigerEcrit = ({ item, texte, profil }) =>
  evaluerEcrit({ item, texte, profil }, { appeler: moteur.appeler, appli: APPLI });
