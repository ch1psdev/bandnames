import App from "./Pages/HomePage"
import { SocketProvider } from "./context/SocketContext"

export const BandNamesApp = () => {
  return (
    <SocketProvider>
        <App />
    </SocketProvider>
  )
}
