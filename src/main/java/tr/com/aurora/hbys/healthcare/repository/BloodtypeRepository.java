package tr.com.aurora.hbys.healthcare.repository;

import tr.com.aurora.hbys.healthcare.domain.Bloodtype;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bloodtype entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BloodtypeRepository extends JpaRepository<Bloodtype, Long> {
}
