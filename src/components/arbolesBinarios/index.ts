export const calcularTablas = (llaves: string[], pesos: number[]) => {
  const n = llaves.length;
  const probabilidades = pesos.map((peso) => peso / pesos.reduce((a, b) => a + b, 0));
  const tablaA: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  const tablaR: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    tablaA[i][i - 1] = 0;
    tablaA[i][i] = probabilidades[i - 1];
    tablaR[i][i] = i;
  }
  tablaA[n + 1][n] = 0;

  for (let diagonal = 1; diagonal < n; diagonal++) {
    for (let i = 1; i <= n - diagonal; i++) {
      const j = i + diagonal;
      let minCosto = Infinity;
      let mejorK = i;

      for (let k = i; k <= j; k++) {
        const costo =
          tablaA[i][k - 1] + tablaA[k + 1][j] + probabilidades.slice(i - 1, j).reduce((a, b) => a + b, 0);
        if (costo < minCosto) {
          minCosto = costo;
          mejorK = k;
        }
      }

      tablaA[i][j] = minCosto;
      tablaR[i][j] = mejorK;
    }
  }

  return { tablaA, tablaR };
};
