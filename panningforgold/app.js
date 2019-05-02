let fs = require('fs');

let htm = 0;
let app = 0;
let ip = 0;
let email = 0;
let query = 0;
let con = 0;
let hide = 0;

function firstFunction(len) {

    for (let index = 1; index <= len; index++) {
        let fileName = '0' + index + '.html';

        readFiles(fileName);
    }

    finalResults();
}

async function readFiles(fileName) {
    let data = await fs.readFileSync(fileName, 'utf8');

    if (!data) throw err;
    else {
        let HTMLcomments = 0;
        let appComments = 0;
        let ipAddresses = 0;
        let emailAddresses = 0;
        let sqlQueries = 0;
        let sqlString = 0;
        let hidden = 0;

        let HTMLregex = /<!--/;
        let appRegex = /\/\/|\/\*/;
        let ipRegex = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        let emailRegex = /\b[\w._%+-]+@[\w.-]+\.[a-z]{2,}\b./i;
        let sqlRegex = /SELECT|INSERT|UPDATE|DELETE/;
        let conString = /\w(?=;){4}/;
        let hiddenType = /type="hidden"/;

        let html = data.split('\r\n');

        html.forEach(function (element) {
            if (HTMLregex.test(element)) {
                HTMLcomments++;
                htm++;
            }
            if (appRegex.test(element)) {
                appComments++;
                app++;
            }
            if (ipRegex.test(element)) {
                ipAddresses++;
                ip++;
            }
            if (emailRegex.test(element)) {
                emailAddresses++;
                email++;
            }
            if (sqlRegex.test(element)) {
                sqlQueries++;
                query++;
            }
            if (conString.test(element)) {
                sqlString++;
                con++;
            }
            if (hiddenType.test(element)) {
                hidden++;
                hide++;
            }
        });

        console.log('\n-----' + fileName + '-----\n');
        console.log('Comentarios HTML: ' + HTMLcomments);
        console.log('Comentarios de la aplicación: ' + appComments);
        console.log('Direcciones IP: ' + ipAddresses);
        console.log('Direcciones de correo electrónico: ' + emailAddresses);
        console.log('Consultas SQL: ' + sqlQueries);
        console.log('Cadenas de conexión a la base de datos: ' + sqlString);
        console.log('Campos ocultos de entrada:' + hidden);

    }
}

function finalResults() {
    console.log('\n----- Resumen -----\n');
    console.log('Comentarios HTML: ' + htm);
    console.log('Comentarios de la aplicación: ' + app);
    console.log('Direcciones IP: ' + ip);
    console.log('Direcciones de correo electrónico: ' + email);
    console.log('Consultas SQL: ' + query);
    console.log('Cadenas de conexión a la base de datos: ' + con);
    console.log('Campos ocultos de entrada:' + hide);
}

firstFunction(6);