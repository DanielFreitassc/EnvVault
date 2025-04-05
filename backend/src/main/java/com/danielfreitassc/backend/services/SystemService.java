package com.danielfreitassc.backend.services;

import org.springframework.stereotype.Service;

@Service
public class SystemService {

    public String getOperatingSystem() {
        String osName = System.getProperty("os.name").toLowerCase();
        String osType;

        if (osName.contains("win")) {
            osType = "windows";
        } else if (osName.contains("nix") || osName.contains("nux") || osName.contains("mac")) {
            osType = "linux";
        } else {
            osType = "outro";
        }

        return osType;
    }
}
