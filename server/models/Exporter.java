package models;

import java.util.List;

public class Exporter {
    public static <T extends IExportable> String listToJSON(List<T> itemList) {
        StringBuilder json = new StringBuilder("{");
        int last = itemList.size() -1;
        for(int i = 0; i <= last; i++) {
            json.append("\"")
                    .append(i)
                    .append("\":")
                    .append(itemList.get(i).toJSON());
            if(i != last) {
                json.append(",");
            }
        }
        json.append("}");
        return json.toString();
    }
}
