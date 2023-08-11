const bodyParser = require('body-parser');

const { Post } = require('../models/Post');
const { User } = require('../models/User');

module.exports = app => {
    app.get('/post', async (req, res) => {
        const { id, sort } = req.query;

        if (id) {
            try {
                const post = await Post.findById(id).populate('user');
                res.send(post);
                console.log(`GET: retrieve post id ${id}`);
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        }
        else {
            try {
                const posts = await Post.find({});
                let newPosts;

                switch (sort) {

                    case 'new':
                        console.log('GET: new sort');
                        newPosts = posts.sort((p1, p2) => {
                            const d1 = new Date(p1.createdAt);
                            const d2 = new Date(p2.createdAt);
                            if (d1 < d2) return 1;
                            if (d1 > d2) return -1;
                            return 0;
                        });
                        res.send(newPosts);
                        break;

                    case 'old':
                        console.log('GET: old sort');
                        newPosts = posts.sort((p1, p2) => {
                            const d1 = new Date(p1.createdAt);
                            const d2 = new Date(p2.createdAt);
                            if (d1 < d2) return -1;
                            if (d1 > d2) return 1;
                            return 0;
                        });
                        res.send(newPosts);
                        break;

                    default:
                        res.send(posts);
                        break;
                }

                console.log('GET: retrieving posts');
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        }

    });

    app.post('/post', bodyParser.json(), async (req, res) => {
        try {
            const { email, title, body, imgList, tags } = req.body;

            const user = await User.findOne({email});

            const post = new Post({ user, title, body, imgList, tags });

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