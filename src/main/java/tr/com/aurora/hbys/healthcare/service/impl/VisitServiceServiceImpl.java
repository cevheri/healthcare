package tr.com.aurora.hbys.healthcare.service.impl;

import tr.com.aurora.hbys.healthcare.service.VisitServiceService;
import tr.com.aurora.hbys.healthcare.domain.VisitService;
import tr.com.aurora.hbys.healthcare.repository.VisitServiceRepository;
import tr.com.aurora.hbys.healthcare.service.dto.VisitServiceDTO;
import tr.com.aurora.hbys.healthcare.service.mapper.VisitServiceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link VisitService}.
 */
@Service
@Transactional
public class VisitServiceServiceImpl implements VisitServiceService {

    private final Logger log = LoggerFactory.getLogger(VisitServiceServiceImpl.class);

    private final VisitServiceRepository visitServiceRepository;

    private final VisitServiceMapper visitServiceMapper;

    public VisitServiceServiceImpl(VisitServiceRepository visitServiceRepository, VisitServiceMapper visitServiceMapper) {
        this.visitServiceRepository = visitServiceRepository;
        this.visitServiceMapper = visitServiceMapper;
    }

    /**
     * Save a visitService.
     *
     * @param visitServiceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public VisitServiceDTO save(VisitServiceDTO visitServiceDTO) {
        log.debug("Request to save VisitService : {}", visitServiceDTO);
        VisitService visitService = visitServiceMapper.toEntity(visitServiceDTO);
        visitService = visitServiceRepository.save(visitService);
        return visitServiceMapper.toDto(visitService);
    }

    /**
     * Get all the visitServices.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VisitServiceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all VisitServices");
        return visitServiceRepository.findAll(pageable)
            .map(visitServiceMapper::toDto);
    }

    /**
     * Get one visitService by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VisitServiceDTO> findOne(Long id) {
        log.debug("Request to get VisitService : {}", id);
        return visitServiceRepository.findById(id)
            .map(visitServiceMapper::toDto);
    }

    /**
     * Delete the visitService by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VisitService : {}", id);
        visitServiceRepository.deleteById(id);
    }
}
