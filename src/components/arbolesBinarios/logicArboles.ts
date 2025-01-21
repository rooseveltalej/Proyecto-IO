export const calcularTablas = (
  llaves: string[],
  pesos: number[]
): {
  //Matrices necesarias
  tablaA: number[][]; 
  tablaR: number[][]; 
  llavesOrdenadas: string[]; 
  arbol: any; 
} => {
  const n: number = llaves.length;

  // Combina las llaves y pesos en objetos, luego los ordena alfabéticamente por llave
  const combinados = llaves
    .map((llave, idx) => ({ llave, peso: pesos[idx] }))
    .sort((a, b) => a.llave.localeCompare(b.llave)); // Orden alfabético

  // Extrae las llaves y pesos ordenados en listas separadas
  const llavesOrdenadas = combinados.map((item) => item.llave);
  const pesosOrdenados = combinados.map((item) => item.peso);

  // Calcula las probabilidades
  const probabilidades = pesosOrdenados.map(
    (peso) => peso / pesosOrdenados.reduce((a, b) => a + b, 0) // Peso dividido por la suma total de pesos
  );

  // Inicializa las matrices tablaA (costos) y tablaR (raíces)
  const tablaA = Array.from({ length: n + 2 }, () => Array(n + 1).fill(0)); // n+2 filas para manejar casos fuera de rango
  const tablaR = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0)); // n+1 filas y columnas para las raíces

  // Caso base: subárboles de tamaño 0 y 1
  for (let i = 1; i <= n; i++) {
    tablaA[i][i - 1] = 0; // Costos de subárboles vacíos
    tablaA[i][i] = probabilidades[i - 1]; // Costos de subárboles de tamaño 1
    tablaR[i][i] = i; // Raíz del subárbol es la llave actual
  }
  tablaA[n + 1][n] = 0; // Costos fuera del rango (base para los cálculos)

  // Itera sobre las diagonales de la matriz (subárboles más grandes)
  for (let diagonal = 1; diagonal < n; diagonal++) {
    for (let i = 1; i <= n - diagonal; i++) {
      const j = i + diagonal; // Índice del final del subárbol
      let minCosto = Infinity; // Inicializa con el máximo posible
      let mejorK = i; // Variable para almacenar la mejor raíz

      // Calcula el costo para cada posible raíz k en el rango [i, j]
      for (let k = i; k <= j; k++) {
        const costo =
          tablaA[i][k - 1] + // Costo del subárbol izquierdo
          tablaA[k + 1][j] + // Costo del subárbol derecho
          probabilidades.slice(i - 1, j).reduce((a, b) => a + b, 0); // Suma de probabilidades en el rango

        // Actualiza el costo mínimo y la mejor raíz
        if (costo < minCosto) {
          minCosto = costo;
          mejorK = k;
        }
      }

      // Almacena el costo mínimo y la raíz óptima
      tablaA[i][j] = minCosto;
      tablaR[i][j] = mejorK;
    }
  }

  // Función para generar el árbol binario óptimo a partir de tablaR
  const generarArbol = (tablaR: number[][], llaves: string[]): any => {
    // Función recursiva para construir el árbol
    const construirArbol = (i: number, j: number): any => {
      if (i > j) return null; // Caso base: subárbol vacío

      const k = tablaR[i][j]; // Raíz óptima para el rango [i, j]
      return {
        llave: llaves[k - 1], // Llave correspondiente a la raíz
        izquierda: construirArbol(i, k - 1), // Construye el subárbol izquierdo
        derecha: construirArbol(k + 1, j), // Construye el subárbol derecho
      };
    };

    return construirArbol(1, llaves.length); // Inicia con el rango completo
  };

  // Genera el árbol binario óptimo
  const arbol = generarArbol(tablaR, llavesOrdenadas);

  // Retorna los resultados
  return { tablaA, tablaR, llavesOrdenadas, arbol };
};
