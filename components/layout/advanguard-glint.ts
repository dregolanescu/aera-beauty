/**
 * Reflexul de lumină de pe logo-ul Advanguard din footer („Site by Advanguard”).
 *
 * O singură linie continuă și închisă: pornește de pe piciorul stâng al lui „A”, curge pe
 * muchiile de sus ale literelor (stânga → dreapta, inclusiv în V-ul lui „v” și în valea lui
 * „u”), întoarce pe ultimul „d” și revine pe muchiile de jos (dreapta → stânga, pe sub brațul
 * lui „r” și prin interiorul lui „n”) până la START. Traseul a fost desenat de mână, lipit pe
 * muchiile reale ale literelor și netezit (abatere max. 0,04px).
 *
 * Pe traseu alunecă o mini-cometă de lumină, chiar pe muchia reală a literei (ca inelul de
 * lumină de pe butonul de precomandă): subțire peste muchie, alungită pe direcția de mers —
 * cap luminos, corp, coadă lungă care se stinge în alpha. Fiecare pixel al muchiei se aprinde
 * când trece capul pe lângă el și se stinge treptat după aceea (motion blur pe direcția de
 * mers), așa că lumina se curbează odată cu literele și se strânge în cap la aterizare. Între
 * litere traseul trece prin gol, unde masca o ascunde: lumina nu sare, curge mai departe.
 *
 * Se desenează pe un <canvas> (un singur strat, mascat în CSS cu silueta logo-ului), doar cât
 * curge cometa și cât ține blink-ul; în pauza de 10s nu rulează nimic.
 * Logo-ul de bază rămâne plat și neatins (vezi .adv-glint în globals.css).
 */

/** caseta logo-ului, în px CSS */
const BOX = { w: 116, h: 24 }

/** traseul, eșantionat uniform (x,y în px CSS ai casetei), de la START înapoi la START */
const GLINT_POINTS =
  '6.33,11.95 6.46,11.57 6.59,11.19 6.72,10.82 6.86,10.44 7.00,10.07 7.14,9.69 7.29,9.32 7.43,8.94 ' +
  '7.57,8.57 7.72,8.20 7.86,7.82 8.00,7.45 8.15,7.08 8.28,6.70 8.39,6.31 8.52,5.94 8.68,5.57 ' +
  '8.83,5.20 8.96,4.82 9.10,4.44 9.23,4.07 9.36,3.69 9.51,3.32 9.66,2.95 9.92,2.65 10.30,2.56 ' +
  '10.70,2.55 11.10,2.54 11.50,2.53 11.90,2.53 12.30,2.52 12.70,2.52 13.10,2.52 13.50,2.52 ' +
  '13.89,2.58 14.12,2.91 14.28,3.28 14.42,3.65 14.55,4.03 14.68,4.41 14.82,4.78 14.96,5.16 ' +
  '15.09,5.54 15.23,5.91 15.37,6.29 15.51,6.66 15.65,7.04 15.78,7.41 15.92,7.79 16.05,8.17 ' +
  '16.19,8.54 16.37,8.90 16.51,9.27 16.61,9.66 16.74,10.04 16.89,10.41 17.04,10.78 17.19,11.15 ' +
  '17.44,11.42 17.82,11.33 18.21,11.22 18.59,11.12 18.99,11.13 19.39,11.21 19.78,11.29 20.18,11.30 ' +
  '20.50,11.09 20.72,10.75 20.92,10.41 21.13,10.07 21.37,9.75 21.65,9.46 21.94,9.19 22.26,8.95 ' +
  '22.60,8.73 22.95,8.55 23.32,8.39 23.70,8.26 24.09,8.16 24.48,8.12 24.88,8.11 25.28,8.14 ' +
  '25.68,8.19 26.07,8.27 26.45,8.39 26.83,8.53 27.22,8.62 27.53,8.44 27.59,8.04 27.59,7.64 ' +
  '27.58,7.24 27.57,6.84 27.57,6.44 27.60,6.04 27.80,5.74 28.20,5.69 28.60,5.69 29.00,5.70 ' +
  '29.39,5.79 29.59,6.12 29.62,6.52 29.61,6.92 29.62,7.32 29.62,7.72 29.62,8.12 29.62,8.52 ' +
  '29.62,8.92 29.61,9.32 29.61,9.72 29.60,10.12 29.63,10.52 30.01,10.56 30.40,10.49 30.79,10.39 ' +
  '31.17,10.26 31.50,10.04 31.46,9.65 31.29,9.29 31.21,8.90 31.38,8.55 31.66,8.27 32.04,8.15 ' +
  '32.44,8.14 32.84,8.12 33.19,8.29 33.40,8.63 33.56,8.99 33.71,9.36 33.86,9.73 34.01,10.10 ' +
  '34.17,10.47 34.33,10.84 34.49,11.21 34.65,11.57 34.84,11.93 35.17,12.10 35.57,12.10 35.97,12.12 ' +
  '36.37,12.08 36.73,11.91 36.93,11.57 37.11,11.21 37.28,10.85 37.45,10.48 37.61,10.11 37.77,9.75 ' +
  '37.92,9.38 38.05,9.00 38.18,8.62 38.43,8.31 38.80,8.17 39.20,8.12 39.60,8.12 40.00,8.14 ' +
  '40.39,8.19 40.60,8.48 40.48,8.86 40.31,9.23 40.13,9.58 40.01,9.96 40.28,10.23 40.64,10.41 ' +
  '41.01,10.55 41.40,10.58 41.68,10.30 41.94,10.00 42.20,9.69 42.47,9.39 42.76,9.12 43.08,8.88 ' +
  '43.42,8.67 43.78,8.49 44.16,8.36 44.54,8.26 44.94,8.21 45.34,8.18 45.74,8.16 46.14,8.16 ' +
  '46.54,8.18 46.94,8.24 47.31,8.37 47.67,8.54 48.04,8.69 48.38,8.91 48.68,9.17 48.96,9.45 ' +
  '49.23,9.75 49.48,10.07 49.70,10.40 49.94,10.71 50.32,10.81 50.72,10.81 51.12,10.81 51.52,10.75 ' +
  '51.84,10.53 52.11,10.23 52.37,9.93 52.65,9.64 52.92,9.35 53.21,9.07 53.53,8.83 53.87,8.62 ' +
  '54.23,8.45 54.61,8.32 55.00,8.23 55.39,8.17 55.79,8.13 56.19,8.13 56.59,8.15 56.99,8.20 ' +
  '57.38,8.28 57.76,8.41 58.13,8.57 58.48,8.76 58.81,8.98 59.12,9.24 59.40,9.52 59.66,9.83 ' +
  '59.89,10.16 60.09,10.50 60.28,10.85 60.44,11.22 60.65,11.55 61.04,11.58 61.44,11.56 61.83,11.46 ' +
  '62.12,11.19 62.31,10.84 62.49,10.48 62.70,10.14 62.94,9.82 63.21,9.53 63.51,9.26 63.82,9.01 ' +
  '64.16,8.79 64.51,8.60 64.87,8.43 65.25,8.30 65.64,8.21 66.03,8.15 66.43,8.13 66.83,8.14 ' +
  '67.23,8.18 67.62,8.25 68.01,8.36 68.39,8.49 68.75,8.66 69.09,8.86 69.42,9.09 69.72,9.36 ' +
  '70.00,9.65 70.26,9.95 70.49,10.28 70.70,10.62 70.87,10.98 71.16,11.23 71.55,11.19 71.94,11.10 ' +
  '72.30,10.92 72.43,10.55 72.46,10.15 72.46,9.75 72.45,9.35 72.45,8.95 72.46,8.55 72.63,8.20 ' +
  '73.02,8.12 73.42,8.14 73.82,8.15 74.20,8.26 74.34,8.62 74.37,9.02 74.38,9.42 74.38,9.82 ' +
  '74.37,10.22 74.37,10.62 74.36,11.02 74.36,11.42 74.35,11.82 74.36,12.22 74.39,12.62 74.44,13.02 ' +
  '74.52,13.41 74.64,13.79 74.81,14.15 75.04,14.48 75.31,14.77 75.63,15.02 75.97,15.22 76.32,15.41 ' +
  '76.72,15.46 77.12,15.46 77.52,15.43 77.91,15.34 78.28,15.19 78.62,14.98 78.92,14.71 79.18,14.41 ' +
  '79.40,14.08 79.56,13.71 79.65,13.32 79.71,12.93 79.75,12.53 79.77,12.13 79.77,11.73 79.77,11.33 ' +
  '79.77,10.93 79.76,10.53 79.76,10.13 79.75,9.73 79.75,9.33 79.76,8.93 79.79,8.53 79.97,8.20 ' +
  '80.37,8.14 80.77,8.13 81.17,8.14 81.56,8.20 81.75,8.53 81.76,8.93 81.74,9.33 81.76,9.73 ' +
  '82.00,10.02 82.38,10.15 82.77,10.24 83.16,10.31 83.55,10.25 83.84,9.96 84.12,9.68 84.40,9.40 ' +
  '84.69,9.12 85.00,8.87 85.34,8.65 85.69,8.46 86.06,8.32 86.46,8.24 86.85,8.19 87.25,8.16 ' +
  '87.65,8.14 88.05,8.15 88.45,8.18 88.84,8.24 89.22,8.38 89.58,8.54 89.96,8.68 90.29,8.90 ' +
  '90.60,9.16 90.88,9.44 91.14,9.75 91.38,10.06 91.60,10.40 91.80,10.75 91.99,11.09 92.21,11.43 ' +
  '92.61,11.47 93.01,11.45 93.39,11.36 93.71,11.12 93.92,10.78 94.12,10.44 94.34,10.10 94.57,9.77 ' +
  '94.83,9.47 95.13,9.20 95.45,8.96 95.78,8.75 96.14,8.56 96.51,8.41 96.89,8.30 97.29,8.22 ' +
  '97.68,8.17 98.08,8.15 98.48,8.17 98.88,8.20 99.28,8.27 99.65,8.40 100.03,8.52 100.41,8.65 ' +
  '100.75,8.86 101.06,9.12 101.34,9.41 101.59,9.71 101.84,10.03 102.06,10.36 102.27,10.70 ' +
  '102.48,11.04 102.69,11.38 103.04,11.50 103.44,11.50 103.83,11.40 104.10,11.12 104.26,10.75 ' +
  '104.45,10.39 104.67,10.07 104.93,9.76 105.21,9.47 105.51,9.20 105.82,8.95 106.15,8.73 ' +
  '106.51,8.55 106.88,8.40 107.26,8.29 107.65,8.21 108.05,8.16 108.45,8.14 108.85,8.15 109.25,8.18 ' +
  '109.65,8.24 110.03,8.36 110.40,8.51 110.77,8.65 111.12,8.63 111.17,8.24 111.18,7.84 111.18,7.44 ' +
  '111.17,7.04 111.18,6.64 111.20,6.24 111.31,5.86 111.69,5.74 112.09,5.70 112.49,5.69 112.89,5.72 ' +
  '113.18,5.94 113.21,6.34 113.23,6.74 113.24,7.14 113.24,7.54 113.24,7.94 113.23,8.34 113.23,8.74 ' +
  '113.22,9.14 113.22,9.54 113.22,9.94 113.22,10.34 113.22,10.74 113.22,11.14 113.21,11.54 ' +
  '113.21,11.94 113.19,12.34 113.17,12.74 113.14,13.14 113.09,13.53 113.01,13.93 112.91,14.31 ' +
  '112.78,14.69 112.61,15.05 112.41,15.40 112.17,15.72 111.91,16.02 111.62,16.30 111.31,16.56 ' +
  '110.98,16.78 110.64,16.99 110.28,17.16 109.90,17.30 109.52,17.41 109.12,17.47 108.72,17.50 ' +
  '108.32,17.50 107.93,17.46 107.53,17.39 107.14,17.29 106.77,17.16 106.40,17.00 106.06,16.79 ' +
  '105.70,16.61 105.39,16.36 105.12,16.07 104.87,15.76 104.63,15.43 104.42,15.09 104.23,14.74 ' +
  '104.12,14.36 104.03,13.97 103.95,13.57 103.86,13.18 103.64,12.86 103.34,12.60 103.02,12.35 ' +
  '102.68,12.13 102.33,11.96 101.93,11.89 101.53,11.88 101.13,11.87 100.74,11.79 100.41,11.57 ' +
  '100.21,11.23 99.96,10.91 99.65,10.66 99.31,10.45 98.94,10.29 98.56,10.19 98.16,10.14 97.76,10.17 ' +
  '97.37,10.25 97.00,10.41 96.66,10.62 96.36,10.88 96.09,11.17 95.86,11.50 95.65,11.84 95.49,12.21 ' +
  '95.45,12.60 95.43,13.00 95.43,13.40 95.42,13.80 95.42,14.20 95.42,14.60 95.42,15.00 95.42,15.40 ' +
  '95.43,15.80 95.42,16.20 95.38,16.60 95.20,16.96 94.92,17.23 94.56,17.42 94.17,17.48 93.77,17.47 ' +
  '93.42,17.29 93.36,16.90 93.39,16.51 93.27,16.14 92.88,16.07 92.49,16.15 92.27,16.46 92.25,16.86 ' +
  '92.18,17.25 91.86,17.46 91.46,17.50 91.06,17.52 90.66,17.49 90.30,17.34 90.10,17.00 89.72,16.95 ' +
  '89.36,17.11 89.00,17.29 88.62,17.41 88.22,17.46 87.82,17.47 87.42,17.47 87.02,17.44 86.63,17.39 ' +
  '86.24,17.30 85.87,17.15 85.51,16.98 85.16,16.78 84.83,16.55 84.51,16.30 84.22,16.03 83.95,15.74 ' +
  '83.71,15.42 83.51,15.07 83.32,14.72 83.13,14.37 82.86,14.11 82.46,14.10 82.06,14.12 81.69,14.26 ' +
  '81.44,14.56 81.27,14.93 81.09,15.29 80.88,15.62 80.63,15.93 80.34,16.21 80.04,16.47 79.72,16.72 ' +
  '79.38,16.94 79.03,17.12 78.66,17.27 78.27,17.38 77.88,17.45 77.48,17.49 77.08,17.50 76.68,17.49 ' +
  '76.28,17.45 75.89,17.38 75.51,17.27 75.13,17.12 74.78,16.94 74.44,16.73 74.12,16.49 73.82,16.22 ' +
  '73.54,15.94 73.29,15.63 73.06,15.30 72.87,14.94 72.72,14.58 72.56,14.21 72.18,14.14 71.79,14.18 ' +
  '71.41,14.31 71.25,14.66 71.21,15.06 71.20,15.46 71.18,15.85 71.17,16.25 71.15,16.65 71.14,17.05 ' +
  '71.11,17.45 71.03,17.85 70.91,18.23 70.75,18.59 70.56,18.94 70.33,19.27 70.07,19.58 69.79,19.86 ' +
  '69.48,20.12 69.15,20.35 68.81,20.55 68.45,20.72 68.08,20.86 67.69,20.98 67.30,21.06 66.90,21.10 ' +
  '66.50,21.12 66.10,21.09 65.71,21.03 65.32,20.94 64.94,20.82 64.57,20.67 64.21,20.49 63.87,20.28 ' +
  '63.55,20.04 63.25,19.78 62.97,19.49 62.72,19.18 62.51,18.84 62.32,18.48 62.17,18.12 62.12,17.72 ' +
  '62.44,17.52 62.84,17.48 63.13,17.23 63.27,16.86 63.31,16.46 63.16,16.10 62.91,15.79 62.66,15.48 ' +
  '62.46,15.13 62.24,14.80 61.86,14.75 61.47,14.82 61.09,14.94 60.82,15.22 60.76,15.61 60.76,16.01 ' +
  '60.77,16.41 60.77,16.81 60.74,17.21 60.45,17.44 60.06,17.49 59.66,17.49 59.26,17.46 58.87,17.36 ' +
  '58.76,16.99 58.72,16.59 58.71,16.19 58.71,15.79 58.71,15.39 58.71,14.99 58.72,14.59 58.73,14.19 ' +
  '58.73,13.79 58.72,13.39 58.70,12.99 58.66,12.59 58.60,12.19 58.50,11.81 58.33,11.45 58.09,11.13 ' +
  '57.80,10.85 57.48,10.61 57.13,10.42 56.75,10.29 56.36,10.20 55.97,10.17 55.57,10.19 55.18,10.29 ' +
  '54.81,10.44 54.47,10.66 54.18,10.92 53.91,11.22 53.68,11.55 53.55,11.93 53.49,12.32 53.45,12.72 ' +
  '53.44,13.12 53.43,13.52 53.43,13.92 53.43,14.32 53.44,14.72 53.44,15.12 53.44,15.52 53.44,15.92 ' +
  '53.44,16.32 53.43,16.72 53.39,17.12 53.21,17.45 52.82,17.50 52.42,17.50 52.02,17.49 51.63,17.40 ' +
  '51.41,17.09 51.41,16.69 51.11,16.47 50.71,16.49 50.40,16.70 50.32,17.10 50.11,17.41 49.72,17.49 ' +
  '49.32,17.51 48.92,17.51 48.53,17.44 48.29,17.13 47.99,16.92 47.61,17.04 47.25,17.21 46.88,17.37 ' +
  '46.49,17.45 46.09,17.48 45.69,17.48 45.29,17.46 44.89,17.42 44.50,17.34 44.12,17.22 43.76,17.06 ' +
  '43.40,16.87 43.06,16.66 42.74,16.42 42.43,16.17 42.14,15.89 41.88,15.59 41.67,15.25 41.48,14.89 ' +
  '41.32,14.53 41.20,14.15 40.94,13.88 40.55,13.83 40.15,13.81 39.75,13.79 39.35,13.76 38.95,13.74 ' +
  '38.56,13.81 38.25,14.06 38.05,14.40 37.87,14.76 37.71,15.13 37.56,15.50 37.40,15.87 37.25,16.24 ' +
  '37.09,16.60 36.92,16.97 36.71,17.30 36.34,17.45 35.95,17.49 35.55,17.49 35.15,17.44 34.83,17.21 ' +
  '34.64,16.86 34.49,16.48 34.34,16.12 34.18,15.75 34.02,15.38 33.85,15.02 33.68,14.65 33.51,14.29 ' +
  '33.35,13.93 33.19,13.56 33.01,13.21 32.71,12.97 32.31,13.03 31.93,13.12 31.54,13.22 31.15,13.30 ' +
  '30.75,13.37 30.35,13.40 29.96,13.44 29.65,13.67 29.50,14.04 29.34,14.41 29.18,14.78 28.99,15.13 ' +
  '28.79,15.48 28.55,15.80 28.28,16.09 27.99,16.37 27.68,16.62 27.35,16.85 27.00,17.04 26.63,17.18 ' +
  '26.24,17.30 25.85,17.39 25.46,17.45 25.06,17.48 24.66,17.49 24.26,17.46 23.87,17.39 23.48,17.27 ' +
  '23.11,17.13 22.75,16.95 22.41,16.74 22.08,16.51 21.77,16.26 21.48,15.99 21.23,15.68 20.99,15.36 ' +
  '20.62,15.36 20.25,15.53 19.90,15.72 19.56,15.93 19.25,16.18 19.23,16.57 19.36,16.95 19.31,17.33 ' +
  '18.94,17.45 18.54,17.45 18.14,17.46 17.74,17.47 17.34,17.48 16.94,17.48 16.54,17.48 16.14,17.48 ' +
  '15.74,17.49 15.34,17.49 14.94,17.49 14.54,17.49 14.14,17.49 13.74,17.49 13.34,17.49 12.94,17.49 ' +
  '12.54,17.49 12.14,17.49 11.74,17.49 11.34,17.49 10.94,17.49 10.54,17.49 10.14,17.49 9.74,17.48 ' +
  '9.34,17.47 8.94,17.46 8.54,17.46 8.14,17.48 7.78,17.62 7.60,17.98 7.48,18.36 7.31,18.72 ' +
  '7.11,19.07 6.88,19.40 6.64,19.71 6.37,20.01 6.08,20.28 5.77,20.53 5.44,20.76 5.09,20.96 ' +
  '4.72,21.12 4.35,21.25 3.96,21.35 3.56,21.42 3.16,21.44 2.93,21.18 3.01,20.79 3.15,20.42 ' +
  '3.31,20.05 3.45,19.67 3.56,19.29 3.70,18.92 3.85,18.54 3.99,18.17 4.13,17.80 4.27,17.42 ' +
  '4.42,17.05 4.58,16.68 4.71,16.30 4.82,15.92 4.97,15.55 5.15,15.19 5.38,14.88 5.43,14.48 ' +
  '5.43,14.08 5.43,13.68 5.47,13.28 5.61,12.91 5.83,12.57 6.08,12.26 6.33,11.95'

export const GLINT_LENGTH = 354.51

/** poziția turnaround-ului pe traseu (px) */
const GLINT_TURN = 171.21

/** reglaje — timpi în ms, viteză în px/s */
export const GLINT_TIMING = {
  lead: 400, // întârziere după ce logo-ul intră în ecran
  speed: 160, // viteza de croazieră
  ease: 0.06, // accelerare lină pe primele 6% din traseu, aterizare lină pe ultimele 6%
  turnDip: 0.12, // încetinire ușoară când întoarce pe ultimul „d”
  fadeIn: 150, // apariția la START
  fadeOut: 300, // stingerea cometei după aterizare
  // blink-ul final: după aterizare, tot traseul se aprinde o singură dată, apoi pauză
  blinkDelay: 450, // pornește la atâtea ms după ce cometa ajunge la START
  blinkIn: 200, // aprindere
  blinkHold: 120, // ține aprins
  blinkOut: 600, // stingere
  blinkPeak: 0.7, // cât de tare se aprinde traseul (0–1)
  rest: 10000, // pauza statică după blink
}

type Stops = readonly (readonly [number, number])[]
type Rgb = readonly [number, number, number]

/**
 * Forma cometei. `alpha`: opriri [distanța în spatele capului (px, la viteza de croazieră;
 * negativ = puțin în fața lui, ca un motion blur), opacitate] — cap luminos, corp, coadă lungă
 * care se stinge la 0. `width`: grosimea luminii la cap → la capătul cozii; masca păstrează
 * doar jumătatea de pe literă, deci pe muchie lumina are ~1px și se subțiază spre coadă.
 */
export const GLINT_COMET = {
  /** corpul și coada lungă: sand, ca inelul butonului de precomandă */
  glow: { color: [200, 180, 160], alpha: [[-2.5, 0], [0, 0.5], [4, 0.8], [18, 0.7], [50, 0.45], [85, 0.22], [120, 0]], width: [2.1, 0.9] },
  /** capul și corpul luminos: champagne */
  head: { color: [236, 222, 202], alpha: [[-2.5, 0], [0, 0.8], [2, 1], [7, 0.95], [16, 0.5], [30, 0]], width: [1.9, 1.4] },
  /** blink-ul final, pe tot traseul */
  blink: { color: [236, 222, 202], width: 1.3 },
} as const

type Plan = { cycle: number; t0: number; t1: number; end: number; keys: [number, number][] }

const smooth = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x))

/** calendarul: poziția capului pe traseu în timp (o singură curgere continuă) */
export function buildGlintPlan(): Plan {
  const T = GLINT_TIMING
  const P = GLINT_LENGTH
  const uTurn = GLINT_TURN / P
  // pornește cu 40% din viteză, aterizează la START cu 20%, încetinește puțin la turnaround
  const factor = (u: number) =>
    (0.4 + 0.6 * smooth(u / T.ease)) *
    (0.2 + 0.8 * smooth((1 - u) / T.ease)) *
    (1 - T.turnDip * Math.exp(-(((u - uTurn) / 0.05) ** 2)))
  const t0 = T.lead
  const keys: [number, number][] = [[t0, 0]]
  let t = t0
  let s = 0
  let last = t0
  while (s < P - 1e-6) {
    const ds = Math.min(0.5, P - s)
    t += (ds / (T.speed * factor((s + ds / 2) / P))) * 1000
    s += ds
    if (t - last >= 16 || s >= P - 1e-6) {
      keys.push([t, s])
      last = t
    }
  }
  const blinkEnd = T.blinkDelay + T.blinkIn + T.blinkHold + T.blinkOut
  const end = t + Math.max(T.fadeOut, blinkEnd)
  return { cycle: end + T.rest, t0, t1: t, end, keys }
}

/** momentul (ms) în care capul ajunge în poziția s de pe traseu (căutare binară în calendar) */
function timeAt(keys: [number, number][], s: number) {
  const last = keys[keys.length - 1]
  if (s <= 0) return keys[0][0]
  if (s >= last[1]) return last[0]
  let lo = 0
  let hi = keys.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (keys[mid][1] <= s) lo = mid
    else hi = mid
  }
  const [ta, sa] = keys[lo]
  const [tb, sb] = keys[hi]
  return ta + ((tb - ta) * (s - sa)) / (sb - sa)
}

/** opacitatea la distanța x (px) în spatele capului, interpolată între opriri (0 în afara lor) */
function alphaAt(stops: Stops, x: number) {
  if (x <= stops[0][0] || x >= stops[stops.length - 1][0]) return 0
  for (let i = 1; i < stops.length; i++) {
    const [xa, aa] = stops[i - 1]
    const [xb, ab] = stops[i]
    if (x <= xb) return aa + ((ab - aa) * (x - xa)) / (xb - xa)
  }
  return 0
}

/** grosimea luminii la distanța x în spatele capului: de la cap spre coadă se subțiază */
function widthAt(part: { alpha: Stops; width: readonly [number, number] }, x: number) {
  const end = part.alpha[part.alpha.length - 1][0]
  const f = Math.min(1, Math.max(0, x / end))
  return part.width[0] + (part.width[1] - part.width[0]) * f
}

/** cât de vizibilă e cometa: apare la START, se stinge după aterizare */
function cometFade(plan: Plan, t: number) {
  const { fadeIn, fadeOut } = GLINT_TIMING
  if (t <= plan.t0 || t >= plan.t1 + fadeOut) return 0
  return Math.min(1, (t - plan.t0) / fadeIn, 1 - (t - plan.t1) / fadeOut)
}

/** blink-ul final: după aterizare, tot traseul se aprinde o singură dată (un puls fin) */
function blinkAlpha(plan: Plan, t: number) {
  const { blinkDelay, blinkIn, blinkHold, blinkOut, blinkPeak } = GLINT_TIMING
  const x = t - plan.t1 - blinkDelay
  if (x <= 0 || x >= blinkIn + blinkHold + blinkOut) return 0
  if (x < blinkIn) return blinkPeak * (1 - (1 - x / blinkIn) ** 2) // aprindere (ease-out)
  if (x < blinkIn + blinkHold) return blinkPeak
  return blinkPeak * (1 - smooth((x - blinkIn - blinkHold) / blinkOut)) // stingere lină
}

/** primul index din `arr` (crescător) cu valoarea >= v */
function lowerBound(arr: Float64Array, v: number) {
  let lo = 0
  let hi = arr.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (arr[mid] < v) lo = mid + 1
    else hi = mid
  }
  return lo
}

/**
 * Pornește reflexul în containerul randat de <AdvanguardGlint />. Rulează doar când logo-ul
 * e în ecran și deloc la prefers-reduced-motion. Întoarce funcția de cleanup.
 */
export function startGlint(root: HTMLElement): () => void {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  const canvas = root.querySelector('canvas')
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return () => {}

  const { glow, head, blink } = GLINT_COMET
  const plan = buildGlintPlan()
  const pts = GLINT_POINTS.split(/[ ,]/).map(Number)
  const n = pts.length / 2 - 1
  const ds = GLINT_LENGTH / n
  const v = GLINT_TIMING.speed / 1000 // px/ms
  const before = -Math.min(glow.alpha[0][0], head.alpha[0][0]) / v // cât apare lumina în fața capului (ms)
  const after = Math.max(glow.alpha[glow.alpha.length - 1][0], head.alpha[head.alpha.length - 1][0]) / v
  const reach = Math.max(glow.width[0], head.width[0], blink.width) / 2 + 0.6 // px: cât de departe de traseu ajunge lumina

  // „inelul”: pixelii canvas-ului de lângă traseu — distanța până la traseu și momentul în care
  // trece capul pe lângă ei, sortați după acest moment
  let img = ctx.createImageData(1, 1)
  let ringPix = new Uint32Array(0)
  let ringDist = new Float32Array(0)
  let ringTime = new Float64Array(0)
  let px = 1 // pixeli de ecran pe px CSS

  const fit = () => {
    const { width, height } = root.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    const w = Math.max(1, Math.round(width * dpr))
    const h = Math.max(1, Math.round(height * dpr))
    if (w === img.width && h === img.height) return
    canvas.width = w
    canvas.height = h
    img = ctx.createImageData(w, h)
    px = Math.min(w / BOX.w, h / BOX.h)
    const ox = (w - BOX.w * px) / 2
    const oy = (h - BOX.h * px) / 2
    const best = new Float32Array(w * h).fill(reach)
    const pos = new Float32Array(w * h).fill(-1)
    for (let i = 0; i < n; i++) {
      const ax = pts[2 * i]
      const ay = pts[2 * i + 1]
      const dx = pts[2 * i + 2] - ax
      const dy = pts[2 * i + 3] - ay
      const len2 = dx * dx + dy * dy || 1
      const x0 = Math.max(0, Math.floor((Math.min(ax, ax + dx) - reach) * px + ox))
      const x1 = Math.min(w - 1, Math.ceil((Math.max(ax, ax + dx) + reach) * px + ox))
      const y0 = Math.max(0, Math.floor((Math.min(ay, ay + dy) - reach) * px + oy))
      const y1 = Math.min(h - 1, Math.ceil((Math.max(ay, ay + dy) + reach) * px + oy))
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const cx = (x + 0.5 - ox) / px - ax
          const cy = (y + 0.5 - oy) / px - ay
          const u = Math.min(1, Math.max(0, (cx * dx + cy * dy) / len2))
          const d = Math.hypot(cx - u * dx, cy - u * dy)
          const p = y * w + x
          if (d < best[p]) {
            best[p] = d
            pos[p] = (i + u) * ds
          }
        }
      }
    }
    const hits: number[] = []
    for (let p = 0; p < w * h; p++) if (pos[p] >= 0) hits.push(p)
    const when = hits.map((p) => timeAt(plan.keys, pos[p]))
    const order = hits.map((_, i) => i).sort((a, b) => when[a] - when[b])
    ringPix = Uint32Array.from(order, (i) => hits[i])
    ringDist = Float32Array.from(order, (i) => best[hits[i]])
    ringTime = Float64Array.from(order, (i) => when[i])
  }

  const draw = (t: number) => {
    const out = img.data
    out.fill(0)
    const fade = cometFade(plan, t)
    const flash = blinkAlpha(plan, t)
    // acoperirea pe secțiune: plină până la jumătatea grosimii, apoi un pixel de antialiasing
    const cover = (d: number, w: number) => Math.min(1, Math.max(0, (w / 2 - d) * px + 0.5))
    const from = flash > 0 ? 0 : lowerBound(ringTime, t - after)
    const to = flash > 0 ? ringTime.length : lowerBound(ringTime, t + before)
    for (let q = from; q < to; q++) {
      const d = ringDist[q]
      // straturi (de jos în sus): blink, coada sand, capul champagne — compuse ca lumina pe muchie
      let a = 0
      let r = 0
      let g = 0
      let b = 0
      const layer = (col: Rgb, al: number) => {
        if (al <= 0) return
        r = col[0] * al + r * (1 - al)
        g = col[1] * al + g * (1 - al)
        b = col[2] * al + b * (1 - al)
        a = al + a * (1 - al)
      }
      if (flash > 0) layer(blink.color, flash * cover(d, blink.width))
      if (fade > 0) {
        const lag = (t - ringTime[q]) * v
        layer(glow.color, fade * alphaAt(glow.alpha, lag) * cover(d, widthAt(glow, lag)))
        layer(head.color, fade * alphaAt(head.alpha, lag) * cover(d, widthAt(head, lag)))
      }
      if (a > 0.003) {
        const o = ringPix[q] * 4
        out[o] = r / a
        out[o + 1] = g / a
        out[o + 2] = b / a
        out[o + 3] = a * 255
      }
    }
    ctx.putImageData(img, 0, 0)
  }

  // ceasul animației: avansează doar cât logo-ul e în ecran
  let running = false
  let origin = 0
  let paused = 0
  let raf = 0
  let timer = 0
  const stop = () => {
    cancelAnimationFrame(raf)
    clearTimeout(timer)
  }
  const frame = (now: number) => {
    const t = (now - origin) % plan.cycle
    draw(t)
    if (t > plan.end) {
      // pauza: canvas gol, nimic nu rulează până la ciclul următor
      timer = window.setTimeout(() => {
        fit()
        raf = requestAnimationFrame(frame)
      }, plan.cycle - t)
    } else raf = requestAnimationFrame(frame)
  }
  fit()
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        origin = performance.now() - paused
        raf = requestAnimationFrame(frame)
      } else if (!entry.isIntersecting && running) {
        running = false
        stop()
        paused = (performance.now() - origin) % plan.cycle
      }
    },
    { threshold: 0.5 },
  )
  io.observe(root)
  return () => {
    io.disconnect()
    stop()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}
