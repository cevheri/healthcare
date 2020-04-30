package tr.com.aurora.hbys.healthcare.repository;

import tr.com.aurora.hbys.healthcare.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
