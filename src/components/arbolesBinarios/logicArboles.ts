export const calcularTablas = (llaves: string[], pesos: number[]): {
  tablaA: number[][];
  tablaR: number[][];
  llavesOrdenadas: string[];
  arbol: any;
} => {
  const n: number = llaves.length;
  const combinados = llaves
    .map((llave, idx) => ({ llave, peso: pesos[idx] }))
    .sort((a, b) => a.llave.localeCompare(b.llave));

  const llavesOrdenadas = combinados.map((item) => item.llave);
  const pesosOrdenados = combinados.map((item) => item.peso);
  const probabilidades = pesosOrdenados.map(
    (peso) => peso / pesosOrdenados.reduce((a, b) => a + b, 0)
  );

  const tablaA = Array.from({ length: n + 2 }, () => Array(n + 1).fill(0));
  const tablaR = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

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
          tablaA[i][k - 1] +
          tablaA[k + 1][j] +
          probabilidades.slice(i - 1, j).reduce((a, b) => a + b, 0);

        if (costo < minCosto) {
          minCosto = costo;
          mejorK = k;
        }
      }

      tablaA[i][j] = minCosto;
      tablaR[i][j] = mejorK;
    }
  }

  const generarArbol = (tablaR: number[][], llaves: string[]): any => {
    const construirArbol = (i: number, j: number): any => {
      if (i > j) return null;

      const k = tablaR[i][j];
      return {
        llave: llaves[k - 1],
        izquierda: construirArbol(i, k - 1),
        derecha: construirArbol(k + 1, j),
      };
    };

    return construirArbol(1, llaves.length);
  };

  const arbol = generarArbol(tablaR, llavesOrdenadas);

  return { tablaA, tablaR, llavesOrdenadas, arbol };
};