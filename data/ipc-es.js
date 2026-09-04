/**
 * Índice de Precios de Consumo (IPC) — España
 * ------------------------------------------------------------------
 * Tasa de variación interanual del IPC general, dato de diciembre de
 * cada año (variación de diciembre de un año respecto a diciembre del
 * año anterior). Es la cifra que el INE publica y difunde como
 * "inflación del año".
 *
 * Fuente: Instituto Nacional de Estadística (INE).
 *   - Serie oficial "El IPC en un clic": https://www.ine.es/varipc/
 *   - Notas de prensa mensuales del IPC: https://www.ine.es/prensa/ipc_tabla.htm
 *
 * El valor de 2025 corresponde al indicador adelantado de diciembre de
 * 2025 publicado por el INE; puede diferir en una décima del dato
 * definitivo cuando este se publique.
 *
 * TODO(datos): cada enero, cuando el INE publique el dato definitivo de
 * diciembre del año anterior, revisar la cifra correspondiente y añadir
 * el nuevo año a este objeto. No añadir ningún año sin dato oficial
 * publicado por el INE: es preferible dejar la serie corta que
 * inventar o estimar una cifra.
 */
const IPC_ES = {
  2010: 3.0,
  2011: 2.4,
  2012: 2.9,
  2013: 0.3,
  2014: -1.0,
  2015: 0.0,
  2016: 1.6,
  2017: 1.1,
  2018: 1.2,
  2019: 0.8,
  2020: -0.5,
  2021: 6.5,
  2022: 5.7,
  2023: 3.1,
  2024: 2.8,
  2025: 2.9
};

// Último año con dato disponible en la serie. La calculadora usa este
// año como referencia de "hoy" (no hay datos de IPC del año en curso
// hasta que el INE publica el cierre de diciembre).
const IPC_ES_LAST_YEAR = Math.max.apply(null, Object.keys(IPC_ES).map(Number));
const IPC_ES_FIRST_YEAR = Math.min.apply(null, Object.keys(IPC_ES).map(Number));
