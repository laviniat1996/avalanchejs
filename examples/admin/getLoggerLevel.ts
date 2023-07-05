import { Avalanche } from "avalanche/dist"
import { AdminAPI } from "avalanche/dist/apis/admin"
import { GetLoggerLevelResponse } from "avalanche/dist/apis/admin/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const admin: AdminAPI = avalanche.Admin()

const main = async (): Promise<any> => {
  try {
    const loggerName: string = "C"
    const loggerLevel: GetLoggerLevelResponse = await admin.getLoggerLevel(
      loggerName
    )
    console.log(loggerLevel)
  } catch (e: any) {
    console.log(
      "Error. Please check if all the parameters are configured correctly."
    )
  }
}

main()
