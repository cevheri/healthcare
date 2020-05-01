package tr.com.aurora.hbys.healthcare.repository;

import tr.com.aurora.hbys.healthcare.domain.VisitService;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the VisitService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitServiceRepository extends JpaRepository<VisitService, Long> {
}
