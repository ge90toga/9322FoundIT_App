package com.seek.api.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Created by langley on 13/5/17.
 */
@ConfigurationProperties(prefix = "foundIT")
public class FoundITConfig {

    @Setter @Getter private String jobServiceHost;

    @Setter @Getter private String pollServiceHost;

    @Setter @Getter private String pollServiceURL;

    @Setter @Getter private boolean mailService;

}
