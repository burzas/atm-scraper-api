const express = require('express')
const app = express()
const Nightmare = require('nightmare');

getATM = (address, res) => {
    const nightmare = Nightmare({
        show: false
    });
    try {
        nightmare
            .goto('https://fiokesatmkereso.mnb.hu/web/index.html')
            .click('#filter-clear')
            .type('#hely-suggestion', address)
            .click('#filter-search')
            .wait('#result-list .list-item', 5000)
            .evaluate(() => {
                if (!document.querySelectorAll('#result-list .list-item')) return [];
                return Array.from(document.querySelectorAll('#result-list .list-item')).map(element => {
                    return {
                        'bank': element.querySelector('.list-item-data-title span').innerText,
                        'address': element.querySelectorAll('.list-item-data-details')[0].innerText,
                        'opening_hours': element.querySelectorAll('.list-item-data-details')[1].innerText
                    }
                });
            })
            .end()
            .then((result) => {
                res.send(result);
            })
            .catch(error => {
                console.error('Search failed:', error)
            });
    } catch (error) {
        return [];
    }

};


app.get('/atms', function (req, res) {
    getATM(req.query.address, res);
});

app.listen(process.env.PORT);