/* Lancement de la version 1.0 du TP Palindromes 19/12/20 */
/* création de la fonction aleatoire 19/12/20 */
/* Début de la fonction paindromes 19/12/20 */
/* Création des fonctions accent, inverse et comparer 19/12/20 */
/* Finalisation de la fonction palindromes 19/12/20 */
/* Ajout des commentaires manquant 21/12/20 */
/* Tentative de simplification de la fonction accent (échouer) 21/12/20 */
/* Version Finale du TP Palindromes 21/12/20 */


// je crée une liste contenant plusieurs palindromes
// la fonction renvoie au hazar un palindrome
function aleatoire(){
    let bon_palin = ["A Cuba, Anna a bu ça","Bon sport, trop snob","Engage le jeu, que je le gagne",
    "Et si l'arôme des bottes révèle ma déviante et naïve dame, le verset t'obsède, moraliste",
    "Réussir à Paris : suer","kayak","La mariée ira mal","Élu par cette crapule","Eh ! ça va la vache ?"];
    let hazar = Math.floor(Math.random() * bon_palin.length);
    document.getElementById("saisie_user").innerHTML = bon_palin[hazar];
}

// la fonction palindromes commence par prendre la saisie de l'utilisateur,
// elle lui retire tout ses symboles et ses ponctuations,
// change ses majuscules en minuscules,
// et retire tout les accents à l'aide de la fonction "accent"
// ensuite elle crée une variable qui inverse toute la saisie à l'aide de la fonction "inverse"
// puis compare la saisie d'origine à la saisie inversé
function palindromes(){
    chaine = document.getElementById("saisie_user").value;
    console.log(chaine);
    let symbol = /\s|,|!|;|'|:|-|\?|\./g;
    chaine = chaine.replace(symbol, "");
    console.log(chaine);
    chaine = chaine.toLowerCase();   // les console.log ne sont la que pour être sur que chaque étape fonctionne
    console.log(chaine);
    chaine = accent(chaine);
    console.log(chaine);
    chaine_inv = inverse(chaine);
    console.log(chaine_inv);
    resultat = comparer(chaine, chaine_inv);
}

/* j'ai essaie de crée les deux fonction imbriqué mais malheureusement,
j'ai du mal comprendre et je n'ai pas réussi, j'ai donc garder l'ancienne*/


// cette fonction remplace tout les accents du paramètre par leur lettre d'origine,
// puis elle le renvoie
function accent(mot){
    mot = mot.replace(/à|â/g, "a");
    mot = mot.replace(/é|è|ê|ë/g, "e");
    mot = mot.replace(/î|ï/g, "i");
    mot = mot.replace(/ô/g, "o");
    mot = mot.replace(/ù|û|ü/g, "u");
    mot = mot.replace(/ç/g, "c");
    return mot
}

// cette fonction récupère en paramettre une variable,
// et à l'aide d'une boucle recupère chaque lettre du mot en partant de la fin
// pour les mettres dans une nouvelle variable et la renvoyer
function inverse(mot) {
    let mot_inv = "";
    for (let i = mot.length - 1; i >= 0; i--) {
        mot_inv += mot[i];
    }
    return mot_inv;
}

// je crée un fonction qui teste le mot (palindromes ou pas)
// il y a 3 résultat possible:
// si le mot fait moin de deux lettres: vide
// si le mot n'est pas un palindromes: rate
// et si le mot est un palindromes: reussite
function comparer(mot, mot_inv){
    vide = "Veuiller saisir au moins deux lettres !"
    reussite = "C'est effectivement un Palindrome !"
    rate = "Ce n'est pas un Palindrome !"
    if (mot.length < 2){
        document.getElementById("reponse").innerHTML = vide;
        document.getElementById("reponse").style.color = "white";
    }
    else if (mot == mot_inv){
        document.getElementById("reponse").innerHTML = reussite;
        document.getElementById("reponse").style.color = "green";
    }else{
        document.getElementById("reponse").innerHTML = rate;
        document.getElementById("reponse").style.color = "red";
    }
}

// -------------------- Variables Globales -------------------- //
let chaine = "";