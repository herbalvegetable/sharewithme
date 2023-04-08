const bodyParser = require('body-parser');

const { Post } = require('../models/Post');

module.exports = app => {
    app.get('/post', async (req, res) => {
        const { id } = req.query;

        if (id) {
            try {
                const post = await Post.findById(id);
                res.send(post);
                console.log(`GET: retrieve post id ${id}`);
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        }

        try {
            const posts = await Post.find({});
            res.send(posts);
            console.log('GET: retrieving posts');
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

    app.post('/post', bodyParser.json(), async (req, res) => {
        try {
            const { title, body, imgBase64 } = req.body;

            const post = new Post({ title, body, imgBase64 });

            const result = await post.save();
            res.sendStatus(200);
            console.log(`POST: new post created`);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

    app.put('/post', async (req, res) => { //update

    });

    app.delete('/post', async (req, res) => { //delete

    });
}