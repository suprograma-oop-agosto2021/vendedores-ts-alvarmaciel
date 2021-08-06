import { Ciudad, Provincia, VendedorFijo, Viajante, Corresponsal } from "./vendedores";

describe("Vendedores", () => {
  const buenosAires = new Provincia(10000);
  const tucuman = new Provincia(1000);
  const sierra = new Ciudad(buenosAires);
  const tafiDelValle = new Ciudad(tucuman);
  const tandil = new Ciudad(buenosAires);

  describe("1 - puede trabajar", () => {
    describe("vendedor fijo", () => {
      const vendedorFijo = new VendedorFijo(sierra);

      it("en la ciudad donde vive", () => {
        expect(vendedorFijo.puedeTrabajarEn(sierra)).toBeTruthy();
      });

      it("en otra ciudad", () => {
        expect(vendedorFijo.puedeTrabajarEn(tafiDelValle)).toBeFalsy();
      });
    });

    describe("viajante", () => {
      const viajante = new Viajante([tucuman]);

      it("una ciudad que queda en una provincia donde trabaja", () => {
        expect(viajante.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad que queda en una provincia donde no trabaja", () => {
        expect(viajante.puedeTrabajarEn(sierra)).toBeFalsy();
      });
    });
    describe("corresponsal", () => {
      const corresponsal = new Corresponsal([tafiDelValle, sierra]);

      it("ciduades donde trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(tafiDelValle)).toBeTruthy();
      });

      it("una ciudad donde no trabaja", () => {
        expect(corresponsal.puedeTrabajarEn(tandil)).toBeFalsy();
      });
    });

  });
});
