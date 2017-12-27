package models;

import org.h2.engine.User;
import play.api.db.Database;
import scala.App;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DatabaseGetter {

    private Database db;

    public DatabaseGetter (Database db) {
        this.db = db;
    }

    public Person getUserFromId(int userId) {
        List<Person> persons = new ArrayList<>();
        try (Connection conn = db.getConnection()) {
            String queryGoal = "SELECT * FROM person WHERE person_id= ?";
            PreparedStatement stmt = conn.prepareStatement(queryGoal);
            stmt.setInt(1,userId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                persons.add(new Person(userId, rs.getString("name"), rs.getString("review")));
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
        }
        if (persons.size()==0) {
            return null;
        }
        return persons.get(0);
    }

    public List<Goal> getGoals (int userId) {
        List<Goal> goalList = new ArrayList<>();
        try (Connection conn = db.getConnection()) {
            String queryGoal = "SELECT * FROM goal WHERE person_id= ? AND deleted=0";
            PreparedStatement stmt = conn.prepareStatement(queryGoal);
            stmt.setInt(1,userId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
               goalList.add(new Goal(rs.getInt("goal_id"), rs.getInt("achieved"),
                       rs.getString("review_date"), rs.getString("title"),
                       rs.getString("description"), rs.getString("created_date")));
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
        }
        return goalList;
    }

    // set goal first so that, you can do validation.
    public void setGoal(int userId, Goal goal) {
        String queryGoal = "INSERT INTO goal (person_id, review_date, achieved, title, description, created_date)" + " VALUES(?, ?, 0, ?, ?, ?);";
        try (Connection conn  = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(queryGoal);
            stmt.setInt(1, userId);
            stmt.setString(2, goal.getReviewDateString());
            stmt.setString(3, goal.getTitle());
            stmt.setString(4, goal.getDescription());
            stmt.setString(5, goal.getCreatedDate());
            if(stmt.execute()) {
                System.out.println("new goal created.");
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
            System.out.println(queryGoal);
        }
    }
    public boolean editGoal(int userId, Goal goal) {
        String queryGoal = "Update goal SET " +
                "review_date = ?, achieved =?, title = ?, description = ? " +
                "WHERE goal_id = ? AND person_id = ?";
        try (Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(queryGoal);
            stmt.setString(1, goal.getReviewDateString());
            stmt.setInt(2, goal.getAchievedInt()); //might throw errors later
            stmt.setString(3, goal.getTitle()); //might throw errors later
            stmt.setString(4, goal.getDescription());
            stmt.setInt(5, goal.getId());
            stmt.setInt(6, userId);
            if(stmt.executeUpdate() == 1) {
                return true;
            }
        } catch (SQLException s) {
            System.out.println(queryGoal);
            return false;
        }
        System.out.println("Something went wrong updating goal " + goal.getId());
        return false;
    }
    public boolean deleteGoal(int personId, int goalId) {
        String delGoal = "UPDATE goal SET " +
                "deleted=1 WHERE person_id=? AND goal_id=?";
        String delTasks = "UPDATE task SET " +
                "deleted=1 WHERE person_id=? AND goal_id=?";
        try (Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(delGoal);
            stmt.setInt(1, personId);
            stmt.setInt(2, goalId);
            if (stmt.executeUpdate() == 1) {
                PreparedStatement dstmt =  conn.prepareStatement(delTasks);
                dstmt.setInt(1, personId);
                dstmt.setInt(2, goalId);
                dstmt.executeUpdate();
                conn.close();
                return true;
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
            return false;
        }
        return false;
    }
    public List<Task> getTasks(int userId) {
        List<Task> taskList = new ArrayList<>();
        try (Connection conn = db.getConnection()) {
            String queryGoal = "SELECT * FROM task WHERE person_id= ? AND deleted = 0 ORDER BY goal_id, due_date";
            PreparedStatement stmt = conn.prepareStatement(queryGoal);
            stmt.setInt(1,userId);
            ResultSet rs = stmt.executeQuery();
            // task id, goalid, parent id, due_date, complete, estHours, completed hours.
            while (rs.next()) {
                taskList.add(new Task(rs.getInt("task_id"), rs.getInt("goal_id"),
                        rs.getInt("task_parent_id"), rs.getString("due_date"), rs.getInt("Complete"),
                        rs.getInt("estimated_man_hours"), rs.getInt("completed_man_hours"),
                        rs.getString("title"), rs.getString("description")));
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
        }
        return taskList;
    }

    public void setTask(int userId, String goalId, String optionalParentId, Task task) {
        String queryTask = "INSERT INTO task (person_id, goal_id, task_parent_id, due_date, estimated_man_hours, title, description)"
                + " VALUES(?, ?, ?, ?, ?, ?, ?);";
        try (Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(queryTask);
            stmt.setInt(1,userId);
            stmt.setString(2, goalId); //might throw errors later
            stmt.setString(3, optionalParentId); //might throw errors later
            stmt.setString(4, task.getDueDateString());
            stmt.setInt(5, task.getEstimatedManHours());
            stmt.setString(6, task.getTitle());
            stmt.setString(7, task.getDescription());
            if(stmt.execute()) {
                System.out.println("new task created.");
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
            System.out.println(queryTask);
        }
    }
    public boolean updateTask(int userId, Task task) { //TODO: how can you only update the columns that need updating?
        String updateTask = "UPDATE task SET" +
                " goal_id=?, due_date=?, complete=?, estimated_man_hours=?, completed_man_hours=?, " +
                " title=?, description=? " +
                "WHERE task_id = ? AND person_id= ?;";
        try (Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(updateTask);
            stmt.setInt(1, task.getGoalId());
            stmt.setString(2, task.getDueDateString());
            stmt.setInt(3, task.getCompleteInt());
            stmt.setInt(4, task.getEstimatedManHours());
            stmt.setInt(5, task.getCompletedManHours());
            stmt.setString(6, task.getTitle());
            stmt.setString(7, task.getDescription());
            stmt.setInt(8, task.getId());
            stmt.setInt(9, userId);
            if (stmt.executeUpdate() == 1) {
                conn.close();
                return true;
            }
            conn.close();
        } catch (SQLException s) {
            return false;
        }
        System.out.println(updateTask);
        return false;
    }
    public boolean deleteTask(int personId, int taskId) {
        String delTask = "UPDATE task SET " +
                "deleted = 1 " + "WHERE person_id=? AND task_id=?;";
        try (Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(delTask);
            stmt.setInt(1, personId);
            stmt.setInt(2, taskId);
            if (stmt.executeUpdate() == 1) {
                conn.close();
                return true;
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
            return false;
        }
        System.out.println("Something went wrong deleting task " + taskId + " user: " + personId);
        return false;
    }

    public List<Appointment> getAppointments(int userId) {
        String queryTask = "SELECT appointment_id, goal_id, task_id, appointment_date, DATE_FORMAT(start_time, '%H:%i') AS `start`, " +
                "DATE_FORMAT(end_time, '%H:%i') AS `end`, title, note FROM success.appointment " +
                "WHERE person_id = ? AND deleted=0 ORDER BY appointment_date DESC;";
        List<Appointment> appoList = new ArrayList<>();
        try (Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(queryTask);
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                appoList.add(new Appointment(rs.getInt("appointment_id"), userId, rs.getInt("goal_id"),
                        rs.getInt("task_id"), rs.getString("appointment_date"),
                        rs.getString("start"), rs.getString("end"), rs.getString("title"), rs.getString("note")
                ));
            }
            conn.close();
        }  catch (SQLException s) {
            s.printStackTrace();
            System.out.println(queryTask);
        }
        return appoList;
    }

    public void setAppointment(int userId, Appointment appointment) {
        String queryAppo = "INSERT INTO appointment (person_id, goal_id, task_id, appointment_date, start_time, end_time, title)" +
                " VALUES (?, ?, ?, ?, ?, ?, ?);";
        try (Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(queryAppo);
            stmt.setInt(1, userId);
            stmt.setInt(2, appointment.getAssociatedGoalId()); //might throw errors later
            stmt.setInt(3, appointment.getAssociatedTaskId()); //might throw errors later
            stmt.setString(4, appointment.getDateString());
            stmt.setString(5, appointment.getStartTimeString());
            stmt.setString(6, appointment.getEndTimeString());
            stmt.setString(7, appointment.getTitle());
            if(stmt.execute()) {
                System.out.println("new appo created.");
            }
            conn.close();
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
            System.out.println(queryAppo);
        }
    }
    public boolean updateAppointments(int userId, Appointment appointment) {
        String appoQuery = "UPDATE appointment SET " +
                "appointment_date=?, start_time=?, end_time=?, title=?, note=? " +
                "WHERE appointment_id=? AND person_id=?";
        try(Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(appoQuery);
            stmt.setString(1, appointment.getDateString());
            stmt.setString(2, appointment.getStartTimeString());
            stmt.setString(3, appointment.getEndTimeString());
            stmt.setString(4, appointment.getTitle());
            stmt.setString(5, appointment.getNote());
            stmt.setInt(6, appointment.getId());
            stmt.setInt(7, userId);
            if(stmt.executeUpdate() == 1) {
                conn.close();
                return true;
            }
            conn.close();
        } catch(SQLException s) {
            s.printStackTrace();
        }
        System.out.println("Something went wrong updating appointment " + appointment.getTitle());
        return false;
    }
    public boolean deleteAppointment(int userId, int appoId) {
        String appoQuery = "UPDATE appointment SET " +
                "deleted=1 " +
                "WHERE appointment_id=? AND person_id=?";
        try(Connection conn = db.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(appoQuery);
            stmt.setInt(1, appoId);
            stmt.setInt(2, userId);
            if(stmt.executeUpdate() == 1) {
                conn.close();
                return true;
            }
            conn.close();
        } catch (SQLException s) {
            s.printStackTrace();
        }
        System.out.println("Something went wrong deleting appointment " + appoId);
        return false;
    }
    /*private boolean checkAuth(int userId, String table, int checkId) {
        try (Connection conn = db.getConnection()) {
            String queryGoal = "SELECT * FROM " + table + " WHERE " + table + "_id = ? AND person_id= ?";
            PreparedStatement stmt = conn.prepareStatement(queryGoal);
            stmt.setInt(1, checkId);
            stmt.setInt(2, userId);

        } catch (SQLException s) {
            return false;
        }
    }*/


}
