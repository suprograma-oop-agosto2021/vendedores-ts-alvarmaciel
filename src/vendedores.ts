import R, { any } from "ramda";

abstract class Vendedor {
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
  abstract certificacionesProductos: number[];
  abstract certificacionesSimples: number[];
  abstract categoria: string;
  abstract tieneLaCategoria(categoria: string): string;
}

export class VendedorFijo extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  categoria = "";
  constructor(public ciudadOrigen: Ciudad) {
    super();
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen;
  }
  tieneLaCategoria(categoria: string): string{
    if (this.certificacionesProductos.length >= 2 && this.certificacionesProductos.length >= 1){
      return categoria = "versátil";
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      return categoria = "firme";
    }else {
      return categoria = "Sin categoría aún";
    }
  }
}

export class Viajante extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  categoria = "";
  constructor(public provinciasDondeTrabaja: Provincia[]) {
    super();

  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }
  tieneLaCategoria(categoria: string): string{
    if (this.certificacionesProductos.length >= 2 && this.certificacionesProductos.length >= 1){
      return categoria = "versátil";
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      return categoria = "firme";
    }else {
      return categoria = "Sin categoría aún";
    }
  }
}


export class Corresponsal extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  categoria = "";
  constructor(public ciudadesDondeTrabaja : Ciudad[]){
    super();
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean{
    return any((c) => c == ciudad, this.ciudadesDondeTrabaja);
  }
  tieneLaCategoria(categoria: string): string{
    if (this.certificacionesProductos.length >= 2 && this.certificacionesProductos.length >= 1){
      return categoria = "versátil";
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      return categoria = "firme";
    }else {
      return categoria = "Sin categoría aún";
    }
  }
}


export class Provincia {
  constructor(public poblacion: number){}
}

export class Ciudad {
  constructor(public provincia: Provincia) {}
}
