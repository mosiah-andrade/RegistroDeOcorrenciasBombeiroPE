// src/components/PWAReloader.jsx
import { useRegisterSW } from 'virtual:pwa-register/react'

function PWAReloader() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('Service Worker registrado:', r)
    },
    onRegisterError(error) {
      console.log('Erro no registro do SW:', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (offlineReady) {
    return (
      <div className="pwa-toast">
        <button onClick={() => close()}>Fechar</button>
      </div>
    )
  }

  if (needRefresh) {
    return (
      <div className="pwa-toast">
        <button onClick={() => updateServiceWorker(true)}>Atualizar</button>
        <button onClick={() => close()}>Fechar</button>
      </div>
    )
  }

  return null
}

export default PWAReloader