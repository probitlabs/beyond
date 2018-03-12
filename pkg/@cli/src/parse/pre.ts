import {
    Int, isInt,
    Prop,
    isStr,
    till, range,
} from "@beyond-life/lowbar"

import {
    Data,
    Ty,
} from "../schema/data"
import {
    AUTOM,
    Flag,
    SyxForm,
} from "../schema/flag"
import {Cmd} from "../schema/cmd"

import {
    FlagTy,
    Bluepr as EnvBluepr,
    default as Env,
} from "./env"

// ~~~

export namespace Delim {
    export class Bluepr {
        ;[Flag.SY_FLAG] :Stripple = ["--\n", "-", "--"]
        ;[Data.SY_DATA] :Stripple = ["=", "", ","]
    }

    export interface Inter extends Bluepr {}
}

export type Stripple = [
      string, //init sequence
      string, //short syntax form
      string] //long syntax form

function recogKind<
      Kind extends symbol>(
    tail :string,
    delim3 :Stripple,
    kinds :Kind[],
) :[Kind, Int] | null {
    const dLengths = delim3.map((e, i) =>
        [i, e, e.length] as [Int, string, Int]
    ).sort((l, r) =>
        r[2] - l[2]
    )
    const [i, len] = dLengths.reduce((
        l :[Int, Int] | [null, null],
        [kindI, curDelim, curLen] :[Int, string, Int],
        i :number,
    ) :[Int, Int] | [null, null] => {
        if (null !== l[0]) {
            const matDelim = delim3[l[0]!]
            console.log(
                `\n$  Matched delim: <<${matDelim}>> (${l[0]})`,
            )
            return l
        }

        console.log("\n$  Testing delim: <<" + curDelim + ">>")
        if (!tail.startsWith(curDelim)) return [null, null]

        return [kindI, curLen as Int]
    }, [null, null])

    return i && len && [kinds[i], len]
}

const digitMap = {
    d: till(range(0x30 as Int), 0x39 as Int),
    x: till(range(0x41 as Int), 0x46 as Int),
}

function recogFlag(
    tail :string,
    env :Env,
    {[Flag.SY_FLAG]: flagDelims} :Delim.Inter,
) :[FlagTy.Uq, Int] | null {
    if (env.flagTy === FlagTy.SHORT) {
        const poi = tail.codePointAt(0)

        if (digitMap) //TODOO
        return [FlagTy.SHORT, 0 as Int]
    }

    const kindRecog = recogKind(tail, flagDelims, [
        FlagTy.DASH_DASH,
        FlagTy.SHORT,
        FlagTy.LONG,
    ])

    return kindRecog
}

function recogData(
    tail :string,
    env :Env,
    {[Data.SY_DATA]: dataDelims} :Delim.Inter,
) {

}

export default function preparse(
    args :string[],
    delims :Delim.Inter = new Delim.Bluepr,
) {
    const argStr = args.join("\n")
    const env = new EnvBluepr()

    const flagRecog = recogFlag(
        argStr,
        env,
        delims,
    )

    if (null === flagRecog) {
        console.log("\n!  No flag recognized…")

        const dataRecog = recogData(
            argStr,
            env,
            delims,
        )
    } else {
        console.log(
            `\n!  Flag recognized: ${flagRecog[0]}`
        )
    }
}