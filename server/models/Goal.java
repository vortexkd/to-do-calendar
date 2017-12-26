package models;


import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import javax.validation.Valid;
import java.util.*;

import static models.Validator.isInt;


public class Goal implements IExportable {
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("yyyy-MM-dd");

    private int id; // generate in mysql?
    private boolean isAchieved = false;
    private LocalDate reviewDate;
    private LocalDate createdDate;

    private String title;
    private String description;
    private Map<LocalDate, Double> satisfaction = new TreeMap<>();
    // TODO getters that handle unset values.

    //remove for server
    private static int counter = 0;

    Goal(int id, int isAchieved, String reviewDate, String title, String description, String createdDate) {
        this.id = id;
        this.isAchieved = (isAchieved != 0 );
        this.reviewDate = LocalDate.parse(reviewDate, DATE_FORMAT);
        this.title = title;
        this. description = description;
        this.createdDate = LocalDate.parse(createdDate, DATE_FORMAT);
    }

    // for adding a goal.
    public Goal(String title, String description, String reviewDate) {
        this.title = title;
        this.description = Validator.clean(description);
        this.reviewDate = LocalDate.parse(reviewDate, DATE_FORMAT);
        this.createdDate = LocalDate.now();
    }

    public Goal(String id, String title, String reviewDate, String description, String achieved, String satisfaction) {
        this.id = (isInt(id) ? Integer.parseInt(id) : 0);
        this.title = title;
        this.description = Validator.clean(description);
        this.isAchieved = !"0".equals(achieved);
        this.reviewDate = LocalDate.parse(reviewDate, DATE_FORMAT);
    }

    int getId() {
        return id;
    }

    int getAchievedInt() {
        return isAchieved ? 1 : 0;
    }

    String getCreatedDate() {
        return createdDate.toString(DATE_FORMAT);
    }
    String getReviewDateString() {
        return reviewDate.toString(DATE_FORMAT);
    }

    String getTitle() {
        return title;
    }

    String getDescription() {
        return description;
    }

    Map<LocalDate, Double> getSatisfaction() {
        return satisfaction;
    }

    void setId(int id) {
        this.id = id;
    }

    // progress tracking
    public void rateProgress(double rating) {
        satisfaction.put(LocalDate.now(),rating); //overwrite days(?)
    }

    // for demo purpose (allow custom date setting).
    public void rateProgress(String date, double rating) {
        satisfaction.put(LocalDate.parse(date,DATE_FORMAT),rating);
    }

    @Override
    public String toString() {
        return id + " - " + reviewDate + " " + isAchieved + " " + title + " " + description;
    }

    @Override
    public String toJSON() {
        return "{" +
                "\"id\":\"" + this.id +  "\"," +
                "\"title\":\"" + this.title + "\"," +
                "\"achieved\":\"" + this.isAchieved + "\"," +
                "\"review_date\":\"" + this.getReviewDateString() + "\"," +
                "\"created_date\":\"" + this.getCreatedDate() + "\"," +
                "\"desc\":\"" + this.getDescription() + "\"" +
                "}";
    }
}
