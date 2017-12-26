package services;

public class Wrapper {
    public static String wrapResponse(String result) {
        return "{\"status\":\"OK\",\"message\":\"\",\"ret\":" + result + "}";
    }
    public static String errorResponse(String message){
        return "{\"status\":\"ERROR\",\"message\":\"" + message + "\",\"ret\":{}}";
    }
    public static String wrapWithJsonKey(String json, String key) {
        return "{\""+key+"\":"+json+"}";
    }
}
