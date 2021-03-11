const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        Movies.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        Movies.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    new: (req, res) => {
        Movies.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    recomended: (req, res) => {
        Movies.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, 
    add: function (req, res) {
       return res.render("moviesAdd")
    },
    create: async function (req, res) {
       await Movies.create(req.body);

       res.redirect("/movies")
    },
    edit: async function(req, res) {
       let Movie = await Movies.findByPk(req.params.id);

       let pelicula = {
           Movie
       }

         res.render("moviesEdit", pelicula)

    },
    update: async function (req,res) {
        let Movie = await Movies.findByPk(req.params.id);

        await Movies.update(req.body, {where : { id : Movie.id}});

        res.redirect("/movies")

    },
    delete: async function (req, res) {
        let Movie = await Movies.findByPk(req.params.id);
        let pelicula = {
            Movie
        }
 
          res.render("moviesDelete", pelicula)

    },
    destroy: async function (req, res) {
        let Movie = await db.Movie.findByPk(req.params.id);

        await db.Movie.destroy({where : { id : Movie.id}});

        res.redirect("/movies")
    }

}

module.exports = moviesController;