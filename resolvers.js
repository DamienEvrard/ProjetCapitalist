module.exports = {
    Query: {
        getWorld(parent, args, context, info) {
            saveWorld(context)
            return context.world
        }
    },
    Mutation: {
        acheterQtProduit(id, quantite){
            /*       Cf page 39 sujet
            getproduitById(args.id)
            if existe
                for(int i=1;i<args.quantite;i++){}
                    setMoney(getMoney-getproduitById(args.id).cout)
                    setNextPriceProduct();
                    setQteProduit(getQteProduit+1)
                }
            else
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`)
            */

               
        },
        lancerProductionProduit(id){

        },
        engagerManager(name){

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
   