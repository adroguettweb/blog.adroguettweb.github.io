---
title: "Introducción a las window functions en SQL"
description: "Qué son las funciones de ventana, cuándo usarlas en lugar de un GROUP BY, y ejemplos prácticos con ROW_NUMBER, RANK y SUM() OVER."
category: "Tutoriales"
date: 2026-08-20
tags: ["SQL", "bases de datos"]
draft: false
---

[CONTENIDO DE EJEMPLO — reemplaza este artículo por tu propio tutorial de SQL]

Las **window functions** (funciones de ventana) permiten hacer cálculos a través
de un conjunto de filas relacionadas con la fila actual, sin colapsar el resultado
como lo haría un `GROUP BY`.

## El problema que resuelven

Con un `GROUP BY` normal, si quieres el promedio de ventas por región, pierdes el
detalle de cada fila individual:

```sql
SELECT region, AVG(monto) AS promedio_region
FROM ventas
GROUP BY region;
```

Si en cambio quieres mantener cada fila de venta individual y *además* saber el
promedio de su región al lado, ahí es donde entra una window function.

## Sintaxis básica

```sql
SELECT
  id_venta,
  region,
  monto,
  AVG(monto) OVER (PARTITION BY region) AS promedio_region
FROM ventas;
```

La cláusula `OVER (PARTITION BY region)` le dice a la base de datos:
"calcula este promedio, pero agrupando (particionando) solo por región,
sin colapsar las filas".

## ROW_NUMBER() y RANK()

Dos funciones muy usadas para numerar u ordenar filas dentro de un grupo:

```sql
SELECT
  id_venta,
  vendedor,
  monto,
  ROW_NUMBER() OVER (PARTITION BY vendedor ORDER BY monto DESC) AS posicion
FROM ventas;
```

Esto asigna un número de fila (1, 2, 3...) a cada venta, reiniciando el conteo
por cada vendedor, ordenado de mayor a menor monto.

`RANK()` es similar, pero si hay empates, deja huecos en la numeración
(por ejemplo, dos primeros lugares empatados seguidos de un tercer lugar).

## Cuándo usarlas

- Rankings dentro de categorías (top N por grupo)
- Cálculos acumulados (running totals) con `SUM() OVER (ORDER BY fecha)`
- Comparar una fila con la fila anterior/siguiente usando `LAG()` y `LEAD()`
- Detectar duplicados conservando una copia con `ROW_NUMBER()`

[Sección de ejemplo — agrega aquí tus propios casos de uso reales, con datos
o escenarios que tú hayas trabajado.]

## Notas finales

Las window functions están disponibles en PostgreSQL, MySQL (8+), SQL Server,
BigQuery y la mayoría de motores modernos. La sintaxis general es la misma;
algunas funciones específicas pueden variar entre motores.
