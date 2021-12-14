import q1 from './q1.js';
import q2 from './q2.js';
import q3 from './q3.js';
import q4 from './q4.js';

const $ = document.querySelector.bind(document);
const $app = $('#app');

$app.appendChild(q1());
$app.appendChild(q2());
$app.appendChild(q3());
$app.appendChild(q4());
