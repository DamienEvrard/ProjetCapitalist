const fs = require("fs").promises;
module.exports = {
    Query: {
        getWorld(parent, args, context, info) {
            saveWorld(context);
            return context.world;
        }
    },
    Mutation: {
        acheterQtProduit(parent, args, context){
            
            let world = context.world;
            let produit = world.products.find((p)=> p.id === args.id);
            if(produit == undefined){
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`);
            }
            let coutTTC=0;
            let lastCout=0;
            for(let i = 0;i<args.quantite;i++){
                lastCout=produit.cout*produit.croissance
                coutTTC+=lastCout;
            }
            if(world.money>=coutTTC){
                produit.cout=lastCout;
                world.money-=coutTTC;
                produit.quantite+=args.quantite;
            }else{
                throw new Error(`Pas assez d'argent`);
            }
            saveWorld(context);
            return produit;
               
        },
        lancerProductionProduit(parent, args, context){

            let world = context.world;
            let produit = world.products.find((p)=> p.id === args.id);
            if(produit === undefined){
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`);
            }else{
                produit.timeleft=produit.vitesse;
                world.lastupdate=Date.now();
            }
            return produit;

        },
        engagerManager(parent, args, context){
            let world = context.world;
            let manager = world.managers.find((m)=> m.name === args.name);
            let produit = world.products.find((p)=> p.id === manager.idcible);
            if(manager === undefined){
                throw new Error(`Le manager avec l'id ${args.name} n'existe pas`);
            }else{
                if(produit.quantite>=manager.seuil){
                    produit.managerUnlocked=true;
                    manager.unlock=true;
                }
            }

            saveWorld();
            return produit.palliers;
        }
    }
};

function saveWorld(context) {
    fs.writeFile("userworlds/" + context.user + "-world.json", JSON.stringify(context.world), err => {
        if (err) {
            console.error(err)
            throw new Error(`Erreur d'écriture du monde coté serveur`)
        }
    })
}
   