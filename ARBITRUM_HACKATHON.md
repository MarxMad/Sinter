# Sinter + Arbitrum — Guía para el Hackathon

Integrar blockchain (Arbitrum) en Sinter para el hackathon: identidad con wallet, pagos on-chain en el marketplace y, opcionalmente, NFTs de beats.

---

## 1. Por qué Arbitrum encaja con Sinter

| Área | Hoy en Sinter | Con Arbitrum |
|------|----------------|--------------|
| **Identidad** | Login simulado (email/password) | Wallet = cuenta única, sin contraseñas, portable |
| **Marketplace** | Carrito y “compras” simuladas | Pagos reales en ETH o USDC en L2 (bajos fees) |
| **Propiedad** | Beats solo en app | Beats como NFT = licencia/royalties on-chain |
| **Hackathon** | Proyecto web3-ready | Demostrable: conexión wallet, transacciones, opcional NFT |

Arbitrum (L2) da fees bajos y compatibilidad con Ethereum, ideal para micropagos y NFTs en un marketplace de música.

---

## 2. Ideas de integración (prioridad para hackathon)

### Opción A — Mínimo viable (recomendado para entregar algo rápido)

1. **Conectar wallet (Arbitrum)**  
   - Botón “Conectar wallet” en header (landing y studio).  
   - Usar **wagmi** + **viem** + **Reown (WalletConnect)** o **RainbowKit**.  
   - Red: **Arbitrum Sepolia** (testnet) para desarrollo; **Arbitrum One** para demo/producción si aplica.

2. **Identidad**  
   - Mostrar dirección conectada (ej. `0x1234…5678`) y opción “Desconectar”.  
   - Opcional: “Iniciar sesión con wallet” en `/login` como alternativa al login actual.

3. **Marketplace “pay with crypto”**  
   - En la página del marketplace, al “comprar” un beat:  
     - Calcular precio en ETH (o USDC) según `track.price`.  
     - Enviar transacción con **wagmi** (`useSendTransaction` o similar) a una dirección de tesorería.  
   - Para hackathon puede ser un pago simple en ETH a una wallet fija; no hace falta contrato aún.

### Opción B — Con smart contracts (más impacto)

4. **Contrato de marketplace**  
   - Contrato en Arbitrum que:  
     - Recibe pago (ETH o USDC).  
     - Emite evento `Purchase(trackId, buyer, amount)` o guarda compra on-chain.  
   - Frontend lee ese evento o llama a una función tipo `purchase(trackId)`.

5. **NFT de beats**  
   - Contrato ERC-721 (o ERC-1155): “mint” de un beat = NFT con metadata (nombre, artista, IPFS del audio).  
   - Quien “compra” en el marketplace recibe el NFT (licencia de uso).  
   - Opcional: royalties en el estándar EIP-2981 para que el artista gane en reventas.

### Opción C — Extra (si hay tiempo)

6. **Token de plataforma**  
   - Token ERC-20 en Arbitrum para descuentos, acceso premium o gobernanza.  
7. **Token-gating**  
   - Ciertos beats o funciones solo para holders de X NFT o X token.

---

## 3. Stack técnico recomendado

- **Cadenas**: Arbitrum One (mainnet), Arbitrum Sepolia (testnet).  
- **React / Next**: hooks de **wagmi** (React) + **viem** (llamadas y transacciones).  
- **Conexión de wallets**: **Reown AppKit** (antes WalletConnect) o **RainbowKit**, ambos compatibles con wagmi.  
- **Contratos** (si aplica): Solidity, deploy con **Hardhat** o **Foundry** en Arbitrum Sepolia.

### Cadenas (referencia)

| Red | Chain ID | RPC (público) |
|-----|----------|----------------|
| Arbitrum One | 42161 | https://arb1.arbitrum.io/rpc |
| Arbitrum Sepolia | 421614 | https://sepolia-rollup.arbitrum.io/rpc |

### Dependencias (ya añadidas en el repo)

En `package.json` están:

- `wagmi` – hooks y config para Ethereum/Arbitrum
- `viem@2.x` – cliente de red y transacciones
- `@tanstack/react-query` – requerido por wagmi

Para instalar en tu máquina (si hace falta):

```bash
pnpm install
```

Opcional (más wallets, mejor UX):

```bash
pnpm add @reown/appkit @reown/appkit-adapter-wagmi
# o
pnpm add @rainbow-me/rainbowkit
```

---

## 4. Plan por fases

### Fase 1 — Wallet en la app (1–2 días)

- [ ] Añadir dependencias: `viem`, `@wagmi/react`, `@wagmi/connectors` (y opcionalmente Reown o RainbowKit).  
- [ ] Crear config de wagmi con Arbitrum (One + Sepolia).  
- [ ] Envolver la app con `WagmiProvider` (y `QueryClientProvider` si lo pide wagmi).  
- [ ] Crear componente “Connect Wallet” (botón que abre modal de conexión).  
- [ ] Poner el botón en el header (landing y, si aplica, studio).  
- [ ] Mostrar dirección acortada y botón “Desconectar” cuando haya wallet conectada.

### Fase 2 — Pagos en el marketplace (1–2 días)

- [ ] En la página del marketplace, al hacer “Comprar”:  
  - Si no hay wallet, mostrar “Conecta tu wallet” (o abrir el modal).  
  - Si hay wallet: calcular monto en ETH (ej. `price` en USD → conversión fija o API de precio).  
  - Usar `useSendTransaction` (wagmi) para enviar ETH a una dirección de tesorería.  
- [ ] Mostrar estado: “Confirmando…”, “Listo”, “Error”.  
- [ ] Opcional: guardar en estado local “compras” por `trackId + address` para mostrar “Ya comprado”.

### Fase 3 — Contrato + NFT (opcional, 2–3 días)

- [ ] Contrato de marketplace: función `purchase(trackId)` que recibe ETH y emite evento.  
- [ ] Contrato NFT (ERC-721/1155) para beats: mint con metadata (nombre, artista, IPFS).  
- [ ] En frontend: después de “purchase”, llamar a “mint” o integrar mint en el mismo flujo.  
- [ ] Mostrar “Tu NFT” en biblioteca o sección “Mis beats”.

---

## 5. Variables de entorno

Crear o completar `.env.local`:

```env
# Arbitrum – Reown (WalletConnect) AppKit
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id
# Obtener en https://cloud.reown.com/

# Opcional: dirección de tesorería para pagos del marketplace
NEXT_PUBLIC_MARKETPLACE_TREASURY_ADDRESS=0x...
```

Para el Project ID de Reown (WalletConnect): registrarse en [Reown Cloud](https://cloud.reown.com/) y crear un proyecto.

---

## 6. Estructura ya añadida en el repo

- **`lib/blockchain/config.ts`** – Config de wagmi con Arbitrum Sepolia y Arbitrum One, conector `injected()` (MetaMask/navegador).
- **`components/providers/blockchain-provider.tsx`** – `BlockchainProvider` que envuelve la app con `WagmiProvider` y `QueryClientProvider`.
- **`components/blockchain/connect-wallet.tsx`** – Componente `ConnectWallet`: botón “Conectar wallet” o dirección acortada + “Desconectar”.
- **`app/layout.tsx`** – Envuelve `children` con `BlockchainProvider`.
- **Header (landing y studio)** – Incluyen `ConnectWallet` junto a Iniciar sesión / Empezar.

Pasos para probar: ejecutar `pnpm install` y `pnpm dev`, abrir la app, conectar una wallet (p. ej. MetaMask) en Arbitrum Sepolia o Arbitrum One.

---

## 7. Criterios típicos de hackathon Arbitrum

- **Uso claro de Arbitrum**: transacciones o contratos en Arbitrum (Sepolia o One).  
- **Demo estable**: conectar wallet y, si aplica, una transacción de pago o mint.  
- **Documentación breve**: README con “Cómo probar” (red, wallet, pasos).  
- **Reproducibilidad**: envío de repo + instrucciones de build/run.

Con la **Fase 1 + Fase 2** ya tienes un proyecto que “usa Arbitrum” de forma visible (wallet + pago). La **Fase 3** suma impacto con contratos y NFTs.

---

## 8. Referencias

- [Arbitrum for Devs](https://docs.arbitrum.io/for-devs)  
- [Wagmi](https://wagmi.sh/)  
- [Viem](https://viem.sh/)  
- [Reown (WalletConnect) AppKit](https://docs.reown.com/appkit/overview)  
- [RainbowKit](https://www.rainbowkit.com/)  
- [USDC on Arbitrum (Circle)](https://docs.arbitrum.io/for-devs/third-party-docs/Circle/usdc-quickstart-guide) (si quieres pagos en USDC)

Si quieres, el siguiente paso puede ser implementar la **Fase 1** en el repo (config wagmi, provider y componente “Connect Wallet”) y dejarlo listo para que solo tengas que añadir tu `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`.
