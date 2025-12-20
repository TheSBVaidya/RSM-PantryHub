package com.pantryhub.common.util;

public class SlugUtil {

    private SlugUtil() {}

    public static String toSlug(String input) {
        if (input == null) return null;

        return input.toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-");
    }
}
