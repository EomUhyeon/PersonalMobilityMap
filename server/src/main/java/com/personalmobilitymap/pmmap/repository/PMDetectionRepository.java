package com.personalmobilitymap.pmmap.repository;

import com.personalmobilitymap.pmmap.model.PMDetectionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PMDetectionRepository extends JpaRepository<PMDetectionInfo, Long> {
}
