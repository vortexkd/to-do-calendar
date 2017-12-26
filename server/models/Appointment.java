package models;


import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.util.List;

public class Appointment implements IExportable {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("yyyy-MM-dd");
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormat.forPattern("HH:mm");

    private int id;
    private String title;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
    private int userId;
    private int associatedTaskId;
    private int associatedGoalId;
    private String note;
    /*
    extension :
    private String location
    private String notes;
     */

    //insert constructor
    public Appointment(String date, String startTime, String endTime, String title, int taskId, int goalId) {
        this.title = title;
        this.date = LocalDate.parse(date, DATE_FORMAT);
        this.startTime = LocalTime.parse(startTime, TIME_FORMAT);
        this.endTime = LocalTime.parse(endTime, TIME_FORMAT);
        this.associatedTaskId = taskId;
        this.associatedGoalId = goalId;
        // add to mysql
    }
    // update constructor
    public Appointment(String id, String date, String startTime, String endTime, String title, String note) {
        this.id = (Validator.isInt(id) ? Integer.parseInt(id) : 0);
        this.title = title;
        this.date = LocalDate.parse(date, DATE_FORMAT);
        this.startTime = LocalTime.parse(startTime, TIME_FORMAT);
        this.endTime = LocalTime.parse(endTime, TIME_FORMAT);
        this.note = note;
    }
    // mysql read constructor.
    Appointment(int id, int userId, int associatedGoalId, int associatedTaskId, String date, String startTime, String endTime, String title, String note) {
        this.id = id;
        this.userId = userId;
        this.associatedTaskId = associatedTaskId;
        this.associatedGoalId = associatedGoalId;
        this.title = title;
        this.date = LocalDate.parse(date, DATE_FORMAT);
        this.startTime = LocalTime.parse(startTime, TIME_FORMAT);
        this.endTime = LocalTime.parse(endTime, TIME_FORMAT);
        this.note = note;
    }

    String getTitle() {
        return title;
    }

    String getNote() {
        return note;
    }

    int getAssociatedTaskId() {
        return associatedTaskId;
    }

    int getAssociatedGoalId() {
        return associatedGoalId;
    }

    String getStartTimeString() {
        return startTime.toString(TIME_FORMAT);
    }

    int getId() {
        return id;
    }

    String getEndTimeString() {
        return endTime.toString(TIME_FORMAT);
    }
    String getDateString() {
        return date.toString(DATE_FORMAT);
    }

    @Override
    public String toString() {
        return this.title + " " + this.date.toString() + " " + getStartTimeString() + " " + getEndTimeString();
    }

    @Override
    public String toJSON() {
        return "{" +
                "\"id\":\"" + this.id +  "\"," +
                "\"title\":\"" + this.title + "\"," +
                "\"date\":\"" + this.date + "\"," +
                "\"start\":\"" + this.getStartTimeString() + "\"," +
                "\"end\":\"" + this.getEndTimeString() + "\"," +
                "\"associatedGoal\":\"" + this.associatedGoalId + "\"," +
                "\"associatedTask\":\"" + this.associatedTaskId + "\"," +
                "\"note\":\"" + this.note + "\"" +
                "}";
    }

    //startTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();

}
