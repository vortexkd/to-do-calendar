package models;


import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import static models.Validator.clean;
import static models.Validator.isInt;



/*
    Info required for new task -
    current user,
    corresponding goal,
    name for task, due-date (optional?),
    estimated hours of work reqd to finish.
    description of task (optional)

    -- should be creatable using an appointment , under the "misc." goal

 */

public class Task implements IExportable {
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("yyyy-MM-dd");
    private String title;
    private LocalDate dueDate;
    private boolean isComplete = false;
    private int estimatedManHours;
    private int completedManHours = 0;
    private String description;

    private Integer goalId;
    private Integer parentId;
    private Integer userId;
    private Integer id;


    public Task(String title, String dueDate, String estimatedManHours, String description) {
        this.title = title;
        this.dueDate = LocalDate.parse(dueDate, DATE_FORMAT); // validation.
        this.estimatedManHours = Integer.parseInt(estimatedManHours);
        this.description = description;
        // add to mysql.
    } // unused

    public Task(String taskId, String goalId, int parentId, String dueDate, String isComplete, String estimatedManHours, String completedManHours, String title, String description) {
        this.id = (isInt(taskId) ? Integer.parseInt(taskId) : 0);
        this.goalId = (isInt(goalId) ? Integer.parseInt(goalId) : 0);
        this.parentId = parentId; //TODO
        this.dueDate = LocalDate.parse(dueDate, DATE_FORMAT); //validation
        this.isComplete = (!isComplete.equals("0"));
        this.estimatedManHours = (isInt(estimatedManHours) ? Integer.parseInt(estimatedManHours) : 1);
        this.completedManHours = (isInt(completedManHours) ? Integer.parseInt(completedManHours) : 0);
        this.title = clean(title);
        this.description = clean(description);
    }

    Task (int taskId, int goalId, int parentId, String dueDate, int isComplete, int estimatedManHours, int completedManHours, String title, String description) {
        this.id = taskId;
        this.goalId = goalId;
        this.parentId = parentId;
        this.dueDate = LocalDate.parse(dueDate, DATE_FORMAT);
        this.isComplete = (isComplete != 0);
        this.estimatedManHours = estimatedManHours;
        this.completedManHours = completedManHours;
        this.title = title;
        this.description = description;
    }


    // getters
    String getTitle() {
        return title;
    }

    int getGoalId() {
        return goalId;
    }

    int getId() {
        return id;
    }

    String getDueDateString() {
        return dueDate.toString(DATE_FORMAT);
    }

    int getCompleteInt() {
        return (isComplete ? 1 : 0);
    }

    int getEstimatedManHours() {
        return estimatedManHours;
    }

    int getCompletedManHours() {
        return completedManHours;
    }

    String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return this.title + " " +this.description + " " + this.dueDate.toString();
    }

    @Override
    public String toJSON() {
        return "{" +
                "\"id\":\"" + this.id +  "\"," +
                "\"title\":\"" + this.title +  "\"," +
                "\"complete\":\"" + this.isComplete + "\"," +
                "\"estimated_man_hours\":\"" + this.estimatedManHours + "\"," +
                "\"completed_man_hours\":\"" + this.completedManHours + "\"," +
                "\"due_date\":\"" + this.getDueDateString() + "\"," +
                "\"description\":\"" + clean(this.description) + "\"," +
                "\"goal_id\":\"" + this.goalId + "\"," +
                "\"parent_task\":\"" + this.parentId + "\"" +
                "}";
    }
}
