package models;

public abstract class Validator {
    private static final String BANNED_CHARS = "[\"'\\\\<>\\n]";

    static boolean isInt(String check) {
        if(check.matches("^\\d+$")) {
            return true;
        } else {
            return false;
        }
    }
    static String clean(String s) {
        return s.replaceAll(BANNED_CHARS, "");
    }
}
