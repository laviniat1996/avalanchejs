import { Avalanche } from "avalanche/dist"
import { AVMAPI } from "avalanche/dist/apis/avm"
import { Buffer } from "../../src"
import { EVMAPI, Tx } from "avalanche/dist/apis/evm"

const ip: string = "api.avax.network"
const port: number = 443
const protocol: string = "https"
const networkID: number = 5
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const xchain: AVMAPI = avalanche.XChain()
const cchain: EVMAPI = avalanche.CChain()

const fromDecToHex = (item: number) => {
  let hexVal = item.toString(16)
  let hexString = hexVal.length < 2 ? "0" + hexVal : hexVal
  return hexString
}
const bufToHex = (item: string) => {
  let valueFromJSON = item
  let bufValueFromJson = Buffer.from(valueFromJSON)
  let arrValueFromJSON = [...bufValueFromJson]
  let hexValueFromJSON = arrValueFromJSON.map((item) => fromDecToHex(item))
  return "0x" + hexValueFromJSON.toString().split(",").join("")
}

const main = async (): Promise<any> => {
  //enter here the X-Chain import tx ID
  const txIDXchain: string = "ZYSXpAJpbKfo9NuMkRmM1hMkd8HxhKyYZLCBKHZAfekHBxbnJ"
  const encoding: string = "json"
  const txX: string | object = await xchain.getTx(txIDXchain, encoding)
  const jsonStrX: string = JSON.stringify(txX)
  const jsnX = JSON.parse(jsonStrX)
  const txIDCChain = jsnX.unsignedTx.importedInputs[0].txID
  console.log("The tx ID of the imported input from C-Chain is: " + txIDCChain)

  const hex: string = await cchain.getAtomicTx(txIDCChain)
  const buf: Buffer = new Buffer(hex.slice(2), "hex")
  const txC: Tx = new Tx()
  txC.fromBuffer(buf)
  const jsonStrC: string = JSON.stringify(txC)
  const jsnC = JSON.parse(jsonStrC)

  let displayAddExp = () => {
    let importedTxImpInputs = bufToHex(
      jsnC.unsignedTx.transaction.inputs[0].address.data
    )
    console.log(
      "The hex C-Chain address from which tokens were imported to X-Chain is: " +
        importedTxImpInputs
    )
  }

  jsnC.unsignedTx.transaction._typeName == "ExportTx"
    ? displayAddExp()
    : console.log("The transfer is not an ExportTx from C-Chain to X-Chain")
}

main()
