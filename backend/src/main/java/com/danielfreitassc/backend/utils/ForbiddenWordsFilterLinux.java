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
        "DBUS_SESSION_BUS_ADDRESS", "HOSTNAME",
        "CHROME_DESKTOP", "COLORTERM", "DBUS_STARTER_ADDRESS", "DESKTOP_SESSION", 
        "GDMSESSION", "GNOME_SHELL_SESSION_MODE", "GTK_MODULES", "IM_CONFIG_PHASE", 
        "LESSCLOSE", "LESSOPEN", "LS_COLORS", "SESSION_MANAGER", "SHLVL",
        "SSH_AUTH_SOCK", "SYSTEMD_EXEC_PID", "USERNAME", "VTE_VERSION", 
        "WAYLAND_DISPLAY", "XDG_CURRENT_DESKTOP", "XDG_SESSION_TYPE", "XMODIFIERS",
        "_", "DBUS_STARTER_BUS_TYPE", "GDK_BACKEND", "GNOME_DESKTOP_SESSION_ID",
        "GNOME_SETUP_DISPLAY", "GNOME_TERMINAL_SCREEN", "GNOME_TERMINAL_SERVICE",
        "INSIDE_NAUTILUS_PYTHON", "ORIGINAL_XDG_CURRENT_DESKTOP", "QT_ACCESSIBILITY",
        "QT_IM_MODULE", "SSH_AGENT_LAUNCHER", "TERM_PROGRAM", "TERM_PROGRAM_VERSION",
        "XDG_CONFIG_DIRS", "XDG_DATA_DIRS", "XDG_MENU_PREFIX", "XDG_SESSION_CLASS",
        "XDG_SESSION_DESKTOP"
    ).stream().map(String::toUpperCase).collect(Collectors.toSet()));

    public static boolean containsForbiddenWords(String value) {
        return FORBIDDEN_WORDS.contains(value.toUpperCase());
    }
}

