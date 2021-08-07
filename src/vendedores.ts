import R, { any } from "ramda";

abstract class Vendedor {
  abstract certificacionesProductos: number[];
  abstract certificacionesSimples: number[];
  //abstract versatil: boolean;
  //abstract firme: boolean;
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
  abstract tieneCategoria(versatil: Categoria, firme: Categoria): boolean;
}

export class VendedorFijo extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  constructor(public ciudadOrigen: Ciudad, public esVersatil: Categoria, public esFirme: Categoria) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.esVersatil == true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.esFirme == true;
    } else {
      this.esVersatil == false;
      this.esFirme == false;
    }
  }

  tieneCategoria(versatil: Categoria, firme: Categoria): boolean {
    return(versatil == this.esVersatil, firme == this.esFirme);
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen;
  }
}

export class Viajante extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  constructor(public provinciasDondeTrabaja: Provincia[], public esVersatil: Categoria, public esFirme: Categoria) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.esVersatil == true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.esFirme == true;
    } else {
      this.esVersatil == false;
      this.esFirme == false;
    }
  }
  tieneCategoria(versatil: Categoria, firme: Categoria): boolean {
    return(versatil == this.esVersatil, firme == this.esFirme);
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }
}


export class Corresponsal extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  constructor(public ciudadesDondeTrabaja : Ciudad[], public esVersatil: Categoria, public esFirme: Categoria) {
    super();
    if (this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length >= 1 && this.certificacionesProductos.length + this.certificacionesSimples.length >= 3 ){
      this.esVersatil == true;
    } else if (R.sum(this.certificacionesSimples) + R.sum(this.certificacionesProductos) >= 30) {
      this.esFirme == true;
    } else {
      this.esVersatil == false;
      this.esFirme == false;
    }
  }

  tieneCategoria(versatil: Categoria, firme: Categoria): boolean {
    return(versatil == this.esVersatil, firme == this.esFirme);
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

export class Categoria {
}