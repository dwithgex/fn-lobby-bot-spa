const express = require('express');
const app = express();
const port = 2923;
app.get('/', (req, res) => res.send('COPIA EL LINK DE ARRIBA Y PEGALO EN https://withgex.wixsite.com/monitor'));

app.listen(port, () => console.log(`FN-LobbyBot is listening to http://localhost:${port}`));