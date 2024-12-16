# Memetings

## Frameworks und Hilfsmittel 

- p5.js
    Visualisierung

- ml5.js
    Machine Learning ( High Level Framework, nutzt Tensorflow)

- MobileNet (Model) -> ableger Handtrack.js von Google

- fingerpose.js
    Nutzt Handtrack.js um custom gestures zu erstellen und Fingerpositionen zu tracken

## Wie Starten

-> VSCode
    1. Plugin Live Server installieren
    2. Rechte Mousetaste auf index.html und auf "Mit Liveserver starten / Open with livesereer"
    -> Browser öffnet sich automatisch

-> Alternativ 
    -> Andere Webservber nutzen oder auf folgenden link klicken
        *** https://lakusan.github.io/KI-Projekt/ ***
    -> index.html im Projektverzeichnis öffnen


## Was passiert hier:

Die App soll Handgesten erkennen und anhand dieser Bilder in die Webcam einblenden.

Hierbei wird das bereits trainierte Model MobileNet von Google genutzt.
Durch Feature Extraction werden die Features extrahiert und anhand dieser auf Basis des eingelesenen eigenen Datasets das MobileNetz auf die neuen Bilder trainiert. So kann mann zügig bereits etablierte Modelle auf neue Einsatzgebiete spezialisieren.

## Möglich Anwednungsszenarien

Kontaktlose Steuerung von Apps.
Einheitliche bzw. genormte Eingabebefehle sind in allen z.B. Videokonferenzsystemem möglich.
Gesprächschaos wird verhindert indem auch durch gesten eine Frage / Gesprächsbedarf angezeigt werden kann.
Auto AFK sobal keine Person mehr auf dem Bild erkannt wird.
Durch NodeJS ( Laufzeitumgebung für Javascript) in Verbindung mit Socket.io (Client- Server Kommnikation) und RobotJS (GUI Automatisierung) können Applikationen direkt gesteuert werden (Bsp.: Discord mute / unmute)

## Einstiegspunkte

HTML - Index.html
Javascript - index.js

## Module

index.js - main()

