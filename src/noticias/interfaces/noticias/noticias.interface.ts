export interface Noticia {
  _id: string;
  imagenes:string[];
  titulo:string;
  subtitulo:string;
  seccion:Seccion;
  autor:string;
  fecha:Date;
  contenido:string;
}
export interface Seccion{
  nombre: string;
  iconoWeb: string;
  iconoIonic: string;
}
