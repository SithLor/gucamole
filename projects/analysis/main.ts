import * as swc from "@swc/core";
import * as fs from "fs/promises";
//#region Input
const args = process.argv;
interface __INPUT__ {
    command: "static" | "dynamic";
    file_entry: string;
}
const __INPUT__ = {
    command: args[2],
    file_entry: args[3],
}
//#endregion




function main(){

}main()