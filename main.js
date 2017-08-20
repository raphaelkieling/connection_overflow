const { app,BrowserWindow,ipcMain }  = require('electron');
let http = require('http');

let mainWindow = null;
app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width:300,
        height:300,
        center:true
    })

    mainWindow.loadURL(`${__dirname}/index.html`);
})

let verificaHttpNaUrl = (url)=>{
    let urlDevolvida = '';
    //htpp
    urlDevolvida = url.substring(0,7);
    if(urlDevolvida === "http://")
        return true;

    urlDevolvida = url.substring(0,8);
    if(urlDevolvida === "https://")
        return true;

    return false;
    
}

ipcMain.on('evento-ataque',(event,url,vezes)=>{
    if(!verificaHttpNaUrl(url)){
        mainWindow.send('volta-do-ataque',null);
        return;
    }
    for(var i =0;i<vezes;i++)
    {
        http.get(url,(res)=>{
            console.log(res);
            mainWindow.send('volta-do-ataque',`${res.statusMessage} - ${res.statusCode}`);
        }).on('error',(e)=>{
            mainWindow.send('volta-do-ataque',e.message);
        })
    }
    
})