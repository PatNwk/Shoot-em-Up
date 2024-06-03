function IsEqual(a, b) {
    if (a === b) return true;
}

function IsLesser(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        if (a < b) {
            return true;
        }
    }
    return false;
}

//let animal = ["Chien", "Chat","Oiseau"]

//animal.push("Poisson");
//console.log(animal.length);
//animal.shift();
//console.log(animal);

//let mail = new Set (["tibo.tibo@gmail.com","kiki.kiki@gmail.com"]);
//console.log(mail);
//mail.add("cacaboudin.gmail#com");
//console.log(mail);
//.add("cacaboudin.gmail#com");
//console.log(mail);


function DayOfWeek(){
    let semaine = new Map([[1,"lundi"],[2,"mardi"],[3,"mercredi"],[4,"jeudi"],[5,"vendredi"],[6,"samedi"],[7,"dimanche"]]);
    console.log(semaine.get(1));
}
//DayOfWeek();

function voyelles(letter){
    if (letter === "a" ||  letter === "e" || letter === "i" || letter === "o" || letter === "u" || letter === "y" || letter === "A" || letter === "E" || letter === "I" || letter === "O" || letter === "U" || letter === "Y") {
        return true;
    }
    return false;
}
//console.log(voyelles("a"));


////let fruits = ["tibo", "kiki", "gabin"];
//for (let i = 0; i < fruits.length; i++) {
    //console.log(fruits[i]);
//}

function fact(n){
    if (n < 0){
        return "Négatif";
    }
    if  (n === 0){
        return 1;
    }
    return n * fact(n-1);
}       

//console.log(fact(3));
function calculatrice(){
	var a = parseInt(prompt("Entrez Le premier nombre : "))
  var op = prompt("Etrez l'opérateur de calcule : ")
  var b = parseInt(prompt("Entrez Le premier nombre : "))
  let result;

    switch (op){
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
        default:
            result = "Erreur";
    }
    console.log(result);
}

//calculatrice();
 


class voiture { 
    constructor(marque, modele, annee) {
    this.marque = marque; 
    this.modele = modele; 
    this.annee = annee; 
    }
}

//let mavoiture = new voiture("Peugeot", "208", 2019);
//mavoiture.annee = 2020;

//console.log(mavoiture.annee);

class Personne { 
    constructor(prenom, nom, age) {
    this.prenom = prenom; 
    this.nom = nom; 
    this.age = age; 
    }

    nomComplet(){
        return this.prenom + " " + this.nom;
    }
}
    
//let pat = new Personne("pat", "nowakkkkk", 19); 
//console.log(pat.nomComplet());
/*
class Animal {
    constructor(espece) {
      this.espece = espece;
}
    manger() {
        console.log(this.nom + " " + "mange!");
}
}


class Chat extends Animal {
    constructor(espece, nom) {
        super(espece);
        this.nom = nom;
    }
}

let monChat = new Chat("chat", "Felix");
monChat.manger();

 class employe {
     constructor(nom, numid, salaire){
         this.nom = nom;
         this.numid = numid;
         this.salaire = salaire;
     }
     calculerSalaire(){
         return this.salaire;
     }
 }

 class EmployeTempsPartiel extends employe {
     constructor(nom, numid, salaire, heures){
         super(nom, numid, salaire);
         this.heures = heures;
     }
     calculerSalaire(){
         return this.salaire * this.heures;
     }
 }

 class Manager extends employe {
     constructor(nom, numid, salaire, bonus){
         super(nom, numid, salaire);
         this.bonus = bonus;
     }
     calculerSalaire(){
         return this.salaire + this.bonus;
     }
 }

 console.log(new employe("tibo", 1, 1000).calculerSalaire());



 class CompteBancaire{
    constructor(numCompte, solde){
        this.numCompte = numCompte;
        this.solde = solde;
    }

    get getSolde(){
        return this.solde;
    }
    get getNumCompte(){
        return this.numCompte;
    }
    set setSolde(numCompte){
        this.solde = solde;
    }

    deposer(montant){
        this.solde += montant;
    }

    retirer(montant){
        this.solde -= montant;
    }
 }

 class CompteEpargne extends CompteBancaire{
    constructor(numCompte, solde, taux){
        super(numCompte, solde);
        this.taux = taux;
    }

    depotInterets(){
        return this.solde * this.taux;
    }
 }

 let compte = new CompteBancaire(1, 1000, 0.1);
console.log(compte.solde);
compte.deposer(500);
console.log(compte.solde);
*/
class Ressource {
    constructor(titre, auteurs, date){
        this.titre = titre;
        this.auteurs = auteurs;
        this.date = date;
    }
    get getTitre(){
        return this.titre;
    }
    get getAuteurs(){
        return this.auteurs;
    }
     /**
     * @param {any} date
     */
     set date(date){
        this.date = date;
}

emprunter(){
    return this.titre + " " + "ecrit par " + this.titre + "a été emprunté le " + this.date;
}

}

class Livre extends Ressource {
    constructor(titre, auteurs, date, du){
        super(titre, auteurs, date);
        this.du = du;
    }

    emprunter(){
        return super.emprunter() + "retard  " + this.du + "$";
    }
    
}
