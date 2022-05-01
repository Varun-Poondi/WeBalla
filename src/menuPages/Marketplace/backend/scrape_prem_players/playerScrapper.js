const fs = require("fs");
var JSONStream = require('JSONStream');
const { Cluster } = require("puppeteer-cluster");

let teamURLArray = [
    "https://fbref.com/en/squads/b8fd03ef/Manchester-City-Stats",
    "https://fbref.com/en/squads/822bd0ba/Liverpool-Stats",
    "https://fbref.com/en/squads/cff3d9bb/Chelsea-Stats",
    "https://fbref.com/en/squads/361ca564/Tottenham-Hotspur-Stats",
    "https://fbref.com/en/squads/18bb7c10/Arsenal-Stats",
    "https://fbref.com/en/squads/7c21e445/West-Ham-United-Stats",
    "https://fbref.com/en/squads/19538871/Manchester-United-Stats",
    "https://fbref.com/en/squads/8cec06e1/Wolverhampton-Wanderers-Stats",
    "https://fbref.com/en/squads/a2d435b3/Leicester-City-Stats",
    "https://fbref.com/en/squads/47c64c55/Crystal-Palace-Stats",
    "https://fbref.com/en/squads/d07537b9/Brighton-and-Hove-Albion-Stats",
    "https://fbref.com/en/squads/8602292d/Aston-Villa-Stats",
    "https://fbref.com/en/squads/cd051869/Brentford-Stats",
    "https://fbref.com/en/squads/33c895d4/Southampton-Stats",
    "https://fbref.com/en/squads/b2b47a98/Newcastle-United-Stats",
    "https://fbref.com/en/squads/5bfb9659/Leeds-United-Stats",
    "https://fbref.com/en/squads/d3fd31cc/Everton-Stats",
    "https://fbref.com/en/squads/943e8050/Burnley-Stats",
    "https://fbref.com/en/squads/2abfe087/Watford-Stats",
    "https://fbref.com/en/squads/1c781004/Norwich-City-Stats"
];

export default async function playerScraper(){
    console.log("I have entered into the playerScraper function");
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 100,
        monitor: false,
        puppeteerOptions: {
            headless: true,
            defaultViewport: false,
            userDataDir: "./tmp",
        },
    });

    console.log("I have launched my cluster");
    var JSONwriter = JSONStream.stringify();
    var file = fs.createWriteStream('results.json');
    JSONwriter.pipe(file);
  
    cluster.on("taskerror", (err, data) => {
        console.log(`Error crawling ${data}: ${err.message}`);
    });

    await cluster.task(async ({ page, data: url }) => {
        let JSONPlayerObject;
        await page.goto(url);
        let grabPlayers = "Null";
        try{
            grabPlayers = await page.evaluate(() =>{
                let string;
                let playerList = [];
                const teamInfo = document.querySelector("#meta > div:nth-child(2) > h1 > span:nth-child(1)").innerText;
                const teamLeague = document.querySelector("#meta > div:nth-child(2) > h1 > span:nth-child(2)").innerText.replace(/[\])}[{(]/g, '')
                const teamYear = teamInfo.split(' ')[0];
                const teamName = teamInfo.replace(/ \([\s\S]*?\)/g, '').replace(/[0-9]/g, '').replace(" Stats", "").replace("- ", "");
                
                const table = document.querySelector(".stats_table.sortable.min_width.now_sortable")
                const players = table.querySelectorAll("tr");

                players.forEach((player) => {
                    string = player.innerText.toString().split("\t");    
                    JSONPlayerObject = {
                        Name:string[0],
                        Nation: string[1],
                        ClubTeam: teamName,
                        League:teamLeague,
                        Year:teamYear,
                        Pos:string[2],
                        Age:string[3],
                        MatchesPlayed:string[4],
                        Starts:string[5],
                        MinsPlayed:string[6],
                        Gls:string[8],
                        Ast:string[9],
                        PKsMade:string[11],
                        PKsAttempted:string[12],
                        CrdY:string[13],
                        CrdR:string[14],
                        GPlusAPer90:string[17],
                        xGls:string[20],
                        xAst:string[22],
                        xGlsPer90:string[24],
                        xAstPer90:string[25],
                    }                    
                    if(JSONPlayerObject.Name != "Player" && JSONPlayerObject.Name != "" && JSONPlayerObject.Name != "Squad Total" && JSONPlayerObject.Name != "Opponent Total"){
                        //async add to finalArray
                        
                        playerList.push(JSONPlayerObject);
                    }
                })
                return playerList;
            })
        }catch(error){
            console.log(error);
        }
        //TODO: load data into Firebase Database 


        JSONwriter.write(grabPlayers);
    });
    for (const url of teamURLArray) {
        await cluster.queue(url);
    }

    console.log("I am about to close all the cluster");
    await cluster.idle();
    await cluster.close();
    JSONwriter.end();

    console.log("I am about to read JSON File");
    fs.readFile('results.json', (err, data) => {
        if(err) throw err
        let players = JSON.parse(data)
        players = [].concat(...players);
        console.log(players);
        return players
    })
}
(async () => {
  //let b = (await callNews());
  //updateNewsArticles(b);
})()






