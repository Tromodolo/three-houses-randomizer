export type Route = {
    id: number,
    name: string,
    mainCharacter: number,
    darkSeals: number,
    usedSeals?: number,
};

export type Classes = {
    unique: UniqueClass[],
    beginner: BeginnerClass[],
    intermediate: IntermediateClass[],
    advanced: AdvancedClass[]
    master: MasterClass[],
};

export type UniqueClass = {
    id: number,
    name: string,
    uniqueToCharacter: boolean,
};

export type BeginnerClass = {
    id: number,
    name: string,
    requires: string[],
    viableUpgrades: number[];
};

export type IntermediateClass = {
    id: number,
    name: string,
    requires: string[],
    viableUpgrades: number[];
};

export type AdvancedClass = {
    id: number,
    name: string,
    requires: string[],
    viableUpgrades: number[];
};

export type MasterClass = {
    id: number,
    name: string,
    requires: string[],
};

export type CharacterClassResult = {
    character: Character,
    classes: {
        unique?: UniqueClass,
        beginner?: BeginnerClass,
        intermediate?: IntermediateClass,
        advanced?: AdvancedClass,
        master?: MasterClass,
    }
};

export type Character = {
    id: number,
    name: string,
    gender: string,
    availableOnRoutes: number[],
    uniqueClasses: number[],
    forcedDeployOn: number[],
};

export type Flags = {
    withClassTrees: boolean,
    includeSpecialClasses: boolean,
    chosenCharacters: boolean,
};

export type Ruleset = {
    route: Route,
    availableCharacters: Array<Character>;
    characters: Array<Character>,
    flags: Flags,
    seed?: string;
};

export type Result = {
    input?: Ruleset;
    characters: CharacterClassResult[];
};


