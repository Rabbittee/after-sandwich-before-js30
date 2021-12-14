import '../css/style.css';
import q1 from './q1';
import q2 from './q2';
import q3 from './q3';
import q4 from './q4';

const $ = document.querySelector.bind(document);
const $app = $('#app');

$app.appendChild(q1());
$app.appendChild(q2());
$app.appendChild(q3());
$app.appendChild(q4());
