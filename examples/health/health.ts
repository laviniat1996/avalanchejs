import { Avalanche } from "@avalabs/avalanchejs/dist"
import { HealthAPI } from "@avalabs/avalanchejs/dist/apis/health"
import { HealthResponse } from "@avalabs/avalanchejs/dist/apis/health/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const health: HealthAPI = avalanche.Health()

const main = async (): Promise<any> => {
  const healthResponse: HealthResponse = await health.health()
  console.log(healthResponse)
}

main()
