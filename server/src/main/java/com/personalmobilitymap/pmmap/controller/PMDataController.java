package com.personalmobilitymap.pmmap.controller;

import com.personalmobilitymap.pmmap.model.PMDetectionInfo;
import com.personalmobilitymap.pmmap.repository.PMDetectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/data")
public class PMDataController {

    @Autowired
    private PMDetectionRepository repository;

    @CrossOrigin(origins = "*")
    @GetMapping("/{cctvName}")
    public ResponseEntity<List<PMDetectionInfo>> getCCTVData(@PathVariable String cctvName) {
        // DB에서 CCTV_NAME과 일치하는 데이터를 검색
        List<PMDetectionInfo> cctvData = repository.findByCctvName(cctvName);

        // 데이터가 없으면 404 반환
        if (cctvData.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // 데이터 반환
        return ResponseEntity.ok(cctvData);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/image/{fileName}/{imgName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName, @PathVariable String imgName) {
        // 경로를 결합하여 파일 이름 생성
        String fullFileName = fileName + "/" + imgName;

        // PMDetection 디렉토리에서 파일을 찾음
        Resource resource = new ClassPathResource("PMDetection/" + fullFileName);

        // 파일이 존재하지 않으면 404 반환
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        // 파일 반환
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "image/jpeg");
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
