import { Request, Response } from "express";

interface Props {
  res: Response;
  message: any;
  status?: number;
  req?: Request;
}

export const estatusSuccess = (props: Props) => {
  let statusMessage = props.message || "no hay datos";

  props.res.send({
    error: props.message ? false : true,
    status: props.status,
    body: statusMessage,
  });
};

export const estatusError = (props: Props) => {
  let statusMessage = props.message || "";

  props.res.send({
    error: true,
    status: props.status,
    body: statusMessage,
  });
};
