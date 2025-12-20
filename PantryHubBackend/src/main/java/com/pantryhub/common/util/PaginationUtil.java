package com.pantryhub.common.util;

import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.Map;

public class PaginationUtil {

    private PaginationUtil() {}

    public static Map<String, Object> buildPageResponse(Page<?> page) {
        Map<String, Object> response = new HashMap<>();

        response.put("content", page.getContent());
        response.put("page", page.getNumber());
        response.put("size", page.getSize());
        response.put("totalElements", page.getTotalElements());
        response.put("totalPages", page.getTotalPages());
        response.put("isLast", page.isLast());

        return response;
    }
}
