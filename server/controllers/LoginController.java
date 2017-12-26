package controllers;

import play.api.db.Database;
import play.mvc.Controller;
import play.mvc.Result;

import views.html.login;

import javax.inject.Inject;

public class LoginController extends Controller {
    @Inject
    Database db;

    public Result notLoggedIn() {
        return ok(login.render("Not logged in."));
    }

    public Result login() {
        return ok(login.render("logged in."));
    }
}
