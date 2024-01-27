import jwt, { decode } from "jsonwebtoken";
import { Request, Response } from "express";
import { config } from "../config";
import { TypeData } from "../store/dummy.schema";

const secret = config.secureKey as string;
function sign(data: string) {
  return jwt.sign(data, secret);
}
function getToken(auth: string): string {
  if (!auth) {
    throw new Error(" Error al no venir token");
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw new Error(" Error token invalido");
  }
  let token = auth.replace("Bearer ", "");
  return token;
}

function verify(token: string) {
  return jwt.verify(token, secret);
}

export function decodeHeader(req: Request): any {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  return decoded;
}

const check = {
  own: (req: Request, owner: any) => {
    //decodificar lo que viene en el heather
    const decoded = decodeHeader(req);

    //TODO comprobar el decode

    if (decoded.id !== owner) {
      throw new Error("you can't edit other user info");
    }
  },
  follow: (req: Request) => {
    const decoded = decodeHeader(req);
    return decoded;
  },
};

export const auth = {
  sign,
  check,
};
