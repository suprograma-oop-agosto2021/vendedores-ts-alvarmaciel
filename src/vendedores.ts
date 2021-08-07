import R, { any } from "ramda";

abstract class Vendedor {
  abstract certificacionesProductos: number[];
  abstract certificacionesSimples: number[];
  abstract versatil: boolean;
  abstract firme: boolean;
  abstract puedeTrabajarEn(ciudad: Ciudad): boolean;
  abstract tieneCategoria(versatil: Categoria, firme: Categoria): boolean;
}

export class VendedorFijo extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  constructor(public ciudadOrigen: Ciudad, public versatil: boolean, public firme: boolean) {
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

  tieneCategoria(): boolean {
    //versatil == this.versatil;
    //firme == this.firme;
    return(this.versatil, this.firme);
  }

  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return ciudad == this.ciudadOrigen;
  }
}

export class Viajante extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  constructor(public provinciasDondeTrabaja: Provincia[], public versatil: boolean, public firme: boolean) {
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
  tieneCategoria(): boolean {
    //versatil == this.versatil;
    //firme == this.firme;
    return(this.versatil, this.firme);
  }
  puedeTrabajarEn(ciudad: Ciudad): boolean {
    return any((p) => p == ciudad.provincia, this.provinciasDondeTrabaja);
  }
}


export class Corresponsal extends Vendedor {
  certificacionesProductos: number[] = [];
  certificacionesSimples: number[] = [];
  constructor(public ciudadesDondeTrabaja : Ciudad[], public versatil: boolean, public firme: boolean) {
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

  tieneCategoria(): boolean {
    //versatil == this.versatil;
    //firme == this.firme;
    return(this.versatil, this.firme);
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