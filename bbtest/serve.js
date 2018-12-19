/*
* @Author: Marte
* @Date:   2018-09-19 13:07:31
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-19 13:09:21
*/

'use strict';

let express = require('express');
let app = express();

app.use('/',express.static(__dirname));

let port = 8088;
app.listen(port,() => {
    console.log(`server on ${port}`);
});
