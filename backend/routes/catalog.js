const router = require("express").Router();
const bookController = require("../controllers/bookContoller");
const authorController = require("../controllers/authorController");
const bookInstanceController = require("../controllers/bookInstanceContoller");
const genreController = require("../controllers/genreContoller");

// home page
router.get("/", bookController.home_page);

//urls for book
router.get("/book/create", bookController.create_book_form);
router.post("/book/create", bookController.create_book_post);

router.get("/book/:id/update", bookController.update_book_form);
router.patch("/book/:id/update", bookController.update_book_post);

router.get("/book/:id/delete", bookController.delete_book_form);
router.post("/book/:id/delete", bookController.delete_book_post);

router.get("/books", bookController.list_of_books);
router.get("/book/:id", bookController.book_details);

//urls for author
router.get("/author/create", authorController.create_author_form);
router.post("/author/create", authorController.create_author_post);

router.get("/author/:id/update", authorController.update_author_form);
router.post("/author/:id/update", authorController.update_author_post);

router.get("/author/:id/delete", authorController.delete_author_form);
router.post("/author/:id/delete", authorController.delete_author_post);

router.get("/authors", authorController.list_of_authors);
router.get("/author/:id", authorController.author_details);

//urls for book instance
router.get(
  "/bookinstance/create",
  bookInstanceController.create_bookInstance_form
);
router.post(
  "/bookinstance/create",
  bookInstanceController.create_bookInstance_post
);

router.get(
  "/bookinstance/:id/update",
  bookInstanceController.update_bookInstance_form
);
router.post(
  "/bookinstance/:id/update",
  bookInstanceController.update_bookInstance_post
);

router.get(
  "/bookinstance/:id/delete",
  bookInstanceController.delete_bookInstance_form
);
router.post(
  "/bookinstance/:id/delete",
  bookInstanceController.delete_bookInstance_post
);

router.get("/bookinstances", bookInstanceController.list_of_bookInstances);
router.get("/bookinstance/:id", bookInstanceController.bookInstance_details);

//urls for genre
router.get("/genre/create", genreController.create_genre_form);
router.post("/genre/create", genreController.create_genre_post);

router.get("/genre/:id/update", genreController.update_genre_form);
router.post("/genre/:id/update", genreController.update_genre_post);

router.get("/genre/:id/delete", genreController.delete_genre_form);
router.post("/genre/:id/delete", genreController.delete_genre_post);

router.get("/genres", genreController.list_of_genres);
router.get("/genre/:id", genreController.genre_details);

module.exports = router;
