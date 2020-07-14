import './stats.css';
import { layoutGrid } from './components/layout';
import { mainBlock } from './components/mainBlock';
import { overallStats } from './components/overallStats';
import { statsTable } from './components/statsTable';
import { getStatistics } from '../../services/statsService';
import { getUserID } from '../../services/authService';
import { TabsComponent } from './components/tabs';
import { getUserSettings } from '../../services/settingsService';
import { header } from '../../components/main/header/header';
import { footer } from '../../components/main/footer/footer';
import {checkUserLogin} from "../../services/verifyUserService";
import {
  filterLearningWordsPerDate,
  getLearningWords
} from "../../services/SRgameWordsService";

const body = document.querySelector('body');
const userId = getUserID();

async function renderPage() {
  await checkUserLogin();
  const data = {
    optional: {
      audioCall: {},
      savanna: {},
      speakIt: {},
      SRgame: {},
      memoryGame: {},
    },
    ...await getStatistics({ userId }),
  };
  const settings = await getUserSettings({ userId });
  const learningWords = await getLearningWords();
  const learningWordsPerDate = await filterLearningWordsPerDate();
  const tabsContent = Object.entries(data.optional).map((el) => {
    const fragment = document.createElement('div');
    fragment.className = 'tab-layout';
    fragment.appendChild(mainBlock(el[1],learningWords.length,learningWordsPerDate.length));
    fragment.appendChild(overallStats(el[1], settings));
    fragment.appendChild(statsTable(el[1]));
    return [el[0], fragment];
  });
  body.appendChild(layoutGrid([TabsComponent(tabsContent)]));
  header();
  footer();
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
