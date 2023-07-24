import { Avalanche, BN } from "@avalabs/avalanchejs/dist"
import { AVMAPI } from "@avalabs/avalanchejs/dist/apis/avm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const xchain: AVMAPI = avalanche.XChain()

const main = async (): Promise<any> => {
  const defaultTxFee: BN = xchain.getDefaultTxFee()
  console.log(defaultTxFee.toString())
}

main()
