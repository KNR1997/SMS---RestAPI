package com.example.sms.utils;

public class SearchUtil {
    public static String extractSearchValue(String search, String key) {
        if (search == null || search.isEmpty()) return null;

        String[] parts = search.split(";");
        for (String part : parts) {
            String[] keyValue = part.split(":");
            if (keyValue.length == 2 && keyValue[0].equalsIgnoreCase(key)) {
                return keyValue[1];
            }
        }
        return null;
    }
}
