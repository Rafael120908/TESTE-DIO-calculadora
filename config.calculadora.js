(function () {
  const emissionFactors = {
    bicicleta: 0.00,
    onibus: 0.06,
    carro: 0.20,
    caminhao: 0.70,
  };

  function calculateCO2(distanceKm, transportMode) {
    const factor = emissionFactors[transportMode];
    if (typeof factor !== 'number' || !distanceKm || distanceKm <= 0) {
      return null;
    }
    return Number((distanceKm * factor).toFixed(2));
  }

  function getEmissionFactor(mode) {
    return emissionFactors[mode] ?? null;
  }

  function getTransportLabel(mode) {
    const labels = {
      bicicleta: 'Bicicleta',
      onibus: 'Ônibus',
      carro: 'Carro',
      caminhao: 'Caminhão',
    };
    return labels[mode] || 'Transporte';
  }

  window.calculadoraConfig = {
    emissionFactors,
    calculateCO2,
    getEmissionFactor,
    getTransportLabel,
  };
})();
