package com.personalmobilitymap.pmmap.repository;

import com.personalmobilitymap.pmmap.model.PMDetectionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PMDetectionRepository extends JpaRepository<PMDetectionInfo, Long> {
    // CCTV_NAME 데이터 검색
    List<PMDetectionInfo> findByCctvName(String cctvName);
}
