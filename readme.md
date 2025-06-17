# Swing notes API
Ett API för att spara anteckningar.

Uppgift:
https://github.com/FJSX24/FJSX24-Backendutveckling-Vecka23

## Installation
1. Klona repo
2. npm install
3. .env
```
PORT=3000
JWT_SECRET=secret
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=password123
PGDATABASE=swing-notes
PGPORT=5432
```
4. skapa databas
   
   se setup/db.sql

4. npm run dev

## Kända brister

1. Saknas en hel del felhantering och try-catch runt databasförfrågningarna.
2. createdAt och modifitedAt är endast datum utan klockslag eller tidszon eftersom kolumnerna i databasen är typen date istället för timestamp eller timestampz.
