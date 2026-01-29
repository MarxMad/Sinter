# Sinter + Arbitrum — Plan para el Hackathon

Guía para integrar blockchain en Sinter de forma **innovadora**, alineada con los criterios del hackathon de Arbitrum y con el requisito de **despliegue en una cadena Arbitrum** (Arbitrum Sepolia, Arbitrum One u Orbit).

**Requisito oficial:** El proyecto debe estar desplegado en una cadena Arbitrum para poder optar a premios (p. ej. Arbitrum Sepolia, Arbitrum One, cadenas Orbit).  
**Referencia:** [Get started with Arbitrum](https://docs.arbitrum.io/get-started/overview).

---

## 1. Criterios de evaluación del hackathon (alinear el proyecto)

| Criterio | Qué significa para Sinter |
|----------|---------------------------|
| **Smart contract quality** | Contratos con buenas prácticas, estructura lógica y eficiente, pocas vulnerabilidades. Usar OpenZeppelin, tests, y si aplica auditoría básica. |
| **Product-Market Fit** | Producto con potencial claro de atraer y retener usuarios (productores y compradores de beats). |
| **Innovation and Creativity** | Enfoque original que marque diferencia: no solo “pagar con ETH”, sino **licencias on-chain**, **royalties automáticos** y **prueba de autoría**. |
| **Real Problem Solving** | Resolver problemas reales del mercado: falta de transparencia en royalties, disputas de autoría, intermediarios que se quedan con gran parte del revenue. |

**Disclaimer (HackQuest):** HackQuest, como proveedor de la plataforma del hackathon, no participa en la evaluación final ni en la distribución de premios, salvo que se indique lo contrario. Si no se reciben suficientes entregas que cumplan los estándares del anfitrión, los premios pueden estar sujetos a cambios.

---

## 2. Propuesta de valor Web3: uso innovador de blockchain

En lugar de limitarse a “conectar wallet + pagar con ETH”, Sinter puede usar blockchain para **tres problemas reales** del ecosistema de beats:

| Problema real | Solución on-chain (innovación) |
|---------------|---------------------------------|
| **Royalties opacos y retrasados** | Contrato que reparte el pago al instante: X% al artista, Y% a la plataforma. Sin esperar a un “pago mensual” centralizado. |
| **“¿Quién creó esto primero?”** | **Prueba de autoría**: registrar en Arbitrum un hash (metadata + timestamp) al publicar un beat. Cualquiera puede verificar la fecha de primera publicación. |
| **Licencias poco claras o no transferibles** | **Licencia como NFT**: al comprar un beat, el comprador recibe un NFT que representa el derecho de uso (ej. no exclusivo / exclusivo). Si revende ese derecho, el artista puede cobrar royalty (EIP-2981). |

### Flujo propuesto (narrativa para el hackathon)

1. **Artista publica un beat**  
   - Frontend sube metadata (nombre, artista, IPFS del audio).  
   - Se llama a un contrato en Arbitrum que:  
     - Registra **proof-of-creation** (hash + timestamp).  
     - Opcional: emite un **NFT de “Beat”** (ERC-721) que representa la obra; el artista es el dueño inicial.

2. **Comprador compra licencia**  
   - El comprador paga en ETH o USDC en Arbitrum.  
   - Un **contrato de marketplace** recibe el pago y:  
     - Hace **split automático** (ej. 85% artista, 15% plataforma).  
     - Emite o transfiere un **License NFT** al comprador (metadatos: tipo de licencia, beatId, fecha).  
   - Todo queda registrado on-chain: quién pagó, cuánto, y a quién se repartió.

3. **Reventa del derecho de uso (opcional)**  
   - Si el comprador revende su License NFT en un mercado secundario, el contrato puede implementar **EIP-2981** para que un % vaya al artista automáticamente.

Así, blockchain se usa de forma **nueva** en Sinter: no solo como método de pago, sino como **infraestructura de licencias, royalties y prueba de autoría**.

---

## 3. Por qué Arbitrum encaja con Sinter

| Área | Hoy en Sinter | Con Arbitrum (propuesta) |
|------|----------------|---------------------------|
| **Identidad** | Login simulado | Wallet = cuenta portable, sin contraseñas |
| **Pagos** | Carrito simulado | Pagos reales en ETH/USDC en L2 (fees bajos) |
| **Propiedad y licencia** | Solo en app | License NFT + proof-of-creation on-chain |
| **Royalties** | N/A | Reparto automático en el contrato (artista + plataforma; opcional reventa) |
| **Autoría** | N/A | Timestamp y hash on-chain para disputas |

Arbitrum (L2) ofrece fees bajos y compatibilidad con Ethereum, ideal para micropagos, NFTs y muchas transacciones (compras, mints, splits).  
Referencia: [Arbitrum suite](https://docs.arbitrum.io/get-started/overview) (Rollup, Nitro, Arbitrum One, bridge, etc.).

---

## 4. Plan por fases (implementación)

### Fase 1 — Wallet y base Web3 (hecho en el repo)

- [x] Dependencias: `wagmi`, `viem`, `@tanstack/react-query`.  
- [x] Config de wagmi con Arbitrum Sepolia y Arbitrum One.  
- [x] `BlockchainProvider` y componente “Conectar wallet” en header (landing y studio).  
- [ ] Probar en **Arbitrum Sepolia** con faucet (ver sección Recursos).

### Fase 2 — Pagos en el marketplace (MVP on-chain)

- [ ] En “Comprar” en el marketplace: si no hay wallet, pedir conexión; si hay, enviar ETH (o USDC) a una dirección de tesorería con `useSendTransaction`.  
- [ ] Mostrar estado: “Confirmando…”, “Listo”, “Error”.  
- [ ] Opcional: precio en ETH vía API de cotización o ratio fijo para demo.

### Fase 3 — Contratos (calidad y lógica)

- [ ] **Contrato de marketplace (Solidity)** en Arbitrum Sepolia:  
  - Recibe pago (ETH o USDC).  
  - Reparte automáticamente a artista y plataforma (porcentajes configurables).  
  - Emite evento `Purchase(trackId, buyer, amount, artistShare, platformShare)`.  
- [ ] Seguir buenas prácticas: OpenZeppelin, checks-effects-interactions, reentrancy guard.  
- [ ] Tests unitarios (Hardhat o Foundry).  
- [ ] Deploy en **Arbitrum Sepolia** (y documentar dirección y block explorer).

### Fase 4 — Licencias y prueba de autoría (innovación)

- [ ] **Proof-of-creation**: contrato o función que registre `(beatId, hash(metadata), timestamp)` al “publicar” un beat.  
- [ ] **License NFT (ERC-721)** con metadata (tipo de licencia, beatId, artista). Al comprar, el comprador recibe este NFT.  
- [ ] Opcional: **EIP-2981** en el NFT para royalty en reventa.  
- [ ] Frontend: mostrar “Licencia adquirida” / “Tu NFT” en biblioteca o detalle del beat.

### Fase 5 — Despliegue y documentación (requisito hackathon)

- [ ] Contratos desplegados en **Arbitrum Sepolia** (o Arbitrum One si el hackathon lo permite).  
- [ ] Frontend apuntando a los contratos desplegados (env vars).  
- [ ] README con: red usada, cómo obtener testnet ETH, cómo conectar wallet, cómo comprar un beat y ver la transacción en Arbiscan.  

---

## 5. Stack técnico

- **Cadenas:** Arbitrum One (mainnet), Arbitrum Sepolia (testnet). El proyecto debe estar **desplegado** en una de ellas (u Orbit) para calificar.  
- **Frontend:** Next.js, **wagmi**, **viem**.  
- **Contratos:** Solidity (Hardhat o Foundry). Opcional: [Stylus](https://docs.arbitrum.io/stylus) (Rust) para más innovación.  
- **Estándares:** OpenZeppelin (ERC-721, Ownable, ReentrancyGuard), EIP-2981 si aplica.

### Cadenas (referencia)

| Red | Chain ID | RPC (público) |
|-----|----------|----------------|
| Arbitrum One | 42161 | https://arb1.arbitrum.io/rpc |
| Arbitrum Sepolia | 421614 | https://sepolia-rollup.arbitrum.io/rpc |

### Dependencias (ya en el repo)

- `wagmi`, `viem`, `@tanstack/react-query`.  
- Instalar: `pnpm install`.  
- Opcional: `@reown/appkit` o `@rainbow-me/rainbowkit` para mejor UX de conexión.

---

## 6. Recursos del hackathon (docs, faucets, RPCs, herramientas)

### Documentación oficial Arbitrum

| Recurso | Descripción | Enlace |
|--------|-------------|--------|
| Get started with Arbitrum | Visión general y onboarding | [docs.arbitrum.io/get-started/overview](https://docs.arbitrum.io/get-started/overview) |
| A gentle introduction to Arbitrum | Introducción amigable | [docs.arbitrum.io](https://docs.arbitrum.io) |
| Developer Documentation | Docs para desarrolladores | [docs.arbitrum.io](https://docs.arbitrum.io) |
| Arbitrum FAQ | Preguntas frecuentes | En docs / FAQ del hackathon |
| Third party docs | RPCs, indexers, oracles | [docs.arbitrum.io](https://docs.arbitrum.io/for-devs) (Third-party docs) |

### Quickstarts y contratos

| Recurso | Descripción | Enlace |
|--------|-------------|--------|
| Quickstart: Build a decentralized app (Solidity) | Primera dApp en Solidity en Arbitrum | [Quickstart Solidity](https://docs.arbitrum.io/build-decentralized-apps/quickstart-solidity-remix) |
| Quickstart: Stylus (Rust) | Primer contrato en Rust con Stylus | [Quickstart Stylus](https://docs.arbitrum.io/stylus/quickstart) |
| A gentle introduction: Stylus | Introducción a Stylus | [Stylus gentle intro](https://docs.arbitrum.io/stylus/gentle-introduction) |
| How to run a local Nitro dev node | Nodo local para desarrollo | [Run local node](https://docs.arbitrum.io/run-arbitrum-node) |
| Quickstart: Arbitrum bridge | Cómo usar el bridge | [Arbitrum bridge quickstart](https://docs.arbitrum.io/arbitrum-bridge/quickstart) |

### Faucets (testnet)

| Red | Uso | Enlaces |
|-----|-----|--------|
| Ethereum Sepolia | Obtener ETH de testnet y luego hacer bridge a Arbitrum Sepolia | [sepoliafaucet.com](https://sepoliafaucet.com/), [arbitrum.faucet.dev](https://arbitrum.faucet.dev/), [Infura Sepolia](https://www.infura.io/faucet/sepolia), [pk910 Sepolia](https://sepolia-faucet.pk910.de/) |
| Arbitrum Sepolia | ETH directo en L2 | [arbitrum.faucet.dev](https://arbitrum.faucet.dev/), [QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia), [L2faucet](https://www.l2faucet.com/arbitrum) |
| Arbitrum Sepolia USDC | USDC de testnet | [Circle Faucet](https://faucet.circle.com/) |

### RPC Endpoints

| Red | RPC |
|-----|-----|
| Arbitrum One | https://arb1.arbitrum.io/rpc |
| Arbitrum (alternativos) | https://rpc.ankr.com/arbitrum, https://arbitrum.llamarpc.com |

### Herramientas para builders

| Recurso | Descripción | Enlace |
|--------|-------------|--------|
| Arbitrum Docs | Documentación general | [docs.arbitrum.io](https://docs.arbitrum.io/) |
| Arbitrum SDK | SDK oficial | [github.com/OffchainLabs/arbitrum-sdk](https://github.com/OffchainLabs/arbitrum-sdk) |
| Stylus Docs | Contratos en Rust/Wasm | [docs.arbitrum.io/stylus](https://docs.arbitrum.io/stylus) |
| Stylus By Example | Ejemplos Stylus | [stylus-by-example.org](https://stylus-by-example.org) |
| Stylus CLI | CLI para Stylus | [cargo-stylus](https://github.com/OffchainLabs/cargo-stylus) |
| Stylus Rust SDK | SDK Rust para Stylus | [stylus-sdk-rs](https://github.com/OffchainLabs/stylus-sdk-rs) |
| OpenZeppelin Rust Contracts (Stylus) | Contratos OpenZeppelin en Rust para Stylus | [rust-contracts-stylus](https://github.com/OpenZeppelin/rust-contracts-stylus) |
| OpenZeppelin Solidity Contracts | Contratos Solidity estándar | [openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) |

### Bridge y portal

| Recurso | Descripción | Enlace |
|--------|-------------|--------|
| Arbitrum bridge | Mover ETH y ERC-20 entre Ethereum y Arbitrum | [bridge.arbitrum.io](https://bridge.arbitrum.io/) |
| Arbitrum Portal | Directorio de dApps en Arbitrum | [portal.arbitrum.io](https://portal.arbitrum.io/) |

---

## 7. Variables de entorno

```env
# Opcional: Reown (WalletConnect) para más wallets
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id
# https://cloud.reown.com/

# Dirección de tesorería (Fase 2) o direcciones de contratos (Fase 3+)
NEXT_PUBLIC_MARKETPLACE_TREASURY_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_LICENSE_NFT_ADDRESS=0x...
```

---

## 8. Estructura ya añadida en el repo

- **`lib/blockchain/config.ts`** – Config wagmi con Arbitrum Sepolia y Arbitrum One, conector `injected()`.
- **`components/providers/blockchain-provider.tsx`** – `BlockchainProvider` (Wagmi + QueryClient).
- **`components/blockchain/connect-wallet.tsx`** – Botón “Conectar wallet” / dirección + “Desconectar”.
- **`app/layout.tsx`** – Envuelve la app con `BlockchainProvider`.
- **Headers (landing y studio)** – Incluyen `ConnectWallet`.

Para probar: `pnpm install` y `pnpm dev`, conectar wallet en **Arbitrum Sepolia** (usar faucet de la sección Recursos si no tienes ETH de testnet).

---

## 9. Resumen: cómo encajamos en los criterios

| Criterio | Cómo lo cubrimos |
|----------|-------------------|
| **Smart contract quality** | Contratos con OpenZeppelin, patrones claros (splits, eventos), tests, y deploy en Arbitrum Sepolia. |
| **Product-Market Fit** | Sinter ya tiene landing, studio y marketplace; añadimos compra real y licencia NFT para retener a artistas y compradores. |
| **Innovation and Creativity** | Licencias on-chain, royalties automáticos en el contrato y proof-of-creation; no solo “pagar con crypto”. |
| **Real Problem Solving** | Transparencia de royalties, reparto inmediato al artista, y prueba de autoría para disputas. |
| **Despliegue en Arbitrum** | Contratos y flujo desplegados y usables en Arbitrum Sepolia (o One/Orbit según reglas del hackathon). |

Si quieres, el siguiente paso puede ser esbozar los interfaces de los contratos (marketplace + proof-of-creation + License NFT) o el flujo exacto en el frontend (p. ej. en la página del marketplace).
