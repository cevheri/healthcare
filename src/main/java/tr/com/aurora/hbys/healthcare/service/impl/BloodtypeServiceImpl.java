package tr.com.aurora.hbys.healthcare.service.impl;

import tr.com.aurora.hbys.healthcare.service.BloodtypeService;
import tr.com.aurora.hbys.healthcare.domain.Bloodtype;
import tr.com.aurora.hbys.healthcare.repository.BloodtypeRepository;
import tr.com.aurora.hbys.healthcare.service.dto.BloodtypeDTO;
import tr.com.aurora.hbys.healthcare.service.mapper.BloodtypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Bloodtype}.
 */
@Service
@Transactional
public class BloodtypeServiceImpl implements BloodtypeService {

    private final Logger log = LoggerFactory.getLogger(BloodtypeServiceImpl.class);

    private final BloodtypeRepository bloodtypeRepository;

    private final BloodtypeMapper bloodtypeMapper;

    public BloodtypeServiceImpl(BloodtypeRepository bloodtypeRepository, BloodtypeMapper bloodtypeMapper) {
        this.bloodtypeRepository = bloodtypeRepository;
        this.bloodtypeMapper = bloodtypeMapper;
    }

    /**
     * Save a bloodtype.
     *
     * @param bloodtypeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BloodtypeDTO save(BloodtypeDTO bloodtypeDTO) {
        log.debug("Request to save Bloodtype : {}", bloodtypeDTO);
        Bloodtype bloodtype = bloodtypeMapper.toEntity(bloodtypeDTO);
        bloodtype = bloodtypeRepository.save(bloodtype);
        return bloodtypeMapper.toDto(bloodtype);
    }

    /**
     * Get all the bloodtypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BloodtypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Bloodtypes");
        return bloodtypeRepository.findAll(pageable)
            .map(bloodtypeMapper::toDto);
    }

    /**
     * Get one bloodtype by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BloodtypeDTO> findOne(Long id) {
        log.debug("Request to get Bloodtype : {}", id);
        return bloodtypeRepository.findById(id)
            .map(bloodtypeMapper::toDto);
    }

    /**
     * Delete the bloodtype by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bloodtype : {}", id);
        bloodtypeRepository.deleteById(id);
    }
}
