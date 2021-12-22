export declare namespace Cortex {
    type Tag = {
        id: string;
        label: string;
    };
    type TagSuggestion = {
        id: string;
        label: string;
        group?: boolean;
        suggestions?: TagSuggestion[];
    };
}
