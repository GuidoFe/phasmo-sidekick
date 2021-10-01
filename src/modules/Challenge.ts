export type WheelElement = {
    n?: number;
    desc: string;
};
export interface Challenge {
    name: string;
    code: string;
    hasWheel: boolean;
    hasDuplicates: boolean;
    desc: string;
    wheel: Map<string, WheelElement>;
    pool:Array<string>;
}
