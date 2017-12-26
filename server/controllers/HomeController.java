package controllers;

import models.*;
import play.api.db.Database;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.mvc.*;
import services.Wrapper;

import javax.inject.Inject;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    @Inject
    FormFactory formFactory;

    @Inject
    Database db;

    private static final String DEL = "del";

    public Result index() {
        try (Connection connection = db.getConnection()) {
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM success.person");
            while (rs.next()) {
                System.out.println(rs.getInt(1) + rs.getString(3));
            }
            connection.close();
        } catch (SQLException s) {
            s.printStackTrace();
        }
        // if logged in use return redirect("/{user_name}/dashboard")
        return redirect("/login/");
    }

    public Result dashboard(String parsedId) {
        int id = Integer.parseInt(parsedId);
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        Person user = dbGetter.getUserFromId(id);
        user.setGoals(dbGetter.getGoals(user.getId()));
        user.setTasks(dbGetter.getTasks(user.getId()));
        user.setSchedule(dbGetter.getAppointments(user.getId()));
        String json = user.toJSON();
        return ok(Wrapper.wrapResponse(json)); //TODO: make error responses work.

    }


//    public Result getTask() {
//        DatabaseGetter dbGetter = new DatabaseGetter(db);
//        String json = Exporter.listToJSON(dbGetter.getTasks(1));
//        return ok(Wrapper.wrapResponse(json));
//    }
//    public Result addTask() {
//        System.out.println("Adding task");
//        DynamicForm form = formFactory.form().bindFromRequest();
//        int userId = 1; //form.get("user_id"); TODO: generalise user id.
//        String goalId = form.get("goal_id"); //- if form value is invalid or not set, set null. TODO
//        String optionalParentId = null; // form.get("parent_task_id"); - same as above.
//        Task task = new Task(form.get("title"),
//                form.get("due_date"), form.get("est_hours"), form.get("description"));
//        DatabaseGetter dbGetter = new DatabaseGetter(db);
//        dbGetter.setTask(userId, goalId, optionalParentId, task);
//        return getTask();
//    }
//    public Result updateTask() {
//        DynamicForm form = formFactory.form().bindFromRequest();
//        int userId = 1; // TODO
//        if(form.get("task_id") == null || form.get("user") == null) {
//            return ok(Wrapper.errorResponse("No user or task."));
//        }
//        String taskId = form.get("task_id");
//        if(DEL.equals(form.get("del"))) {
//            return deleteTask(userId, taskId);
//        }
//        Task task = new Task(taskId, form.get("goal_id"), 0, form.get("due_date"), form.get("complete"), form.get("est_hours"),
//                form.get("comp_hours"), form.get("title"), form.get("description"));
//        DatabaseGetter dbGetter = new DatabaseGetter(db);
//        if (dbGetter.updateTask(userId, task)){
//            return ok(Wrapper.wrapResponse(task.toJSON()));
//        }
//        return ok();
//    }
//    private Result deleteTask(int userId, String taskId) {
//        DatabaseGetter dbGetter = new DatabaseGetter(db);
//        if(taskId != null && taskId.matches("^\\d+$")) {
//            dbGetter.deleteTask(userId, Integer.parseInt(taskId));
//        } else {
//            return ok(Wrapper.errorResponse("Invalid Task"));
//        }
//        return getTask();
//    }
}
