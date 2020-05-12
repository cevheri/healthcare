package tr.com.aurora.hbys.healthcare.service;

import tr.com.aurora.hbys.healthcare.service.dto.BloodtypeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link tr.com.aurora.hbys.healthcare.domain.Bloodtype}.
 */
public interface BloodtypeService {

    /**
     * Save a bloodtype.
     *
     * @param bloodtypeDTO the entity to save.
     * @return the persisted entity.
     */
    BloodtypeDTO save(BloodtypeDTO bloodtypeDTO);

    /**
     * Get all the bloodtypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BloodtypeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" bloodtype.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BloodtypeDTO> findOne(Long id);

    /**
     * Delete the "id" bloodtype.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
