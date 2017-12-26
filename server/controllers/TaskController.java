package controllers;

import models.DatabaseGetter;
import models.Exporter;
import models.Task;
import play.api.db.Database;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.mvc.Controller;
import play.mvc.Result;
import services.Wrapper;

import javax.inject.Inject;

public class TaskController extends Controller{

    private static final String DEL = "del";

    @Inject
    Database db;

    @Inject
    FormFactory formFactory;

    public Result getTask() {
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        String json = Exporter.listToJSON(dbGetter.getTasks(1));
        return ok(Wrapper.wrapResponse(json));
    }
    public Result addTask() {
        System.out.println("Adding task");
        DynamicForm form = formFactory.form().bindFromRequest();
        int userId = 1; //form.get("user_id"); TODO: generalise user id.
        String goalId = form.get("goal_id"); //- if form value is invalid or not set, set null. TODO
        String optionalParentId = null; // form.get("parent_task_id"); - same as above.
        Task task = new Task(form.get("title"),
                form.get("due_date"), form.get("est_hours"), form.get("description"));
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        dbGetter.setTask(userId, goalId, optionalParentId, task);
        return getTask();
    }
    public Result updateTask() {
        DynamicForm form = formFactory.form().bindFromRequest();
        int userId = 1; // TODO
        if(form.get("task_id") == null || form.get("user") == null) {
            return ok(Wrapper.errorResponse("No user or task."));
        }
        String taskId = form.get("task_id");
        if(DEL.equals(form.get("del"))) {
            return deleteTask(userId, taskId);
        }
        Task task = new Task(taskId, form.get("goal_id"), 0, form.get("due_date"), form.get("complete"), form.get("est_hours"),
                form.get("comp_hours"), form.get("title"), form.get("description"));
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        if (dbGetter.updateTask(userId, task)){
            return ok(Wrapper.wrapResponse(task.toJSON()));
        }
        return ok();
    }
    private Result deleteTask(int userId, String taskId) {
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        if(taskId != null && taskId.matches("^\\d+$")) {
            dbGetter.deleteTask(userId, Integer.parseInt(taskId));
        } else {
            return ok(Wrapper.errorResponse("Invalid Task"));
        }
        return getTask();
    }
}
