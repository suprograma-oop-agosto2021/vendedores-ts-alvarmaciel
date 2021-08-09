import R, { any } from "ramda";

abstract class Vendedor {
  certificacionesProductos?: number[] = [];
  certificacionesSimples?: number[] = [];
  firme?: boolean;
  versatil?: boolean;
  influyente!: boolean;
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
}

export class VendedorFijo extends Vendedor implements IVendedor, IInfluyente {
  constructor(public ciudadOrigen: Ciudad,public certificacionesProductos: number[], public certificacionesSimples: number[]) {
    super();
    // todo esto tendría que ir en un metodo de la clase abstracta pero no me saliógir
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.versatil = true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.firme = true;
    } else {
      this.versatil = false;
      this.firme = false;
    }
    // Defino Influyente como false
    this.influyente = false;

  }
  esInfluyente(influyente: boolean): boolean {
    return influyente == this.influyente;
  }
  
  tieneCategoria(versatil: boolean, firme: boolean): boolean{
    return(versatil == this.versatil, firme == this.firme);
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen;
  }
}

export class Viajante extends Vendedor implements IVendedor, IInfluyente {
  constructor(public provinciasDondeTrabaja: Provincia[]  ,public certificacionesProductos: number[], public certificacionesSimples: number[]) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.versatil = true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.firme = true;
    } else {
      this.versatil = false;
      this.firme = false;
    }
    // Esta es una solución muy pedorra para sumar las poblaciones. pero bue. Esto me tiraba error R.sum(this.provinciasDondeTrabaja[].poblacion) >= 10000000
    
    let poblacionTotal=0;

    for (let i = 0; i < this.provinciasDondeTrabaja.length; i++) {
      poblacionTotal += this.provinciasDondeTrabaja[i].poblacion
    }
    if (poblacionTotal >= 10000000){ //viajante.provinciasDondeTrabaja[0].poblacion
      this.influyente = true;
    } else {
      this.influyente = false;
    }

  }
  esInfluyente(influyente: boolean): boolean {
    return influyente == this.influyente;
  }
  
  tieneCategoria(versatil: boolean, firme: boolean): boolean{
    return(versatil == this.versatil, firme == this.firme);
  } 
  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }
}


export class Corresponsal extends Vendedor implements IVendedor, IInfluyente {
  constructor(public ciudadesDondeTrabaja : Ciudad[],public certificacionesProductos: number[], public certificacionesSimples: number[]) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.versatil = true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.firme = true;
    } else {
      this.versatil = false;
      this.firme = false;
    }
    if (ciudadesDondeTrabaja.length >= 5){
      this.influyente=true;
    } else {
      this.influyente=false;
    }
  }
  esInfluyente(influyente: boolean): boolean {
    return influyente == this.influyente;
  }

  tieneCategoria(versatil: boolean, firme: boolean): boolean{
    return(versatil == this.versatil, firme == this.firme);
  }
  puedeTrabajarEn(ciudad: Ciudad): boolean{
    return any((c) => c == ciudad, this.ciudadesDondeTrabaja);
  }
}

export class CentroDistribucion{
  constructor(public ciudad: Ciudad, public vendedores: any[]:[VendedorFijo, Viajante, Corresponsal]){

  }
  agregarVendedor(_vendedores: any[]){
    if (R.contains(_vendedores,this.vendedores)){
      return(console.log("Ya está el vendedor en el centro"))
    } else {
      R.append(_vendedores, this.vendedores)
    }

  }

}


export class Provincia {
  constructor(public poblacion: number){

  }
}

export class Ciudad {
  constructor(public provincia: Provincia) {}
}

export interface IVendedor {
  versatil?: boolean;
  firme?: boolean;
  tieneCategoria(versatil: boolean, firme: boolean): boolean;
  }

export interface IInfluyente {
  influyente: boolean;
  esInfluyente(influyente: boolean): boolean;

}
