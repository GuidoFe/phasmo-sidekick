interface WheelElement {
    n: number;

};
export interface Challenge {
    name: string;
    code: string;
    hasWheel: boolean;
    hasDuplicates: boolean;
    desc: string;
    wheel: Map<string, WheelElement>;
}
