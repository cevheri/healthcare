package tr.com.aurora.hbys.healthcare.service;

import tr.com.aurora.hbys.healthcare.service.dto.VisitServiceDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link tr.com.aurora.hbys.healthcare.domain.VisitService}.
 */
public interface VisitServiceService {

    /**
     * Save a visitService.
     *
     * @param visitServiceDTO the entity to save.
     * @return the persisted entity.
     */
    VisitServiceDTO save(VisitServiceDTO visitServiceDTO);

    /**
     * Get all the visitServices.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<VisitServiceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" visitService.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VisitServiceDTO> findOne(Long id);

    /**
     * Delete the "id" visitService.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
