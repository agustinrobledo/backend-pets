'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx){
        const {Nombre, Raza, Edad, Sexo, Mes, Año} = ctx.request.body;
        const raza = await strapi.services.razas.findOne({nombre_raza: Raza});
        if(!Edad){

            const actualMonth = new Date().getMonth() + 1;
            const actualDay = new Date().getDate();
            const actualYear = new Date().getFullYear();

                if(Mes){
                const monthOfPet = actualMonth - Mes;
                if(monthOfPet === 0){
                    monthOfPet = 1;
                }
                else if(monthOfPet < 0){
                    monthOfPet = 12 + monthOfPet;
                    actualYear = actualYear - 1;
                }
                Edad = new Date(actualDay, monthOfPet, actualYear)
            }
                else if(Año){
                    Edad = new Date(actualDay, actualMonth, actualYear - Año);
                }

        }
        const mascota = await strapi.services.mascotas.create({
            Nombre,
            Raza: raza.id,
            Edad,
            Sexo
        });
        return mascota;
    }
};


