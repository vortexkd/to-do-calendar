package controllers;

import models.DatabaseGetter;
import models.Exporter;
import models.Goal;
import play.api.db.Database;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.mvc.Controller;
import play.mvc.Result;
import services.Wrapper;

import javax.inject.Inject;

public class GoalController extends Controller {
    private static final String DEL = "del";

    @Inject
    Database db;

    @Inject
    FormFactory formFactory;

    public Result createGoal() {
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        String goals = Exporter.listToJSON(dbGetter.getGoals(1)); // TODO: generalise user
        return ok(Wrapper.wrapResponse(goals));
    }
    //POST request to createGoal with relevant information will create a goal and return list of all goals? or just the new one.
    public Result addGoal() {
        DynamicForm form = formFactory.form().bindFromRequest();
        Goal goal = new Goal(form.get("title"), form.get("description"), form.get("date"));
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        dbGetter.setGoal(1, goal); // TODO: generalise user.
        return createGoal();
    }
    public Result editGoal() {
        System.out.println("editting goal");
        DynamicForm form = formFactory.form().bindFromRequest();
        if(form.get("user_id") == null || form.get("goal_id")==null){
            return ok(Wrapper.errorResponse("No user or goal."));
        }
        int userId = form.get("user_id").matches("^\\d+$") ? Integer.parseInt(form.get("user_id")) : 0;
        int goalId = form.get("goal_id").matches("^\\d+$") ? Integer.parseInt(form.get("goal_id")) : 0;
        if (DEL.equals(form.get("del"))) {
            return deleteGoal(userId, goalId);
        }
        Goal goal = new Goal(form.get("goal_id"), form.get("title"), form.get("review_date"), form.get("description"), form.get("achieved"), "0");
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        dbGetter.editGoal(userId, goal);
        return createGoal();
    }
    private Result deleteGoal(int userId, int goalId) {
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        dbGetter.deleteGoal(userId, goalId);
        return createGoal();
    }
}
