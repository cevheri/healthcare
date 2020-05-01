package tr.com.aurora.hbys.healthcare.web.rest;

import tr.com.aurora.hbys.healthcare.HealthcareApp;
import tr.com.aurora.hbys.healthcare.domain.VisitService;
import tr.com.aurora.hbys.healthcare.repository.VisitServiceRepository;
import tr.com.aurora.hbys.healthcare.service.VisitServiceService;
import tr.com.aurora.hbys.healthcare.service.dto.VisitServiceDTO;
import tr.com.aurora.hbys.healthcare.service.mapper.VisitServiceMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VisitServiceResource} REST controller.
 */
@SpringBootTest(classes = HealthcareApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class VisitServiceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private VisitServiceRepository visitServiceRepository;

    @Autowired
    private VisitServiceMapper visitServiceMapper;

    @Autowired
    private VisitServiceService visitServiceService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVisitServiceMockMvc;

    private VisitService visitService;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisitService createEntity(EntityManager em) {
        VisitService visitService = new VisitService()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .active(DEFAULT_ACTIVE)
            .price(DEFAULT_PRICE);
        return visitService;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisitService createUpdatedEntity(EntityManager em) {
        VisitService visitService = new VisitService()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .active(UPDATED_ACTIVE)
            .price(UPDATED_PRICE);
        return visitService;
    }

    @BeforeEach
    public void initTest() {
        visitService = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisitService() throws Exception {
        int databaseSizeBeforeCreate = visitServiceRepository.findAll().size();

        // Create the VisitService
        VisitServiceDTO visitServiceDTO = visitServiceMapper.toDto(visitService);
        restVisitServiceMockMvc.perform(post("/api/visit-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitServiceDTO)))
            .andExpect(status().isCreated());

        // Validate the VisitService in the database
        List<VisitService> visitServiceList = visitServiceRepository.findAll();
        assertThat(visitServiceList).hasSize(databaseSizeBeforeCreate + 1);
        VisitService testVisitService = visitServiceList.get(visitServiceList.size() - 1);
        assertThat(testVisitService.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVisitService.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVisitService.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testVisitService.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createVisitServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visitServiceRepository.findAll().size();

        // Create the VisitService with an existing ID
        visitService.setId(1L);
        VisitServiceDTO visitServiceDTO = visitServiceMapper.toDto(visitService);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitServiceMockMvc.perform(post("/api/visit-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitServiceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the VisitService in the database
        List<VisitService> visitServiceList = visitServiceRepository.findAll();
        assertThat(visitServiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitServiceRepository.findAll().size();
        // set the field null
        visitService.setName(null);

        // Create the VisitService, which fails.
        VisitServiceDTO visitServiceDTO = visitServiceMapper.toDto(visitService);

        restVisitServiceMockMvc.perform(post("/api/visit-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitServiceDTO)))
            .andExpect(status().isBadRequest());

        List<VisitService> visitServiceList = visitServiceRepository.findAll();
        assertThat(visitServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVisitServices() throws Exception {
        // Initialize the database
        visitServiceRepository.saveAndFlush(visitService);

        // Get all the visitServiceList
        restVisitServiceMockMvc.perform(get("/api/visit-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visitService.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getVisitService() throws Exception {
        // Initialize the database
        visitServiceRepository.saveAndFlush(visitService);

        // Get the visitService
        restVisitServiceMockMvc.perform(get("/api/visit-services/{id}", visitService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(visitService.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingVisitService() throws Exception {
        // Get the visitService
        restVisitServiceMockMvc.perform(get("/api/visit-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisitService() throws Exception {
        // Initialize the database
        visitServiceRepository.saveAndFlush(visitService);

        int databaseSizeBeforeUpdate = visitServiceRepository.findAll().size();

        // Update the visitService
        VisitService updatedVisitService = visitServiceRepository.findById(visitService.getId()).get();
        // Disconnect from session so that the updates on updatedVisitService are not directly saved in db
        em.detach(updatedVisitService);
        updatedVisitService
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .active(UPDATED_ACTIVE)
            .price(UPDATED_PRICE);
        VisitServiceDTO visitServiceDTO = visitServiceMapper.toDto(updatedVisitService);

        restVisitServiceMockMvc.perform(put("/api/visit-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitServiceDTO)))
            .andExpect(status().isOk());

        // Validate the VisitService in the database
        List<VisitService> visitServiceList = visitServiceRepository.findAll();
        assertThat(visitServiceList).hasSize(databaseSizeBeforeUpdate);
        VisitService testVisitService = visitServiceList.get(visitServiceList.size() - 1);
        assertThat(testVisitService.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVisitService.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVisitService.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testVisitService.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingVisitService() throws Exception {
        int databaseSizeBeforeUpdate = visitServiceRepository.findAll().size();

        // Create the VisitService
        VisitServiceDTO visitServiceDTO = visitServiceMapper.toDto(visitService);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitServiceMockMvc.perform(put("/api/visit-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visitServiceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the VisitService in the database
        List<VisitService> visitServiceList = visitServiceRepository.findAll();
        assertThat(visitServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisitService() throws Exception {
        // Initialize the database
        visitServiceRepository.saveAndFlush(visitService);

        int databaseSizeBeforeDelete = visitServiceRepository.findAll().size();

        // Delete the visitService
        restVisitServiceMockMvc.perform(delete("/api/visit-services/{id}", visitService.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VisitService> visitServiceList = visitServiceRepository.findAll();
        assertThat(visitServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
