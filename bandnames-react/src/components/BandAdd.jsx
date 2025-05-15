import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {

  const { socket } = useContext(SocketContext)
  const [valor, setValor] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();

    if(valor.trim().length > 0){
      socket.emit('agregar-banda', { nombre: valor })
    }

    setValor('')
  }

  return (
    <>
        <h3>Agregar Banda</h3>

        <form onSubmit={onSubmit}>
            <input
                className='form-control'
                placeholder='Nuevo nombre de banda'
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />
        </form>

    </>
  )
}

export default BandAdd;