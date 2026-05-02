import argon2 from 'argon2';

const ARGON2_OPTIONS: argon2.Options ={
    type: argon2.argon2id,
    memoryCost: 65536, // 64MiB
    timeCost: 3, 
    parallelism: 4, 
    hashLength: 32,
}

export async function hashPassword(plain: string): Promise<string>{
    return argon2.hash(plain, ARGON2_OPTIONS);
}

export async function verifyPassword(hash:string, plain:string){
    return argon2.verify(hash, plain);
}
