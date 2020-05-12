package tr.com.aurora.hbys.healthcare.web.rest;

import tr.com.aurora.hbys.healthcare.service.BloodtypeService;
import tr.com.aurora.hbys.healthcare.web.rest.errors.BadRequestAlertException;
import tr.com.aurora.hbys.healthcare.service.dto.BloodtypeDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link tr.com.aurora.hbys.healthcare.domain.Bloodtype}.
 */
@RestController
@RequestMapping("/api")
public class BloodtypeResource {

    private final Logger log = LoggerFactory.getLogger(BloodtypeResource.class);

    private static final String ENTITY_NAME = "bloodtype";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BloodtypeService bloodtypeService;

    public BloodtypeResource(BloodtypeService bloodtypeService) {
        this.bloodtypeService = bloodtypeService;
    }

    /**
     * {@code POST  /bloodtypes} : Create a new bloodtype.
     *
     * @param bloodtypeDTO the bloodtypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bloodtypeDTO, or with status {@code 400 (Bad Request)} if the bloodtype has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bloodtypes")
    public ResponseEntity<BloodtypeDTO> createBloodtype(@RequestBody BloodtypeDTO bloodtypeDTO) throws URISyntaxException {
        log.debug("REST request to save Bloodtype : {}", bloodtypeDTO);
        if (bloodtypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new bloodtype cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BloodtypeDTO result = bloodtypeService.save(bloodtypeDTO);
        return ResponseEntity.created(new URI("/api/bloodtypes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bloodtypes} : Updates an existing bloodtype.
     *
     * @param bloodtypeDTO the bloodtypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bloodtypeDTO,
     * or with status {@code 400 (Bad Request)} if the bloodtypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bloodtypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bloodtypes")
    public ResponseEntity<BloodtypeDTO> updateBloodtype(@RequestBody BloodtypeDTO bloodtypeDTO) throws URISyntaxException {
        log.debug("REST request to update Bloodtype : {}", bloodtypeDTO);
        if (bloodtypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BloodtypeDTO result = bloodtypeService.save(bloodtypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bloodtypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bloodtypes} : get all the bloodtypes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bloodtypes in body.
     */
    @GetMapping("/bloodtypes")
    public ResponseEntity<List<BloodtypeDTO>> getAllBloodtypes(Pageable pageable) {
        log.debug("REST request to get a page of Bloodtypes");
        Page<BloodtypeDTO> page = bloodtypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bloodtypes/:id} : get the "id" bloodtype.
     *
     * @param id the id of the bloodtypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bloodtypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bloodtypes/{id}")
    public ResponseEntity<BloodtypeDTO> getBloodtype(@PathVariable Long id) {
        log.debug("REST request to get Bloodtype : {}", id);
        Optional<BloodtypeDTO> bloodtypeDTO = bloodtypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bloodtypeDTO);
    }

    /**
     * {@code DELETE  /bloodtypes/:id} : delete the "id" bloodtype.
     *
     * @param id the id of the bloodtypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bloodtypes/{id}")
    public ResponseEntity<Void> deleteBloodtype(@PathVariable Long id) {
        log.debug("REST request to delete Bloodtype : {}", id);
        bloodtypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
