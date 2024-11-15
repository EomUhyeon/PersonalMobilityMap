package com.personalmobilitymap.pmmap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.personalmobilitymap.pmmap.model.PMDetectionInfo;
import com.personalmobilitymap.pmmap.repository.PMDetectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class PMDetectionInitializer implements ApplicationRunner {

    @Autowired
    private PMDetectionRepository repository;

    @Autowired
    private ResourcePatternResolver resourcePatternResolver;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // resources/static/h2 폴더의 JSON 파일을 읽어옴
        Resource[] resources = getResourceFiles("classpath:h2/*.json");

        for (Resource resource : resources) {
            // JSON 파일을 객체로 변환하고 DB에 저장
            PMDetectionInfo info = parseJsonToPMDetectionInfo(resource.getFile());
            repository.save(info);
        }
    }

    // 특정 경로의 리소스 파일들을 배열로 가져오는 메서드
    private Resource[] getResourceFiles(String locationPattern) throws IOException {
        return resourcePatternResolver.getResources(locationPattern);
    }

    // JSON 파일을 KickboardDetectionInfo 객체로 변환하는 메서드
    private PMDetectionInfo parseJsonToPMDetectionInfo(File file) throws IOException {
        return objectMapper.readValue(file, PMDetectionInfo.class);
    }
}
