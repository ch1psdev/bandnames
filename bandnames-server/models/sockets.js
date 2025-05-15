const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado')

           socket.emit('current-bandList', this.bandList.getBands());            

           socket.on('votar-banda', ( id ) => {
            this.bandList.increaseVotes(id);
            this.io.emit('current-bandList', this.bandList.getBands());
           })

           socket.on('borrar-banda', ( id ) => {
            this.bandList.removeBand( id );
            this.io.emit('current-bandList', this.bandList.getBands());
           })

           socket.on('cambiar-nombre-banda', (data) => {
            this.bandList.changeName(data.id, data.name);
            this.io.emit('current-bandList', this.bandList.getBands())
           })

           socket.on('agregar-banda', ({nombre}) => {
            this.bandList.addBand(nombre)
            this.io.emit('current-bandList', this.bandList.getBands())
           })
        
        });
    }


}


module.exports = Sockets;