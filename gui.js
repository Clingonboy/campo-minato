
function haiPerso(grid) {
    console.log("hai perso");
    for (let y = 0; y < ny; y++){
        for (let x = 0; x < nx; x++) {
            if (grid[y][x].bomb === 1) {
                posizioneBombe.push({x: x, y: y});
            }
        }
    }
    for (let n = 0; n < nMine; n++) {
        quadratini.push([]);
        for (let x = 0; x < nq; x++) {
            for (let y = 0; y < nq; y++) {
                const xPos = posizioneBombe[n].x * lc + x * l;
                const yPos = posizioneBombe[n].y * lc + y * l;
                quadratini[n].push({x: xPos, y: yPos});
            }
        }
    }
    stato = 'perso';
    esplosione();
    myInterval = setInterval(espandi, 30);
}

// funzione usata in main.js all'interno di requestAnimationFrame
// quindi continua a disegnarli.
function drawQuadratini() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    quadratini.forEach( cella => {
        cella.forEach( q => drawq(q.x, q.y));
    });
}

function drawq (x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, l, l);
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.rect(x, y, l, l);
    ctx.stroke();
}

function esplosione() {
    const centriCelle = []; // array dei centri delle celle
    // cc viene popolato
    for (let n = 0; n < nMine; n++) {
        const px = posizioneBombe[n].x * lc + (lc / 2);
        const py = posizioneBombe[n].y * lc + (lc / 2);
        centriCelle.push({x: px, y: py});
    }
    // Per ogni quadratino per ogni cella viene calcolato un parametro
    // dx e dy per definire la direzione dell'esplosione per ogni quadratino
    // ogni quadratino diventerà un oggetto con {x: y: dx: dy:}
    // per calcolare dx e dy usiamo come parametro la larghezza del quadratino
    for (let n = 0; n < nMine; n++) {
        const centroCella = centriCelle[n]; 
        const cella = quadratini[n];
        cella.forEach(q => {
            q.dx = (q.x - centroCella.x) * 0.2;
            q.dy = (q.y - centroCella.y) * 0.2;
        });
    }
}

function espandi() {
    quadratini.forEach(cella => {
        cella.forEach(q => {
            q.x = q.x + q.dx;
            q.y = q.y + q.dy;
        });
    });
}
