declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

/*
 ** Mapped types
 */
type Nullable<T> = T | null;
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type Required<T> = { [P in keyof T]-?: T[P] };
type ValuesOf<T extends readonly any[]> = T[number];
type ObjectValues<T> = T[keyof T];
type IndexableProperties<T> = keyof T extends string | number ? keyof T extends infer P ? P : never : never;
type AssertPropDefined<T, K extends keyof T = never> = {
    [P in keyof T]: P extends K ? NonNullable<T[P]> : T[P];
};
type NonEmptyArray<T> = [T, ...T[]];
type ArrayType<T extends Array<any>> = T extends (infer U)[] ? U : never;
type NameOfProp<T, P> = P extends keyof T ? P : never;

/*
 ** Common Types
 */
type CustomRange<S = any, E = any> = { start: S, end: E };

type RefLabel<T = number> = {
    id: T;
    label: string;
};