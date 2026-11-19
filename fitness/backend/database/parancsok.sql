-- GET /berletek
SELECT b.*, t.nev AS tipus FROM berletek b INNER JOIN tipusok t ON b.tipus_id = t.id ORDER BY b.ar ASC;

-- GET /berletek/elerheto
SELECT * FROM berletek WHERE elerheto = 1 AND ervenyesseg_nap <= 30;

-- GET /berletek/kereses/:szoveg
SELECT * FROM berletek WHERE megnevezes LIKE "%?%";

-- GET /tipusok/statisztika
SELECT t.nev AS tipus_nev, COUNT(b.id) AS berletek_szama, ROUND(AVG(b.ar), 1) AS atlagos_ar FROM tipusok t INNER JOIN berletek b ON t.id = b.tipus_id GROUP BY t.nev;

-- GET /berletek/dragak
SELECT megnevezes, ar, ervenyesseg_nap FROM berletek WHERE ar > 20000 ORDER BY ervenyesseg_nap DESC;