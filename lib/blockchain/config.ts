import { createConfig, http } from "wagmi"
import { arbitrum, arbitrumSepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

/**
 * Configuración de Wagmi para Arbitrum (hackathon).
 * Testnet: Arbitrum Sepolia. Mainnet: Arbitrum One.
 */
export const wagmiConfig = createConfig({
  chains: [arbitrumSepolia, arbitrum],
  connectors: [injected()],
  transports: {
    [arbitrumSepolia.id]: http(),
    [arbitrum.id]: http(),
  },
})
