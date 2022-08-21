// Progetto campominato
// Ultima modifica 20/08/2022

function createGride(nx, ny) {
    grid = [];
    for (let y = 0; y < ny; y++) {
        grid.push([]);
        for (let x = 0; x < nx; x++) {
            grid[y].push({
                x: x,
                y: y,
                color: -1,
                bomb: 0,
                near: 0,
            });
        }
    }
    assegnaMine(nMine, nx, ny);
    return grid;
}

function assegnaMine(n, nx, ny) {
    let x = Math.floor(Math.random() * (nx - 1));
    let y = Math.floor(Math.random() * (ny - 1));

    for (let i = 0; i < n; i++) {
        while (grid[y][x].bomb == 1) {
            x = Math.floor(Math.random() * (nx - 1));
            y = Math.floor(Math.random() * (ny - 1));
        }
        grid[y][x].bomb = 1;
    }
}

function drawNumber(grid, x, y) {
    const text = grid[y][x].near;
    ctx.textAlign = "center";
    ctx.font = 0.8 * lc + "px arial";
    ctx.fillStyle = "black";
    ctx.fillText(text, x * lc + lc / 2, y * lc + lc * 0.8);
}

// Questa funzione viene eseguita se la cella cliccata
// non ha bombe e non è già rivelata
function rivela(x, y, grid) {
    grid[y][x].color = 0;
    grid[y][x].near = contaMineIntorno(x, y, grid);
    for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
            let cy = y + j;
            let cx = x + i;
            if ((cy >= 0) & (cy < ny) & (cx >= 0) & (cx < nx)) {
                if ( grid[cy][cx].bomb === 0 & grid[cy][cx].color === -1) {
                    if (grid[y][x].near === 0) {
                        grid[cy][cx].color = 0;
                        grid[cy][cx].near = contaMineIntorno(cx, cy, grid);
                        if ( contaMineIntorno(cx, cy, grid) === 0) {
                            // se la cella cliccata non è vicina ad una bomba
                            // viene rilanciata la funzione rivela
                            rivela(cx, cy, grid);
                        }
                    }
                }
            }
        }
    }
}

function contaMineIntorno(x, y, grid) {
    let n = 0;
    for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
            let cy = y + j;
            let cx = x + i;
            if ((cy >= 0) & (cy < ny) & (cx >= 0) & (cx < nx)) {
                if (grid[cy][cx].bomb === 1) {
                    n += 1; 
                }
            }
        }
    }
    return n;
}

/**
 * Controllo se hai vinto, per farlo verifico se il numero di celle
 * ancora coperte è uguale alla quantità di bombe in quel caso hai vinto
 */
function controlloSeHaiVinto() {
    console.log('controllo se hai vinto');
    let n = 0;
    for(let y = 0; y < ny; y++) {
        for(let x = 0; x < nx; x++) {
            if(grid[y][x].color === -1 || grid[y][x].color === 1) {
                n += 1;
            }
        }
    }
    if( n === nMine) {
        console.log('Hai vinto');
    } else {
        console.log('Non hai ancora vinto');
    }
}

function marcaBandiera(x, y, grid) {
    if (grid[y][x].color === -1) {
        grid[y][x].color = 1;
    } else if (grid[y][x].color === 1) {
        grid[y][x].color = -1;
    }
}
