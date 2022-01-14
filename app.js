const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { fetchOpenPrs, fetchNumberOfCommits } = require('./controllers/github-controller');

const path = require('path');
const PORT = 8080;
const ejsTitle = 'Grant\'s Github Repo Fetcher'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {
        title: ejsTitle,
        openPrs: []
    });
});

app.get('/repo-open-prs', (req, res) => {
    res.render('home', {
        title: ejsTitle,
        openPrs: []
    });
});

app.post('/repo-open-prs', async (req, res, next) => {
    const { repo } = req.body;
    let openPrsWithCommitCount = [];

    await fetchOpenPrs(repo).then(response => {
        return response;
    }).then(repoInfo => {
        if (repoInfo) {
            return repoInfo.data.map(openPR => {
                const { user, url } = openPR;
                return fetchNumberOfCommits(user, url).then(commitRes => {
                    openPrsWithCommitCount.push(commitRes);
                });
            });
        }
    }).catch(err => {
        console.error('Error fetching open prs and commits', err);
    });

    setTimeout(() => {
        res.render('home', {
            title: ejsTitle,
            openPrs: openPrsWithCommitCount
        });
    }, 1500);
});


app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));