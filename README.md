# TLE 2.1 Specialiseren handleiding

Deze installatiehandleiding beschrijft de stappen die nodig zijn om het project op je lokale machine op te zetten en uit te voeren. Het bevat ook een overzicht van de belangrijkste functies en suggesties voor toekomstige verbeteringen.

## Vereisten
Voordat je begint, moet je ervoor zorgen dat de volgende software is geïnstalleerd op je computer
- Node.js en npm

**Check of node en npm de juiste versie hebben:**

```node -v``` versie 20 of 22

```npm -v``` versie 10

Je kan bij de volgende link Node installeren:

[Node.js Download](https://nodejs.org/en/download)  
*(Scroll naar beneden voor een vooraf gecompileerde versie die bij jouw besturingssysteem past.)*

Je moet ook zorgen dat je de volgende ontwikkelings tools heeft:
- Git & GitHub – Version control en  collaboratie
- Tailwind CSS
- Postman – Om API endpoints te testen
- PHP Storm – een programma om de code verder te ontwikkelen

## 1.Installatie stappen
- Open je terminal en voer het volgende commando uit

```
git clone https://github.com/Chrisssss15/TLE-2-Frontend
```

- Navigeer naar de projectmap:
```
cd TLE 2 Specialiseren
```

- Open het project in PHPStorm en installeer npm met de volgende commando:
```
npm install
```
## Project starten
Typ de volgende commando om de project te starten:
```
npm run dev
```

De project moet nu in je browser starten.


# TLE2-SPecialiseren Kenmerken overzicht
## Belangrijkste kenmerken
De belangrijkste functies van onze webapplicatie zijn ontworpen om studenten te helpen die het keuzevak 'Gebarentaal bij intake' volgen. Deze webapplicatie is een hulpmiddel om de studenten te motiveren en te helpen oefenen voor de toets.

- **Woordenboek**:
Een overzicht van alle woorden en letters die in de les wordt behandelt. Studenten kunnen makkelijk woorden opzoeken via de zoekbalk of filteren via de les of thema.
- **Spelling**:
Met behulp van A.I en je ingebouwde camera kan je de letters in gebarentaal uitoefenen met correcte feedback of het goed of fout ging.
- **Flashcard**:
Een oefenmodus om woordenschat te oefenen. Studenten moeten eerlijk toegeven in de applicatie of het goed of fout ging. Foute worden moeten dan opgeslagen in de database om te behouden welke woorden een student moet meer oefenen en in "Moeilijke Woorden" terug komen
- **Docent en Student login**:
Docenten en Studenten kunnen inloggen in de applicatie. Studenten kunnen dan oefenen met de les stof. Doceneten kunnen inloggen en woorden toevoegen, bewerken en verwijderen.

# Suggesties voor verdere ontwikkeling

- **Grammatica**:
Grammatica uitwerken totdat het uit de database de oefeningen haalt per les. De docenten kunnen dit ook bijwerken.
- **Moeilijke Woorden**:
Fouten die vaak worden gemaakt moet bijgehouden worden per student en weergegeven in deze deel van de applicatie
- **Oefen Intake toets**:
een oefenmodus die werkt met wat er wordt gevraagt bij de toets. De docenten kunnen dit ook bijwerken.

