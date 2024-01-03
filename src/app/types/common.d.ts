declare type Url = string;

type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | JSONValue[];
