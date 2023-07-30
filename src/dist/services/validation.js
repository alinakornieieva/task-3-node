"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedNoteSchema = exports.noteSchema = exports.idSchema = void 0;
const Yup = __importStar(require("yup"));
exports.idSchema = Yup.object({
    params: Yup.object({
        id: Yup.number().required(),
    }),
}).noUnknown(true);
exports.noteSchema = Yup.object({
    body: Yup.object({
        note: Yup.string().min(3).required(),
        content: Yup.string().min(5).required(),
        dates: Yup.array().required(),
        category: Yup.string().required(),
        id: Yup.number().required(),
        archived: Yup.boolean().required(),
    }),
}).noUnknown(true);
exports.updatedNoteSchema = Yup.object({
    body: Yup.object({
        note: Yup.string().min(3).required(),
        content: Yup.string().min(5).required(),
        dates: Yup.array().required(),
        category: Yup.string().required(),
    }),
    params: Yup.object({
        id: Yup.number().required(),
    }),
}).noUnknown(true);
