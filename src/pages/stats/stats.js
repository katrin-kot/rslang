import './stats.css';
import {layoutGrid} from './components/layout';
import {header} from './components/header';
import {mainBlock} from './components/mainBlock';
import {overallStats} from './components/overallStats';
import {statsTable} from './components/statsTable';
import {getStatistics} from '../../services/statsService';
import {getUserID} from '../../services/authService';
import {TabsComponent} from './components/tabs';

const body = document.querySelector('body');
const userId = getUserID();

async function renderPage() {
  const data = await getStatistics({userId});
  const tabsContent = Object.entries(data.optional).map((el) => {
    const fragment = document.createElement('div');
    fragment.className = 'tab-layout';
    fragment.appendChild(mainBlock(el[1]));
    fragment.appendChild(overallStats(el[1]));
    fragment.appendChild(statsTable(el[1]));
    return [el[0], fragment];
  });
  body.appendChild(layoutGrid([header(), TabsComponent(tabsContent)]));
}

renderPage();


// test1@test.com
// R3Bl8oGsK26h!

/*
{
   "optional":{
      "memoryGame":{
         "07.07.2020, 11:48:36":{
            "level":"0",
            "score":"2-0",
            "scoreGame":"40",
            "errors":"0"
         },
         "07.07.2020, 11:51:49":{
            "level":"0",
            "score":"0-2",
            "scoreGame":"0",
            "errors":"2"
         }
      }
   }
}
* */
