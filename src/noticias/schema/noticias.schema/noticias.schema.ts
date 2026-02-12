import { Schema } from 'mongoose';
const SeccionSchema = new Schema({
  nombre: { type: String, required: true },
  iconoWeb: { type: String, required: true },
  iconoIonic: { type: String, required: true },
},
  {_id: false }
);
export const NoticiasSchema = new Schema({
  imagenes: [{ type: String, required: true }],
  titulo: { type: String, required: true, index: true, unique: true },
  subtitulo: { type: String, required: true },
  seccion: { type: SeccionSchema, required: true },
  autor: { type: String, required: true },
  fecha: { type: Date, required: true },
  contenido: { type: String, required: true },
},
{versionKey: false, timestamps: true}
);
