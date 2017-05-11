package com.seek.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Created by langley on 11/5/17.
 */
public class VoteDTO {

    @Setter @Getter private String name;

    @Setter @Getter private Integer count;

}
