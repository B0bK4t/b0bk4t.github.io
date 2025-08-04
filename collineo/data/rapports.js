let problemes_raw = `Rapport;Parc;Date;Turbine;Side;Probleme;Gravite
2025-07-31_GMO2025 Rapport Inspection pales 250731;GMO;2025-07-31;504;2-03109-Downwind;Chordwise crack gravite 3 multiple sur reparation @ 10.3 m;3
2025-07-31_GMO2025 Rapport Inspection pales 250731;GMO;2025-07-31;504;3-03116-Upwind;Chordwise crack gravite 3 multiple sur reparation @ 11.2 m;3
2025-08-01_GMO2025 Rapport Inspection pales 250801;GMO;2025-08-01;502;1-03100-Upwind;Chordwise crack gravite 3 multiple sur reparation @ 11.1 m;3
2025-08-01_GMO2025 Rapport Inspection pales 250801;GMO;2025-08-01;502;3-03102-Downwind;Chordwise carck gravite 2 multiple + Dry @ 19.5 m;2
2025-08-01_GMO2025 Rapport Inspection pales 250801;GMO;2025-08-01;502;3-03102-Leading Edge;Erosion @ 37.2 m;-1
2025-08-01_GMO2025 Rapport Inspection pales 250801;GMO;2025-08-01;502;3-03102-Upwind;Chordwise crack gravite 3 multiple sur reparation @ 9.6 m;3
2025-08-01_GMO2025 Rapport Inspection pales 250801;GMO;2025-08-01;507;2-03231-Upwind;Chordwise crack gravite 3 multiple sur reparation @ 11.1 m;3
2025-08-01_GMO2025 Rapport Inspection pales 250801;GMO;2025-08-01;507;3-03203-Upwind;BRIS MAJEUR chordwise crack gravite 4 multiple @ 11.0 m;4
2025-08-01_GMO2025 Rapport Inspection pales 250801;GMO;2025-08-01;518;1-05407-Leading Edge;Erosion @ 37.1 m;-1
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;GMO;2025-08-01;518;2-05403-Leading Edge;Erosion @ 34.6 à 37.1 m;-1
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;GMO;2025-08-01;543;1-05434-Downwind;Spanwise + Chordwise crack gravite 3 multiple sur reparation @ 10.1 m;3
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;GMO;2025-08-01;543;1-05434-Downwind;BRIS MAJEUR Chordwise crack gravite 4 multiple sur reparation @ 10.1 m;4
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;GMO;2025-08-01;543;3-05435-Upwind;BRIS MAJEUR Chordwise crack gravite 4 multiple sur reparation @ 10.2 m;4
`

let photos_raw = `Rapport;Date;Photo;Parc;Turbine;Blade;Side
2025-07-31_GMO2025 Rapport Inspection pales 250731;2025-07-31;WTG_GMO-504-2-03109-Downwind_2025-07-29-122318_HDR.jpg;GMO;504;2;-03109-Downwind
2025-07-31_GMO2025 Rapport Inspection pales 250731;2025-07-31;WTG_GMO-504-3-03116-Upwind_2025-07-29-105806_HDR.jpg;GMO;504;3;-03116-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-502-1-03100-Upwind_2025-07-30-122808_HDR.jpg;GMO;502;1;-03100-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-502-3-03102-Downwind_2025-07-30-120050.jpg;GMO;502;3;-03102-Downwind
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-502-3-03102-Leading Edge_2025-07-30-121209.jpg;GMO;502;3;-03102-Leading Edge
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-502-3-03102-Upwind_2025-07-30-130919.jpg;GMO;502;3;-03102-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-507-2-03231-Upwind_2025-07-31-102153.jpg;GMO;507;2;-03231-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-507-2-03231-Upwind_2025-07-31-102201_HDR.jpg;GMO;507;2;-03231-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-507-3-03203-Upwind_2025-07-31-094540_tc(1).jpg;GMO;507;3;-03203-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801;2025-08-01;WTG_GMO-518-1-05407-Leading Edge_2025-07-30-110925.jpg;GMO;518;1;-05407-Leading Edge
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-518-2-05403-Leading Edge_2025-07-30-104838_HDR.jpg;GMO;518;2;-05403-Leading Edge
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-518-2-05403-Leading Edge_2025-07-30-104850_HDR.jpg;GMO;518;2;-05403-Leading Edge
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-518-2-05403-Leading Edge_2025-07-30-104932_HDR.jpg;GMO;518;2;-05403-Leading Edge
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-543-1-05434-Downwind_2025-07-31-074846.jpg;GMO;543;1;-05434-Downwind
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-543-1-05434-Upwind_2025-07-31-064701.jpg;GMO;543;1;-05434-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-543-1-05434-Upwind_2025-07-31-064847.jpg;GMO;543;1;-05434-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-543-1-05434-Upwind_2025-07-31-064709.jpg;GMO;543;1;-05434-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-543-1-05434-Upwind_2025-07-31-064756.jpg;GMO;543;1;-05434-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-543-3-05435-Upwind_2025-07-31-075825.jpg;GMO;543;3;-05435-Upwind
2025-08-01_GMO2025 Rapport Inspection pales 250801 - INFO COMPLEMENTAIRES;2025-08-01;WTG_GMO-543-3-05435-Upwind_2025-07-31-075839.jpg;GMO;543;3;-05435-Upwind
`