// Merlin en espagnol : il ne fait qu'une chose, corriger les descriptions.
//
// Le moteur d'appel est dans commun/merlin.js. La clé se règle dans une autre
// appli du même appareil (en maths, « Réglages ») : toutes les pages du site
// partagent le même stockage, donc la même configuration.

import * as moteur from '../../../commun/merlin.js';
import { evaluerDescription } from './ecrit.js';

export const { disponible } = moteur;

const APPLI = 'espagnol5e';

export const corrigerDescription = ({ item, texte }) =>
  evaluerDescription({ item, texte }, { appeler: moteur.appeler, appli: APPLI });
