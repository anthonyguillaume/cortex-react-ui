export namespace Cortex {
    export type Tag = {
        id: string,
        label: string
    };

    export type TagSuggestion = {
        id: string,
        label: string,
        group?: boolean,
        suggestions?: TagSuggestion[]
    };
}