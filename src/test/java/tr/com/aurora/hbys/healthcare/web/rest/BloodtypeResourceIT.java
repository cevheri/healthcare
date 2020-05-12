package tr.com.aurora.hbys.healthcare.web.rest;

import tr.com.aurora.hbys.healthcare.HealthcareApp;
import tr.com.aurora.hbys.healthcare.domain.Bloodtype;
import tr.com.aurora.hbys.healthcare.repository.BloodtypeRepository;
import tr.com.aurora.hbys.healthcare.service.BloodtypeService;
import tr.com.aurora.hbys.healthcare.service.dto.BloodtypeDTO;
import tr.com.aurora.hbys.healthcare.service.mapper.BloodtypeMapper;

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
 * Integration tests for the {@link BloodtypeResource} REST controller.
 */
@SpringBootTest(classes = HealthcareApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class BloodtypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    @Autowired
    private BloodtypeRepository bloodtypeRepository;

    @Autowired
    private BloodtypeMapper bloodtypeMapper;

    @Autowired
    private BloodtypeService bloodtypeService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBloodtypeMockMvc;

    private Bloodtype bloodtype;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bloodtype createEntity(EntityManager em) {
        Bloodtype bloodtype = new Bloodtype()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return bloodtype;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bloodtype createUpdatedEntity(EntityManager em) {
        Bloodtype bloodtype = new Bloodtype()
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);
        return bloodtype;
    }

    @BeforeEach
    public void initTest() {
        bloodtype = createEntity(em);
    }

    @Test
    @Transactional
    public void createBloodtype() throws Exception {
        int databaseSizeBeforeCreate = bloodtypeRepository.findAll().size();

        // Create the Bloodtype
        BloodtypeDTO bloodtypeDTO = bloodtypeMapper.toDto(bloodtype);
        restBloodtypeMockMvc.perform(post("/api/bloodtypes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bloodtypeDTO)))
            .andExpect(status().isCreated());

        // Validate the Bloodtype in the database
        List<Bloodtype> bloodtypeList = bloodtypeRepository.findAll();
        assertThat(bloodtypeList).hasSize(databaseSizeBeforeCreate + 1);
        Bloodtype testBloodtype = bloodtypeList.get(bloodtypeList.size() - 1);
        assertThat(testBloodtype.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBloodtype.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createBloodtypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bloodtypeRepository.findAll().size();

        // Create the Bloodtype with an existing ID
        bloodtype.setId(1L);
        BloodtypeDTO bloodtypeDTO = bloodtypeMapper.toDto(bloodtype);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBloodtypeMockMvc.perform(post("/api/bloodtypes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bloodtypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bloodtype in the database
        List<Bloodtype> bloodtypeList = bloodtypeRepository.findAll();
        assertThat(bloodtypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBloodtypes() throws Exception {
        // Initialize the database
        bloodtypeRepository.saveAndFlush(bloodtype);

        // Get all the bloodtypeList
        restBloodtypeMockMvc.perform(get("/api/bloodtypes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bloodtype.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }
    
    @Test
    @Transactional
    public void getBloodtype() throws Exception {
        // Initialize the database
        bloodtypeRepository.saveAndFlush(bloodtype);

        // Get the bloodtype
        restBloodtypeMockMvc.perform(get("/api/bloodtypes/{id}", bloodtype.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bloodtype.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE));
    }

    @Test
    @Transactional
    public void getNonExistingBloodtype() throws Exception {
        // Get the bloodtype
        restBloodtypeMockMvc.perform(get("/api/bloodtypes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBloodtype() throws Exception {
        // Initialize the database
        bloodtypeRepository.saveAndFlush(bloodtype);

        int databaseSizeBeforeUpdate = bloodtypeRepository.findAll().size();

        // Update the bloodtype
        Bloodtype updatedBloodtype = bloodtypeRepository.findById(bloodtype.getId()).get();
        // Disconnect from session so that the updates on updatedBloodtype are not directly saved in db
        em.detach(updatedBloodtype);
        updatedBloodtype
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);
        BloodtypeDTO bloodtypeDTO = bloodtypeMapper.toDto(updatedBloodtype);

        restBloodtypeMockMvc.perform(put("/api/bloodtypes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bloodtypeDTO)))
            .andExpect(status().isOk());

        // Validate the Bloodtype in the database
        List<Bloodtype> bloodtypeList = bloodtypeRepository.findAll();
        assertThat(bloodtypeList).hasSize(databaseSizeBeforeUpdate);
        Bloodtype testBloodtype = bloodtypeList.get(bloodtypeList.size() - 1);
        assertThat(testBloodtype.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBloodtype.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingBloodtype() throws Exception {
        int databaseSizeBeforeUpdate = bloodtypeRepository.findAll().size();

        // Create the Bloodtype
        BloodtypeDTO bloodtypeDTO = bloodtypeMapper.toDto(bloodtype);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBloodtypeMockMvc.perform(put("/api/bloodtypes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bloodtypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bloodtype in the database
        List<Bloodtype> bloodtypeList = bloodtypeRepository.findAll();
        assertThat(bloodtypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBloodtype() throws Exception {
        // Initialize the database
        bloodtypeRepository.saveAndFlush(bloodtype);

        int databaseSizeBeforeDelete = bloodtypeRepository.findAll().size();

        // Delete the bloodtype
        restBloodtypeMockMvc.perform(delete("/api/bloodtypes/{id}", bloodtype.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bloodtype> bloodtypeList = bloodtypeRepository.findAll();
        assertThat(bloodtypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
