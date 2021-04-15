/* Après avoir perdu mon code qui de toute façon n'était pas bon: 
 Reset de la page JS pour la réécrire de façon ordonné (version 1.0 perdu) 14/12/20 */
 /* Nom:LOTO  auteur:Anas CHAUVEAU version 1.1 14/12/20 */
/* Création de la fonction erreur qui détecte les nombres qui ne correspondent pas 14/12/20 */
/* Début de la création de la fonction tirage: Ce qui a était fait:
5 boules de saisie, 5 boules de resultat, vérification des valeurs,
vérification des identiques, affichage en cas d'erreur 14/12/20 */
/* Ajout de la fonction Recherche 17/12/20 */
/* Modification de la méthode de vérification des valeurs 17/12/20 */
/* Ajout de la fonction aléatoire 17/12/20 */
/* Ajout de la fonction comparaison 17/12/20 */
/* Ajout des Boules suplémentaire 17/12/20 */
/* Fonction tirage terminer 17/12/20 */
/* Programe loto test terminer 17/12/20 */
/* Version 1.2 Opérationnel 17/12/20 */
/* Ajout des commantaires pour les fonctions 03/01/21 */
/* Ajout du isNaN à la fonction erreur pour ne pas accepter les lettres */
/* Tentative d'optimisation de la fonction chance échoué (chance n'a donc pas changer) */
/* Version 1.3 Du programme du Loto terminé ! */


//cette fonction vérifie si le nb est plus petit que 1 ou plus grand que le max (10 ou 50)
// si oui return true, sinon return false
function erreur(nb, maxi){
	if (nb < 1 || nb> maxi || isNaN(nb)){
		return true
	}else{
		return false
	}
}

// cette fonction vérifie si le chiffre est déjà utiliser (déjà dans la liste)
// si oui return true, sinon return false
function Recherche(a, list) {
	for (let t=0; t < list.length; t++) {
		if (a == list[t]){
			return true
		}
	}
	return false
}

// cette fonction écrit 5 nombres aléatoires dans la saisie de l'utilisateur tout en respectant les rêgles (pas d'identique ...)
// elle laisse la saisie du 6ème chiffre (le chiffre bonus) vide, c'est l'utilisateur qui doit la remplir
// il y a un bouton qui déclanche cette fonction
function aleatoire(){
    let au_pif = []
    let list_aleat = [];
    for (let i=1;i<6;i++){
        au_pif[i]=Math.floor(Math.random() * 49)+1;
        if (Recherche(au_pif[i], list_aleat) == false){
        document.getElementById("num"+i).value = au_pif[i];
        list_aleat.push(au_pif[i]);
        } else{
            i = i - 1
        }
    }
}

// cette fonction compare la saisie au résultat pour voir les correspondances et si la personne à gagner au loto
function comparaison(val_user, val_tirage){
    let compteur = 0;
    for (let u=1;u<val_user.length;u++){
        for(let o=1;o<val_tirage.length;o++){
            if (val_user[u] == val_tirage[o]){
                compteur++
            }
        }
    }
    compt = compteur;
    if (compteur < 5){
        correspondance ="Tu as eu: "+compteur+" nombre(s)<br> réessaie"; 
    }else{
        return true
    }
}

// la fonction tirage est celle qui lance le tirage du loto
// elle utilise les fonction recherche, erreur et comparaison
// elle renvoie une réponse en fonction du tirage et des correspondance de la saisie
function tirage(){
    let chiffres = [];
    let result = [];
    let result_use = [];
    let chiffres_use = [];
    let result_sup = "";
    let chiffres_sup = "";
    let identique = "";
    let faute = "";
    for (let i=1;i<6;i++){
        chiffres[i]=document.getElementById("num"+i).value;
        if (Recherche(chiffres[i], chiffres_use) == true) {
            identique ="Certains de vos nombres sont identique ! <br>Veuiller entrer des nombres différents.";
            document.getElementById("identique").innerHTML = identique;
            document.getElementById("num"+i).style.background = "red";
            return "pas bon" // (return) pour arréter la fonction //
        } else {
            document.getElementById("identique").innerHTML = "";
            document.getElementById("num"+i).style.background = "rgb(26, 24, 24)";
            chiffres_use.push(chiffres[i]);
        }
        result[i]=Math.floor(Math.random() * 49)+1;
        if (Recherche(result[i], result_use) == false) {
            result_use.push(result[i]);
            document.getElementById("rep"+i).innerHTML = result[i];
        } else {
            chiffres_use.pop();
            i = i - 1
        }
       
    }

    for (let i = 1; i < chiffres.length; i++) {
        if (erreur(chiffres[i], 49) == true) {
            document.getElementById("num"+i).style.background = "red";
            faute ="Votre saisie n'est pas entre 1 et 49";
            document.getElementById("erreur").innerHTML = faute;
            return "pas bon" // (return) pour arréter la fonction //
        } else {
            document.getElementById("erreur").innerHTML = "";
            document.getElementById("num"+i).style.background = "rgb(26, 24, 24)";
        }
    }
    result_sup=Math.floor(Math.random() * 10)+1;
    chiffres_sup=document.getElementById("num6").value;
    document.getElementById("rep6").innerHTML = result_sup;
    if (erreur(chiffres_sup, 10) == true) {
        document.getElementById("num6").style.background = "red";
        faute ="Votre saisie n'est pas entre 1 et 10";
        document.getElementById("erreur").innerHTML = faute;
        return "pas bon" // (return) pour arréter la fonction //
    }else {
        document.getElementById("erreur").innerHTML = "";
        document.getElementById("num6").style.background = "rgb(26, 24, 24)";
    }
    if (comparaison(chiffres, result) == true){
        if (chiffres_sup == result_sup){
            correspondance = "Victoire rang 1 <br> tu n'aurais pas 3 millions à dépanner ?" 
        }else{
        correspondance = "Victoire rang 2 !<br> Te voilà un homme riche !";
        }
    }
    document.getElementById("erreur").innerHTML = correspondance;
    return true
}

function chance(){
    let nb_tirage = 0;
    if (tirage() == true){
        while (compt < 5) {
            nb_tirage++;
            tirage()
        }
    }
    if (compt >= 5){
    alert("Avec un tirage par semaine, ta combinaison à été tiré au bout de "+nb_tirage+" semaines");
    compt = 0;
    }
}

/* ----------------Variables Globales---------------- */
let correspondance = "";
let compt = 0;



