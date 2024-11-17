package com.personalmobilitymap.pmmap.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class PMDetectionInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cctvName;
    private String date;
    private boolean helmet;
    private boolean firstLane;
    private boolean wrongWay;
    private boolean centerLine;
    private String image;
    private String label;

    public PMDetectionInfo() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCctvName() { return cctvName; }
    public void setCctvName(String cctvName) { this.cctvName = cctvName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public boolean isHelmet() { return helmet; }
    public void setHelmet(boolean helmet) { this.helmet = helmet; }

    public boolean isFirstLane() { return firstLane; }
    public void setFirstLane(boolean firstLane) { this.firstLane = firstLane; }

    public boolean isWrongWay() { return wrongWay; }
    public void setWrongWay(boolean wrongWay) { this.wrongWay = wrongWay; }

    public boolean isCenterLine() { return centerLine; }
    public void setCenterLine(boolean centerLine) { this.centerLine = centerLine; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
}
