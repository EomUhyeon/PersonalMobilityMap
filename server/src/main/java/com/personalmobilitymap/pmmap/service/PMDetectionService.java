package com.personalmobilitymap.pmmap.service;

import com.personalmobilitymap.pmmap.model.PMDetectionInfo;
import com.personalmobilitymap.pmmap.repository.PMDetectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PMDetectionService {

    @Autowired
    private PMDetectionRepository pmDetectionRepository;

    public PMDetectionInfo savePMDetectionInfo(PMDetectionInfo pmDetectionInfo) {
        return pmDetectionRepository.save(pmDetectionInfo);
    }

    public List<PMDetectionInfo> getAllPMDetectionInfo() {
        return pmDetectionRepository.findAll();
    }
}
