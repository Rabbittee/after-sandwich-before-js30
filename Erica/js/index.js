import { getCurrentData } from './api.js';
import toggleTabs from './tabs.js';
import q1 from './q1.js';
import q2 from './q2.js';




/** Set up scripts */
async function setup() {
    toggleTabs()
    q1(await getCurrentData('O-A0001-001'))
    q2(await getCurrentData('O-A0001-001'))
}

setup();


