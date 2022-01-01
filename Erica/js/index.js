import { getCurrentData } from './api.js';
import toggleTabs from './tabs.js';
import q1 from './q1.js';
import q2 from './q2.js';
import q3 from './q3.js';
// import q4 from './q4.js';




/** Set up scripts */
async function setup() {
    toggleTabs()
    q1(await getCurrentData('O-A0001-001', {elementName: 'TEMP'}))
    q2(await getCurrentData('O-A0001-001', {elementName: 'TEMP,ELEV'}))
    q3(await getCurrentData('O-A0002-001', {elementName: 'HOUR_24'}))
    // q4(await getCurrentData('F-D0047-089', {locationName: '新竹縣'}))
}

setup();


