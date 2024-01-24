"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estatusError = exports.estatusSuccess = void 0;
const estatusSuccess = (props) => {
    let statusMessage = props.message || 'no hay datos';
    props.res.send({
        error: props.message ? false : true,
        status: props.status,
        body: statusMessage
    });
};
exports.estatusSuccess = estatusSuccess;
const estatusError = (props) => {
    let statusMessage = props.message || '';
    props.res.send({
        error: true,
        status: props.status,
        body: statusMessage
    });
};
exports.estatusError = estatusError;
