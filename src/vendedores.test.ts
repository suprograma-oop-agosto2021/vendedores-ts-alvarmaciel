import { Ciudad, Provincia, VendedorFijo, Viajante, Corresponsal } from "./vendedores";

describe("Vendedores", () => {
  const buenosAires = new Provincia(10000);
  const tucuman = new Provincia(10000000);
  const sierra = new Ciudad(buenosAires);
  const tafiDelValle = new Ciudad(tucuman);
  const tandil = new Ciudad(buenosAires);

  describe("1 - puede trabajar y es influyente", () => {
    describe("vendedor fijo", () => {
      const vendedorFijo = new VendedorFijo(sierra,[1,2],[2,3]);
      

      it("en la ciudad donde vive", () => {
        expect(vendedorFijo.puedeTrabajarEn(sierra)).toBeTruthy();
      });

      it("en otra ciudad", () => {
        expect(vendedorFijo.puedeTrabajarEn(tafiDelValle)).toBeFalsy();
      });

      it("No es influyente", () =>{
        expect(vendedorFijo.esInfluyente(false)).toBeTruthy();
      })

      it("es influyente", () =>{
        expect(vendedorFijo.esInfluyente(true)).toBeFalsy();
      })
    });

    describe("viajante", () => {
      const viajante = new Viajante([tucuman],[],[10,30]);
      

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(viajante.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(viajante.puedeTrabajarEn(sierra)).toBeFalsy();
      });

      it("No es influyente", () =>{
        expect(viajante.esInfluyente(false)).toBeFalsy
      });

      it("Es influyente", () =>{
        expect(viajante.esInfluyente(true)).toBeTruthy
      });

      
    });
    describe("corresponsal", () => {
      const corresponsal = new Corresponsal([tafiDelValle, sierra],[],[]);
     
      it("ciduades donde trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad donde no trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(tandil)).toBeFalsy();
      });
    });
  });
  describe("2 - Categorías", () => {
    describe("Vendedor Versatil", () => {
    const vendedorFijo2 = new VendedorFijo(tandil, [1,2],[2,3])
    

    it("Es versatil", () =>{
      expect(vendedorFijo2.tieneCategoria(true, false)).toBeTruthy;
    });
    it("Es firme", () => {
      expect(vendedorFijo2.tieneCategoria(false,true)).toBeFalsy;
    });
    it("No es nada", () => {
      expect(vendedorFijo2.tieneCategoria(false,false)).toBeFalsy;
    });
  });
  
    describe("Vendedor firme", () => {
    const viajante2 = new Viajante([tucuman], [], [10,30]);
    
    it("Es firme", () =>{
      expect(viajante2.tieneCategoria(false,true)).toBeTruthy;
    });

    it("No es firme", () => {
      expect(viajante2.tieneCategoria(true,false)).toBeFalsy;
    });
    
    it("Es ambas", () =>{
      expect(viajante2.tieneCategoria(true,true)).toBeFalsy;
    });

    it("No es ambas", () => {
      expect(viajante2.tieneCategoria(false,false)).toBeFalsy;
    });
  });

});  
});