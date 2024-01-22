// store.js
import { defineStore } from 'pinia';

export default defineStore('main', {
  state: () => ({
    products: [
      { 
        name:	"IPQC60R040S7A",
        type: "CoolMOS™ S7A",
        automotivequalified: "Yes",
        IDmax: "14 A",
        IDpulsmax: "207 A",
        Mounting:	"SMT",
        OperatingTemperature: "min -40 °C max 150 °C",
        Ptotmax: "272 W",
        Package: "QCPAK",
        Polarity: "N",
        QG: "83 nC",
        RDSon: "max 40 mΩ",
        Technology: "CoolMOS™ S7A",
        VDS: "max 600 V",
        VGSth: "min 3.5 V max 4.5 V",
        ProductStatus: "Active and preferred",
      }, // add other product details here
      { name: 'BSP135I',
        BudgetaryPrice: "€/1k 0.35",
      ID: "@25°C max 0.12 A",
      IDpuls: "max 0.48 A",
      Mounting: "SMT",
      OperatingTemperature: "min -55 °C max 150 °C",
      Ptot: "max 1.8 W",
      Package: "SOT-223",
      PinCount: "4 Pins",
      Polarity: "N",
      QGtyp: "@4.5V 3.7 nC",
      RDSon: "@0V 60000 mΩ | @4.5V 45000 mΩ",
      SpecialFeatures: "Depletion mode",
      VDS: "max	600 V",
      VGSth: "min -1.4 V max -1 V"}
    ],
    selectedProduct: undefined,
    selectedAudience: 'general',
    selectedTone: 'professional',
    additionalRemarks: '',
  }),
  actions: {
    setProduct(product) {
      this.selectedProduct = product;
    },
    setAudience(audience) {
      this.selectedAudience = audience;
    },
    setTone(tone) {
      this.selectedTone = tone;
    },
    setAdditionalRemarks(additionalRemarks) {
      this.additionalRemarks = additionalRemarks;
    }
  },
});