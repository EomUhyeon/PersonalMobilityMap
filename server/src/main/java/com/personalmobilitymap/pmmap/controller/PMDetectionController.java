package com.personalmobilitymap.pmmap.controller;

import com.personalmobilitymap.pmmap.model.PMDetectionInfo;
import com.personalmobilitymap.pmmap.service.PMDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pm_detection")
public class PMDetectionController {

    @Autowired
    private PMDetectionService pmDetectionService;

    @PostMapping("/save")
    public PMDetectionInfo savePMDetectionInfo(@RequestBody PMDetectionInfo pmDetectionInfo) {
        return pmDetectionService.savePMDetectionInfo(pmDetectionInfo);
    }

    @GetMapping
    public List<PMDetectionInfo> getAllPMDetectionInfo() {
        return pmDetectionService.getAllPMDetectionInfo();
    }
}
