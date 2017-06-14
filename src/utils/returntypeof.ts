// copied from https://github.com/piotrwitek/react-redux-typescript

// returntypeof() - extract return type of an "expression"
// this polyfill exist because TypeScript does not support this feature yet
// (tracking issue: https://github.com/Microsoft/TypeScript/issues/6606)
export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
    return {} as RT;
}
