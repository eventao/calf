/*
* @Author: Marte
* @Date:   2018-09-19 13:07:31
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-19 13:09:21
*/

'use strict';

const express = require('express'),
  app = express(),
  router = express.Router(),
  routerConfig = require('./routeres/router-config');

routerConfig.config(router);

app.use('/', express.static(__dirname));
app.use('/',router);

let port = 8088;
app.listen(port, () => {
  console.log(`server on ${port}`);
});
