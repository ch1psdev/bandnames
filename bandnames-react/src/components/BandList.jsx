import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandList = () => {

    const [bands, setBands] = useState([])

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.on('current-bandList', ( bands ) => {
            setBands(bands)
        });

        // Esto no es necesario para el ejemplo pero es interesante. Con el return estoy diciendo que al 
        // momento de destruir el componente, quiero dejar de escuchar el evento 'current-bandList'
        return () => socket.off('current-bandList')
    }, [ socket ])

    const votar = ( id ) => {
        socket.emit('votar-banda', id);
    }

    const borrarBanda = ( id ) => {
      socket.emit('borrar-banda', id);
    } 

    const cambioNombre = (event, id) => {
        const nuevoNombre = event.target.value;

        setBands( bands => bands.map( band => {
            if( band.id === id){
                band.name = nuevoNombre;
            }
            return band;
        }));
    }

    const onPerdioFoco = ( id, nombre ) => {
       socket.emit('cambiar-nombre-banda', { id, name:nombre } )
    }
    

    const crearRows = () => {
        return (
            bands.map( band => (
                <tr key={band.id}>
                    <td>
                        <button className='btn btn-primary' onClick={() => votar(band.id)}> +1 </button>
                    </td>
                    <td>
                        <input 
                            className='form-control'
                            value={band.name}
                            onChange={(event) => cambioNombre(event, band.id)}
                            onBlur={() => onPerdioFoco( band.id, band.name )}
                        />
                    </td>
                    <td> <h3> {band.votes} </h3> </td>
                    <td>
                        <button className='btn btn-danger' onClick={() => borrarBanda( band.id )}>
                            Borrar
                        </button>
                    </td>
                </tr>
            ))
        )
    }
  return (
    <>

        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>    
            <tbody>
                { crearRows() }
            </tbody>
        </table>   

    </>
  )
}
