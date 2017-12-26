package models;

import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.List;

public class Person implements IExportable {
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("yyyy-MM-dd");
    private String name;
    private int goal_warning_count = 5;
    private List<Goal> goalList = new ArrayList<>(); // is a map a better choice? 'goalID' 'List<Task>'.
    private List<Task> taskList = new ArrayList<>();
    private List<Appointment> appointments = new ArrayList<>();
    private int teamID;
    private int id;
    private LocalDate reviewDate;

    public Person(int id, String name, String review) {
        this.name = name;
        this.id = id;
        this.teamID = 0; //TODO: teams.
        this.reviewDate = org.joda.time.LocalDate.parse(review, DATE_FORMAT);
    }

    public int getId() {
        return id;
    }

    public void setGoals(List<Goal> goals) {
        goalList.addAll(goals);
    }

    public void setTasks(List<Task> tasks) {
        taskList.addAll(tasks);
    }

    public void setSchedule(List<Appointment> schedule) {
        appointments.addAll(schedule);
    }

    @Override
    public String toJSON() {
        return "{" +
                "\"id\":\"" + this.id +  "\"," +
                "\"name\":\"" + this.name + "\"," +
                "\"team\":\"" + this.teamID + "\"," +
                "\"review_date\":\"" + this.reviewDate + "\"," +
                "\"goals\":" + Exporter.listToJSON(this.goalList) + "," +
                "\"tasks\":" + Exporter.listToJSON(this.taskList) + "," +
                "\"appointments\":" + Exporter.listToJSON(this.appointments) +
                "}";
    }
}
