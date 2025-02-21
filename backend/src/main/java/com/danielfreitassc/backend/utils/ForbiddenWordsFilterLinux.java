package com.danielfreitassc.backend.utils;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ForbiddenWordsFilterLinux {
    private static final Set<String> FORBIDDEN_WORDS = new HashSet<>(Arrays.asList(
        "HOME", "USER", "LOGNAME", "PATH", "SHELL", "PWD", "OLDPWD", 
        "LANG", "LANGUAGE", "LC_ALL", "LC_CTYPE", "LC_MESSAGES", "LC_TIME",
        "TERM", "DISPLAY", "XAUTHORITY", "XDG_RUNTIME_DIR", 
        "DBUS_SESSION_BUS_ADDRESS", "HOSTNAME"
    ).stream().map(String::toUpperCase).collect(Collectors.toSet()));

    public static boolean containsForbiddenWords(String value) {
        return FORBIDDEN_WORDS.contains(value.toUpperCase());
    }
}

