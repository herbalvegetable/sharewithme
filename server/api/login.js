const { User } = require('../models/User');

module.exports = app => {
    app.get('/login', async (req, res) => {

        const { user: userId, email } = req.query;

        try {
            let user;
            if (userId) {
                user = await User.findById(userId);
            }
            else if (email) {
                user = await User.findOne({ email });
            }

            if (user) {
                res.send(user);
            }
            else {
                res.send({});
            }
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

    app.post('/login', async (req, res) => {
        const { id, name, email, image } = req.body;

        console.log('POST LOGIN', req.body);

        if (!email) return;

        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            try {
                console.log(`add user ${name} ${email}`);

                const newUser = new User({
                    username: name,
                    email,
                    img: image,
                });

                const result = await newUser.save();
                console.log(`POST: new user created`);
                res.sendStatus(200);
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        }
    });

    app.put('/login', async (req, res) => { //update

    });

    app.delete('/login', async (req, res) => { //delete

    });
}