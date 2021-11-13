const queryValues = getQueryValues();
const text = document.getElementById('site');
text.innerText = text.innerText.replace("this site", queryValues['site']);
