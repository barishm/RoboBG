package com.robobg.robo.service.impl;

import java.lang.reflect.Field;


public class ObjectUtils {
    public static void setEmptyStringsToNull(Object obj) {
        if (obj == null) {
            return;
        }
        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object fieldValue = field.get(obj);
                if (fieldValue instanceof String) {
                    String str = (String) fieldValue;
                    if (str.isEmpty()) {
                        field.set(obj, null);
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
