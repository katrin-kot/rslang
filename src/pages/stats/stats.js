import './stats.css';
import { layoutGrid } from './components/layout';
import { header } from './components/header';
import { mainBlock } from './components/mainBlock';
import { overallStats } from './components/overallStats';
import { statsTable } from './components/statsTable';
import { getStatistics } from '../../services/statsService'
import { getUserID } from '../../services/authService'

const body = document.querySelector('body');
const userId = getUserID()
async function renderPage() {
    const data = await getStatistics({userId});
    data.optional.stats = JSON.parse(data.optional.stats);
    console.log('data: ',data);
    body.appendChild(layoutGrid([header(), mainBlock(data), overallStats(data), statsTable(data)]));
}

renderPage();


// test1@test.com
// R3Bl8oGsK26h!

/*
{
   "id":"5efd033252f52eee34873e46",
   "learnedWords":389,
   "optional":{
      "stats":[
         {
            "date":"30.06.2020",
            "score":[
               "70%",
               "100%",
               "50%",
               "100%",
               "10%",
               "100%"
            ],
            "learnedWords":60
         },
         {
            "date":"01.07.2020",
            "score":[
               "30%",
               "10%",
               "93%",
               "15%",
               "40%",
               "50%"
            ],
            "learnedWords":36
         },
         {
            "date":"02.07.2020",
            "score":[
               "70%",
               "17%",
               "53%",
               "75%",
               "45%",
               "57%"
            ],
            "learnedWords":76
         },
         {
            "date":"03.07.2020",
            "score":[
               "36%",
               "16%",
               "91%",
               "33%",
               "47%",
               "92%"
            ],
            "learnedWords":43
         },
         {
            "date":"04.07.2020",
            "score":[
               "34%",
               "36%",
               "57%",
               "84%",
               "46%",
               "75%"
            ],
            "learnedWords":57
         },
         {
            "date":"05.07.2020",
            "score":[
               "54%",
               "34%",
               "23%",
               "67%",
               "63%",
               "75%"
            ],
            "learnedWords":75
         },
         {
            "date":"06.07.2020",
            "score":[
               "35%",
               "76%",
               "86%",
               "83%",
               "43%",
               "65%"
            ],
            "learnedWords":42
         }
      ]
   }
}
* */
