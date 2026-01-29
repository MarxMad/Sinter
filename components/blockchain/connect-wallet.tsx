"use client"

import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"

/**
 * Botón "Conectar wallet" / dirección acortada + "Desconectar".
 * Usar en header (landing y studio) para el hackathon Arbitrum.
 */
export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, isPending } = useConnect()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-mono">{short}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => disconnect()}
          className="text-foreground"
          title="Desconectar wallet"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const injected = connectors.find((c) => c.type === "injected")
  return (
    <Button
      type="button"
      variant="outline"
      className="gap-2 text-foreground border-border"
      disabled={!injected || isPending}
      onClick={() => injected && connect({ connector: injected })}
    >
      <Wallet className="h-4 w-4" />
      {isPending ? "Conectando…" : "Conectar wallet"}
    </Button>
  )
}
