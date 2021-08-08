import R, { any } from "ramda";

abstract class Vendedor {
  
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
}

export class VendedorFijo extends Vendedor implements IVendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  firme?: boolean;
  versatil?: boolean;
  constructor(public ciudadOrigen: Ciudad) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.versatil == true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.firme == true;
    } else {
      this.versatil == false;
      this.firme == false;
    }
  }
  
  tieneCategoria(versatil: boolean, firme: boolean): boolean{
    return(versatil == this.versatil, firme == this.firme);
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen;
  }
}

export class Viajante extends Vendedor implements IVendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  firme?: boolean;
  versatil?: boolean;
  constructor(public provinciasDondeTrabaja: Provincia[]) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.versatil == true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.firme == true;
    } else {
      this.versatil == false;
      this.firme == false;
    }
  }
  
  tieneCategoria(versatil: boolean, firme: boolean): boolean{
    return(versatil == this.versatil, firme == this.firme);
  } 
  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }
}


export class Corresponsal extends Vendedor implements IVendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  firme?: boolean;
  versatil?: boolean;
  constructor(public ciudadesDondeTrabaja : Ciudad[]) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.versatil == true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.firme == true;
    } else {
      this.versatil == false;
      this.firme == false;
    }
  }

  tieneCategoria(versatil: boolean, firme: boolean): boolean{
    return(versatil == this.versatil, firme == this.firme);
  }
  puedeTrabajarEn(ciudad: Ciudad): boolean{
    return any((c) => c == ciudad, this.ciudadesDondeTrabaja);
  }
}


export class Provincia {
  constructor(public poblacion: number){}
}

export class Ciudad {
  constructor(public provincia: Provincia) {}
}

export interface IVendedor {
  versatil?: boolean;
  firme?: boolean;
  tieneCategoria(versatil: boolean, firme: boolean): boolean;
  }