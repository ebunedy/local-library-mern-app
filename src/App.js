import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import HomePageComponent from "./components/HomePageComponent";
import BookListsComponent from "./components/book/BookListsComponent";
import BookDetailsComponent from "./components/book/BookDetailsComponent";
import AuthorListsComponent from "./components/author/AuthorListsComponent";
import AuthorDetailsComponent from "./components/author/AuthorDetailsComponent";
import BookIstanceListsComponent from "./components/bookinstance/BookIstanceListsComponent";
import BookInstanceDetailsComponent from "./components/bookinstance/BookInstanceDetailsComponent";
import GenreListsComponent from "./components/genre/GenreListsComponent";
import GenreDetailsComponent from "./components/genre/GenreDetailsComponent";
import AuthorFormComponent from "./components/author/AuthorFormComponent";
import BookFormComponent from "./components/book/BookFormComponent";
import BookInstanceForm from "./components/bookinstance/BookInstanceForm";
import AddGenre from "./components/genre/AddGenre";

function App() {
  return (
    <div className="content-container">
      <div className="navigation">
        <Navbar />
      </div>
      <div className="main-content">
        <div className="title">
          <h1>welcome to dee library</h1>
        </div>
        <Switch>
          <Route path="/" component={HomePageComponent} exact />
          <Route path="/books" component={BookListsComponent} />
          <Route path="/book/create" component={BookFormComponent} />
          <Route path="/book/update/:id" component={BookFormComponent} />
          <Route path="/book/:id" component={BookDetailsComponent} />
          <Route path="/authors" component={AuthorListsComponent} />
          <Route path="/author/create" component={AuthorFormComponent} />
          <Route path="/author/update/:id" component={AuthorFormComponent} />
          <Route path="/author/:id" component={AuthorDetailsComponent} />
          <Route path="/bookinstances" component={BookIstanceListsComponent} />
          <Route path="/bookinstance/create" component={BookInstanceForm} />
          <Route path="/bookinstance/update/:id" component={BookInstanceForm} />
          <Route
            path="/bookinstance/:id"
            component={BookInstanceDetailsComponent}
          />
          <Route path="/genres" component={GenreListsComponent} />
          <Route path="/genre/create" component={AddGenre} />
          <Route path="/genre/update/:id" component={AddGenre} />
          <Route path="/genre/:id" component={GenreDetailsComponent} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
