import {
    Int,
} from "@beyond-life/lowbar"

// ~~~

// Data:
export namespace Data {
    export const SY_DATA :unique symbol =
        Symbol("<data content symbolization>")

    export const INITIAL :unique symbol =
        Symbol("<flag's initial data value>")
}    

// Data Type:
export namespace Ty {
    export const STR :unique symbol =
        Symbol("<string flag>")
    export const NUM : unique symbol =
        Symbol("<numeric flag>")
    export const NUM_INT :unique symbol =
        Symbol("<integer-numberic flag>")
    export const BOOL :unique symbol =
        Symbol("<boolean flag>")
        
    export type Uq = never
        | typeof STR
        | typeof NUM
        | typeof NUM_INT
        | typeof BOOL

    export type NativeVal = string | boolean | number
    export interface Ty2Native {
        [STR] :string
        [NUM] :number
        [NUM_INT] :number
        [BOOL] :boolean
    }
}