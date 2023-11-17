const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const uuidV4 = require('uuid').v4;
const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

server.post('/login', (req, res) => {
    try {
        const {username, password} = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        console.log('db: ', db);
        const {users = []} = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({message: 'User not found'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

server.post('/comments', (req, res, next) => {
    const comment = req.body;
    comment.id = uuidV4();
    router.db.get('comments').push(comment).write();
    const users = router.db.get('users').value();
    const user = users.find(u => u.id === comment.userId);

    if (user) {
        comment.user = user;
        res.jsonp(comment);
    } else {
        res.status(400).jsonp({error: 'User not found'});
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({message: 'AUTH ERROR'});
    }

    next();
});

server.use(router);

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
