import { NS } from '@ns';

export async function main(ns: NS) {
  const values = {
    'Find Largest Prime Factor': notImplemented,
    'Subarray with Maximum Sum': notImplemented,
    'Total Ways to Sum': notImplemented,
    'Total Ways to Sum II': notImplemented,
    'Spiralize Matrix': notImplemented,
    'Array Jumping Game': notImplemented,
    'Array Jumping Game II': notImplemented,
    'Merge Overlapping Intervals': notImplemented,
    'Generate IP Addresses': notImplemented,
    'Algorithmic Stock Trader I': notImplemented,
    'Algorithmic Stock Trader II': notImplemented,
    'Algorithmic Stock Trader III': notImplemented,
    'Algorithmic Stock Trader IV': notImplemented,
    'Minimum Path Sum in a Triangle': notImplemented,
    'Unique Paths in a Grid I': notImplemented,
    'Unique Paths in a Grid II': notImplemented,
    'Shortest Path in a Grid': notImplemented,
    'Sanitize Parentheses in Expression': notImplemented,
    'Find All Valid Math Expressions': notImplemented,
    'HammingCodes: Integer to Encoded Binary': notImplemented,
    'HammingCodes: Encoded Binary to Integer': notImplemented,
    'Proper 2-Coloring of a Graph': notImplemented,
    'Compression I: RLE Compression': notImplemented,
    'Compression II: LZ Decompression': notImplemented,
    'Compression III: LZ Compression': notImplemented,
    'Encryption I: Caesar Cipher': notImplemented,
    'Encryption II: Vigenère Cipher': notImplemented,
  };

  const contractMap = new Map(Object.entries(values));

  const types = ns.codingcontract.getContractTypes();

  types.forEach((type) => {
    contractMap.get(type)(ns, type);
  });
}

function notImplemented(ns: NS, key: string) {
  ns.tprint(`${key} - Not solved yet.`);
}
