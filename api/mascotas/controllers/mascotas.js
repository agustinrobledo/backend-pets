'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx){
        let {Nombre, Raza, Edad, Sexo, Mes, Año, Aproximado} = ctx.request.body;
        if(!Nombre || !Raza || !Sexo){
            ctx.response.status = 400;
            ctx.response.body = {
                message: 'Faltan datos requeridos'
            }
        }else{
            const raza = await strapi.services.razas.findOne({nombre_raza: Raza});
            if(Edad === ""){
                const actualMonth = new Date().getMonth();
                const actualDay = new Date().getDate() + 1;
                const actualYear = new Date().getFullYear();
                    if(Mes !== 0){
                    const monthOfPet = actualMonth - Mes;
                    if(monthOfPet === 0){
                        monthOfPet = 1;
                    }
                    else if(monthOfPet < 0){
                        monthOfPet = 12 + monthOfPet;
                        actualYear = actualYear - 1;
                    }
                    Edad = new Date(actualYear, monthOfPet, actualDay + 1)
                }
                    else if(Año){
                        Edad = new Date(actualYear - Año, actualMonth, actualDay + 1);
                    }
            }

            const mascota = await strapi.services.mascotas.create({
                Nombre,
                Raza: raza.id,
                Edad,
                Sexo,
                Aproximado
            });
        return mascota;
        }
    }

};


