package models;

public abstract class Validator {
    private static final String BANNED_CHARS = "[\"'\\\\<>]";

    static boolean isInt(String check) {
        if(check.matches("^\\d+$")) {
            return true;
        } else {
            return false;
        }
    }
    static String clean(String s) {
        if (s == null) {
            return s;
        }
        return s.replaceAll(BANNED_CHARS, "");
    }
    static String clean(String s, boolean escapeNewline) {
        if (!escapeNewline) {
            return clean(s);
        } else if (s == null) {
            return s;
        }
        return s.replaceAll(BANNED_CHARS, "").replaceAll("\\n","\\\\n");
    }
}
