const mongoose = require('mongoose');

const dbConection = async (    ) =>    {

    try {
        
        await  mongoose.connect(process.env.DB_CNN);
          console.log('DB onlined');
    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos la BD ver logs');
    }

} 


module.exports ={
    dbConection
}
