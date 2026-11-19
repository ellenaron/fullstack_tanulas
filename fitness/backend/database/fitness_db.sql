
-- ============================================================
-- 2. RÉSZ: „D” CSOPORT ADATBÁZISA (fitness_db)
-- ============================================================

CREATE DATABASE IF NOT EXISTS fitness_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE fitness_db;

DROP TABLE IF EXISTS berletek;
DROP TABLE IF EXISTS tipusok;

-- Törzsadat tábla: Bérlet és belépő típusok
CREATE TABLE tipusok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(50) NOT NULL UNIQUE
);

-- Kapcsolódó tábla: Bérletek és belépők
CREATE TABLE berletek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipus_id INT NOT NULL,
    megnevezes VARCHAR(100) NOT NULL,
    ar INT NOT NULL,
    ervenyesseg_nap INT NOT NULL,
    elerheto TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (tipus_id) REFERENCES tipusok(id)
);

-- Mintaadatok feltöltése: tipusok (3 kategória)
INSERT INTO tipusok (id, nev) VALUES
(1, 'Fitnesz és Kondi'),
(2, 'Csoportos Óra'),
(3, 'Kombinált és All-In');

-- Mintaadatok feltöltése: berletek (10 tétel)
INSERT INTO berletek (id, tipus_id, megnevezes, ar, ervenyesseg_nap, elerheto) VALUES
(1, 1, 'Napijegy konditerem használatra', 2490, 1, 1),
(2, 1, 'Havi korlátlan kondibérlet', 16500, 30, 1),
(3, 1, 'Éves hűségidős kondibérlet', 149000, 365, 0),
(4, 2, 'Csoportos óra napijegy (spinning/aerobik)', 2800, 1, 1),
(5, 2, '10 alkalmas csoportos bérlet', 22000, 60, 1),
(6, 2, 'Diák csoportos havi bérlet', 14500, 30, 0),
(7, 3, 'VIP All-In havi prémium bérlet', 28500, 30, 1),
(8, 3, 'Hétvégi wellness és fitnesz napijegy', 4900, 2, 1),
(9, 3, 'Kombinált 3 havi negyedéves bérlet', 69900, 90, 1),
(10, 1, '10 alkalmas konditerem bérlet', 18900, 45, 0);
