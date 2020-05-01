package tr.com.aurora.hbys.healthcare.service;

import tr.com.aurora.hbys.healthcare.service.dto.VisitDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link tr.com.aurora.hbys.healthcare.domain.Visit}.
 */
public interface VisitService {

    /**
     * Save a visit.
     *
     * @param visitDTO the entity to save.
     * @return the persisted entity.
     */
    VisitDTO save(VisitDTO visitDTO);

    /**
     * Get all the visits.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<VisitDTO> findAll(Pageable pageable);

    /**
     * Get all the visits with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<VisitDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" visit.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VisitDTO> findOne(Long id);

    /**
     * Delete the "id" visit.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
