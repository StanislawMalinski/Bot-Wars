const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

// Ścieżka do pliku gry
const gameFilePath = path.join(__dirname, 'game.txt');

app.get('/game', (req, res) => {
    fs.readFile(gameFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const lines = data.split('\n').map(line => line.trim()).filter(line => line);
        const initialGameState = {
            player1: ['7 of Yellow', '6 of Brown', '2 of Red', '8 of Brown', '3 of Pink', '7 of Brown', '8 of Red', '8 of Green', '4 of Yellow'],
            player2: ['7 of Red', '1 of Yellow', '7 of Pink', '5 of Brown', '1 of Blue', '4 of Green', '5 of Red', '7 of Green', '8 of Pink'],
            table: ['2 of Brown', '6 of Yellow', '6 of White', '7 of White', '8 of White']
        };

        const moves = [];

        lines.forEach(line => {
            if (line === 'fold') {
                moves.push(line);
            } else {
                const [playerMove, tableMove] = line.split(' ').map(Number);
                if (!isNaN(playerMove) && !isNaN(tableMove)) {
                    moves.push(line);
                }
            }
        });

        res.json({ initialGameState, moves });
    });
});

// Serwowanie pliku index.html dla głównej ścieżki
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
