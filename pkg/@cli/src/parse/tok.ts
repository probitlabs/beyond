import {
    Int, isInt,
    isStr, areStr,
    till, range,
} from "@beyond-life/lowbar"

import {Latin} from "../char-pois"

import {
    Bluepr as EnvBluepr,
    default as Env,
} from "./env"

import {
    State,
    parse,
} from "./pre"

// ~~~

export default function tok(
    argsG :(string | Int[])[],
) {
    const args = areStr(argsG)
        ? argsG.map((arg :string) :Int[] =>
            [...arg].map((poiStr :string) =>
                poiStr.charCodeAt(0) as Int
            )
        )
        : argsG as Int[][]
    const toks = args.reduce(
        (l :State[], r :Int[]) :State[] => [...l, parse(r, l[l.length-1][0])],
        [[
            new EnvBluepr(),
            [] as Int[],
        ]] as State[],
    )
}