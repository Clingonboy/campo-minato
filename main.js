// Progetto campominato
// Ultima modifica 20/08/2022

console.log('Pagina Caricata');
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const nx = 10;
const ny = 5;
const lc = 35;
let grid = [];
const nMine = 5;
let stato = 'gioco';
const posizioneBombe = [];
const quadratini = [];
const nq = 5;
const l = lc / nq;

function init() {
    canvas.width = nx * lc;
    canvas.height = ny * lc;
    drawGrid();
    grid = createGride(nx, ny);
    const rect = canvas.getBoundingClientRect();

    canvas.addEventListener('click', e => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        clickCell(x,y);
    });
    canvas.addEventListener('contextmenu', e => {
        e.preventDefault();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        rightClickCell(x,y);   
    });
}

/**
 * Funzione che agisce sulla griglia va a verificare se la cella 
 * cliccata è libera o a mine ed esegue la funzione rivela()
 */
function clickCell (x, y) {
    const xCell = Math.floor( x / lc);
    const yCell = Math.floor( y / lc);
    // log solo per controllo e debug
    console.log('x: ', xCell, ' y: ', yCell);
    // Controllo che la cella cliccata sia senza bomba e non scoperta
    if (grid[yCell][xCell].bomb === 0 & grid[yCell][xCell].color === -1) {
        rivela(xCell, yCell, grid);
        controlloSeHaiVinto();// controllo se hai vinto
    } else if (grid[yCell][xCell].bomb === 1){
        // Se clicca sulla cella con boma perde la partita
        haiPerso(grid);
    }
}

function rightClickCell(x, y) {
    const xCell = Math.floor( x / lc);
    const yCell = Math.floor( y / lc);
    // log solo per controllo e debug
    console.log('rx: ', xCell, ' ry: ', yCell);
    if (grid[yCell][xCell].color === -1) {
        marcaBandiera(xCell, yCell, grid);
        controlloSeHaiVinto();
    } else if (grid[yCell][xCell].color === 1) {
        marcaBandiera(xCell, yCell, grid);
        // Se la cella è già marcata con bandiera rilanciamo lo stesso la
        // funzione marcaBandiera perchè la funzione se riceve una cella
        // gia marcata la dismarca.
    }
}

function drawCell() {
    for (let y=0; y<ny; y++) {
        for (let x=0; x<nx; x++) {
            if (grid[y][x].color === 0) {
                ctx.fillStyle = 'white';
                ctx.fillRect(x * lc, y * lc, lc, lc);
            }
            if (grid[y][x].color === -1) {
                ctx.fillStyle = 'green';
                ctx.fillRect(x * lc, y * lc, lc, lc);
            }
            // mostra le bombe, usato solo per debug
            //if (grid[y][x].bomb === 1) {
            //    ctx.fillStyle = 'pink';
            //    ctx.fillRect(x * lc, y * lc, lc, lc);
            //}
            // disegna in colore diverso le celle marcare color === 1
            if (grid[y][x].color === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * lc, y * lc, lc, lc);
            }
            if (grid[y][x].near > 0) {
                drawNumber(grid, x, y);
            }
        }
    }
}

function drawGrid() {
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    for (let x=0; x<nx; x++) {
        ctx.moveTo(x * lc, 0);
        ctx.lineTo(x * lc, ny * lc);
    }
    for (let y=0; y<ny; y++) {
        ctx.moveTo(0, y * lc);
        ctx.lineTo(nx * lc, y * lc);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    
}

init();

function gameLoop() {
    if (stato === 'gioco') {
        drawCell();
        drawGrid();
    }
    if (stato === 'perso') {
        drawQuadratini();
    }
    requestAnimationFrame(gameLoop);
}
gameLoop();

