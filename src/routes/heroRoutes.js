const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:'/herois',
            method:'GET',
            handler:(req,res)=>{

                try {
                    const {skip,limit,nome} = req.query
                    // Validando
                    let query = {}
                    if(nome){
                        query.nome = nome
                    }

                    if(isNaN(skip)){
                        throw Error("O tipo do skip é incorreto")
                    }
                    if(isNaN(limit)){
                        throw Error("O tipo do limit está incorreto")
                    }
                    
                    return this.db.read(query,parseInt(skip),parseInt(limit))
                } catch (error) {
                    console.log("Deu ruim", error)
                    return "Error interno no servidor"
                }
                
            }
        }
    }
}

module.exports = HeroRoutes