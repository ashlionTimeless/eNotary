import _ from "lodash";
import * as jsPdf from 'jspdf';

console.log("Server is Started");

const ClientApplication = require('./ClientApplication');
let application = new ClientApplication();
application.init();

window.application = application;
