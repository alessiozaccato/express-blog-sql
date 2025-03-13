const arrayPosts = require("../data/posts");

function index(req, res) {

    // res.send('Lista delle pizze');

    // res.json(arrayPosts);

    let filteredPosts = arrayPosts;
    // filteredPosts è un array di oggetti. Lo devo ciclare (posso anche fare un map), 
    // per modificare tutti gli elementi in modo che la chiave image sia = baseUrl + image const baseUrl = "http://localhost:3000";

    //to fix the path of the image with server default port
    // const urlBase = "http://localhost:3000"
    // filteredPosts.map((post) => post.image = urlBase + post.image)


    //to chech the 500 internal server error
    // pippo();


    if (req.query.tags) {
        filteredPosts = arrayPosts.filter(
            post => post.tags.includes(req.query.tags)
        );
    }


    res.json(filteredPosts);

}
function show(req, res) {
    // res.send('Dettagli del post ' + req.params.id);

    const id = parseInt(req.params.id)


    const post = arrayPosts.find(post => post.id === id);


    if (!post) {

        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "post non trovato"
        })
    }


    res.json(post);
}

function store(req, res) {
    // res.send('Creazione nuovo post');
    const newId = arrayPosts[arrayPosts.length - 1].id + 1;

    // Creiamo un nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        tags: req.body.tags
    }

    // Aggiungiamo il nuovo post in arrayPosts
    arrayPosts.push(newPost);

    // controlliamo
    console.log(arrayPosts);


    // Restituiamo lo status corretto e il post appena creato
    res.status(201);
    res.json(newPost);
}

function update(req, res) {
    // res.send('Modifica integrale del post ' + req.params.id);
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = arrayPosts.find(post => post.id === id);

    // Piccolo controllo
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    // Aggiorniamo il post
    post.title = req.body.title;
    post.image = req.body.image;
    post.content = req.body.content;
    post.tags = req.body.tags;

    // uso il for in che fa la stessa cosa
    // for (let key in req.body) {
    //     post[key] = req.body[key];
    //     post[key] = req.body[key];
    //     post[key] = req.body[key];
    //     post[key] = req.body[key];
    // }

    // Controlliamo l'arrayPosts
    console.log(arrayPosts)

    // Restituiamo il post appena aggiornato
    res.json(post);
}

function patch(req, res) {
    // res.send('Modifica parziale del post ' + req.params.id);
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = arrayPosts.find(post => post.id === id);

    // Piccolo controllo
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }


    for (let key in req.body) {
        post[key] = req.body[key];
    }


    // Controlliamo il arrayPosts
    console.log(arrayPosts)

    // Restituiamo la pizza appena aggiornata
    res.json(post);

}

function destroy(req, res) {

    // res.send('Eliminazione del post' + req.params.id);


    const id = parseInt(req.params.id)


    const post = arrayPosts.find(post => post.id === id);


    if (!post) {

        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "post non trovato"
        })
    }



    arrayPosts.splice(arrayPosts.indexOf(post), 1);

    res.sendStatus(204);

}

// let's exports everything
module.exports = { index, show, store, update, patch, destroy }

