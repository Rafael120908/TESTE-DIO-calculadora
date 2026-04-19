(function () {
  const capitaisBR = [
    { city: 'Rio Branco', state: 'AC', lat: -9.97499, lon: -67.8243 },
    { city: 'Maceió', state: 'AL', lat: -9.66599, lon: -35.7350 },
    { city: 'Macapá', state: 'AP', lat: 0.03493, lon: -51.0694 },
    { city: 'Manaus', state: 'AM', lat: -3.10194, lon: -60.0250 },
    { city: 'Salvador', state: 'BA', lat: -12.9777, lon: -38.5016 },
    { city: 'Fortaleza', state: 'CE', lat: -3.71839, lon: -38.5434 },
    { city: 'Brasília', state: 'DF', lat: -15.7942, lon: -47.8822 },
    { city: 'Vitória', state: 'ES', lat: -20.3155, lon: -40.3128 },
    { city: 'Goiânia', state: 'GO', lat: -16.6869, lon: -49.2648 },
    { city: 'São Luís', state: 'MA', lat: -2.53874, lon: -44.2827 },
    { city: 'Cuiabá', state: 'MT', lat: -15.6010, lon: -56.0979 },
    { city: 'Campo Grande', state: 'MS', lat: -20.4486, lon: -54.6293 },
    { city: 'Belo Horizonte', state: 'MG', lat: -19.9167, lon: -43.9345 },
    { city: 'Belém', state: 'PA', lat: -1.4550, lon: -48.5024 },
    { city: 'João Pessoa', state: 'PB', lat: -7.1195, lon: -34.8450 },
    { city: 'Curitiba', state: 'PR', lat: -25.4297, lon: -49.2719 },
    { city: 'Recife', state: 'PE', lat: -8.0476, lon: -34.8770 },
    { city: 'Teresina', state: 'PI', lat: -5.0919, lon: -42.8034 },
    { city: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lon: -43.1729 },
    { city: 'Natal', state: 'RN', lat: -5.7945, lon: -35.2110 },
    { city: 'Porto Alegre', state: 'RS', lat: -30.0346, lon: -51.2177 },
    { city: 'Porto Velho', state: 'RO', lat: -8.7608, lon: -63.8999 },
    { city: 'Boa Vista', state: 'RR', lat: 2.81955, lon: -60.6738 },
    { city: 'Florianópolis', state: 'SC', lat: -27.5969, lon: -48.5495 },
    { city: 'São Paulo', state: 'SP', lat: -23.5505, lon: -46.6333 },
    { city: 'Aracaju', state: 'SE', lat: -10.9472, lon: -37.0731 },
    { city: 'Palmas', state: 'TO', lat: -10.1847, lon: -48.3336 }
  ];

  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  function haversineDistance(pointA, pointB) {
    const earthRadiusKm = 6371;
    const deltaLat = toRadians(pointB.lat - pointA.lat);
    const deltaLon = toRadians(pointB.lon - pointA.lon);
    const latA = toRadians(pointA.lat);
    const latB = toRadians(pointB.lat);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2) * Math.cos(latA) * Math.cos(latB);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  function estimateRouteDistance(pointA, pointB) {
    const rawDistance = haversineDistance(pointA, pointB);
    const roadMultiplier = 1.25;
    return Math.round(rawDistance * roadMultiplier);
  }

  const capitaisList = capitaisBR.map(capital => `${capital.city}, ${capital.state}`).sort();
  const rotasBR = {};

  for (let i = 0; i < capitaisBR.length; i += 1) {
    for (let j = i + 1; j < capitaisBR.length; j += 1) {
      const origin = `${capitaisBR[i].city}, ${capitaisBR[i].state}`;
      const destination = `${capitaisBR[j].city}, ${capitaisBR[j].state}`;
      const distance = estimateRouteDistance(capitaisBR[i], capitaisBR[j]);
      const key = [origin, destination].sort().join('|');
      rotasBR[key] = distance;
    }
  }

  window.capitaisList = capitaisList;
  window.rotasBR = rotasBR;
})();
