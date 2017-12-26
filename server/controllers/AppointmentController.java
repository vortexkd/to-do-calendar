package controllers;

import models.*;
import play.api.db.Database;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.mvc.*;
import services.Wrapper;

import javax.inject.Inject;
import java.util.List;

public class AppointmentController extends Controller {
    @Inject
    FormFactory formFactory;

    @Inject
    Database db;

    private static final String DEL = "del";
    public Result getAppointments() {
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        int userId = 1; // TODO: get from client.
        List<Appointment> appoList = dbGetter.getAppointments(userId);
        String json = Wrapper.wrapWithJsonKey(Exporter.listToJSON(appoList), "appointments");
        return ok(Wrapper.wrapResponse(json));
    }
    public Result addAppointment() {
        System.out.println("Filling calendar");
        DynamicForm form = formFactory.form().bindFromRequest();
        int userId = 1; // must be taken from client.
//        String goalId = null;  // must be taken from client. ---- is this needed?
        String taskId = null;
        String goalId = null;
        if (form.get("task_id") != null && form.get("task_id").matches("^\\d+$")) {
            taskId = form.get("task_id");
        }
        if (form.get("goal_id") != null && form.get("goal_id").matches("^\\d+$")) {
            goalId = form.get("goal_id");
        } else {
            taskId = null; // tasks are only allowed toward goals.
        }
        Appointment appointment = new Appointment(form.get("date"), form.get("start_time"),
                form.get("end_time"), form.get("appointment_title"),
                Integer.parseInt(taskId), Integer.parseInt(goalId));
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        dbGetter.setAppointment(userId, appointment);
        return getAppointments();
    }
    public Result updateAppointment() {
        DynamicForm form = formFactory.form().bindFromRequest();
        int userId = 1; // TODO
        if(form.get("id") == null || form.get("user") == null) {
            return ok(Wrapper.errorResponse("No user or appointment."));
        }
        String appoId = form.get("id");
        if(DEL.equals(form.get("del"))) {
            return deleteAppointment(userId, appoId);
        }
        Appointment appointment = new Appointment(appoId, form.get("date"), form.get("start_time"), form.get("end_time"), form.get("title"), form.get("note"));
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        dbGetter.updateAppointments(userId, appointment);
        return getAppointments();
    }
    private Result deleteAppointment(int userId, String appoId) {
        DatabaseGetter dbGetter = new DatabaseGetter(db);
        if(appoId != null && appoId.matches("^\\d+$")) {
            dbGetter.deleteAppointment(userId, Integer.parseInt(appoId));
        } else {
            return ok(Wrapper.errorResponse("Invalid Appointment"));
        }
        return getAppointments();
    }
}
