export const calcularTablas = (llaves: string[], pesos: number[]): { 
  tablaA: number[][]; 
  tablaR: number[][]; 
  llavesOrdenadas: string[] 
} => {
  // Ordenar llaves lexicográficamente junto con sus pesos
  const n: number = llaves.length;
  const combinados: { llave: string; peso: number }[] = llaves
    .map((llave: string, idx: number) => ({ llave, peso: pesos[idx] }))
    .sort((a: { llave: string }, b: { llave: string }) => a.llave.localeCompare(b.llave));

  const llavesOrdenadas: string[] = combinados.map((item: { llave: string }) => item.llave);
  const pesosOrdenados: number[] = combinados.map((item: { peso: number }) => item.peso);

  const probabilidades: number[] = pesosOrdenados.map(
    (peso: number) => peso / pesosOrdenados.reduce((a: number, b: number) => a + b, 0)
  );

  // Inicializar tablas correctamente
  const tablaA: number[][] = Array.from({ length: n + 2 }, () =>
    Array(n + 1).fill(0)
  ); // n+2 para evitar desbordes al acceder a n+1
  const tablaR: number[][] = Array.from({ length: n + 1 }, () =>
    Array(n + 1).fill(0)
  );

  // Inicializar valores base de las tablas
  for (let i = 1; i <= n; i++) {
    tablaA[i][i - 1] = 0; // Diagonal inferior
    tablaA[i][i] = probabilidades[i - 1]; // Diagonal principal
    tablaR[i][i] = i; // Índice de la llave
  }
  tablaA[n + 1][n] = 0; // Asegurarse de que el último índice exista

  // Calcular tablas
  for (let diagonal = 1; diagonal < n; diagonal++) {
    for (let i = 1; i <= n - diagonal; i++) {
      const j = i + diagonal;
      let minCosto: number = Infinity;
      let mejorK: number = i;

      for (let k = i; k <= j; k++) {
        const costo: number =
          tablaA[i][k - 1] +
          tablaA[k + 1][j] +
          probabilidades.slice(i - 1, j).reduce((a: number, b: number) => a + b, 0);

        if (costo < minCosto) {
          minCosto = costo;
          mejorK = k;
        }
      }

      tablaA[i][j] = minCosto;
      tablaR[i][j] = mejorK;
    }
  }

  return { tablaA, tablaR, llavesOrdenadas };
};
